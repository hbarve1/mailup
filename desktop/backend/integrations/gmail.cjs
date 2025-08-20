const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { emailOps, conversationOps, tokenOps } = require('../storage/db.cjs');

// Configuration
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Scopes for Gmail access
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify'
];

// Utility functions for email parsing
function parseEmailHeaders(headers) {
  const parsed = {};
  headers.forEach(header => {
    parsed[header.name.toLowerCase()] = header.value;
  });
  return parsed;
}

function extractEmailContent(payload) {
  let content = '';
  
  if (payload.body && payload.body.data) {
    // Simple text content
    content = Buffer.from(payload.body.data, 'base64').toString('utf-8');
  } else if (payload.parts) {
    // Multipart content
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body && part.body.data) {
        content = Buffer.from(part.body.data, 'base64').toString('utf-8');
        break;
      } else if (part.mimeType === 'text/html' && part.body && part.body.data) {
        // Fallback to HTML if no plain text
        content = Buffer.from(part.body.data, 'base64').toString('utf-8');
      }
    }
  }
  
  return content;
}

function parseEmailAddress(address) {
  if (!address) return '';
  
  // Handle "Name <email@domain.com>" format
  const match = address.match(/"?([^"<]+)"?\s*<?([^>]+@[^>]+)>?/);
  if (match) {
    return match[2].trim();
  }
  
  return address.trim();
}

// OAuth2 client management
function createOAuth2Client() {
  try {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
    return new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
  } catch (error) {
    console.error('Error loading credentials:', error.message);
    throw new Error('Gmail credentials not found. Please add credentials.json file.');
  }
}

function getAuthUrl() {
  const oAuth2Client = createOAuth2Client();
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
}

async function handleOAuthCallback(code, userId = 'default') {
  const oAuth2Client = createOAuth2Client();
  const { tokens } = await oAuth2Client.getToken(code);
  
  // Save tokens to database
  await tokenOps.saveToken(
    'gmail',
    userId,
    tokens.access_token,
    tokens.refresh_token,
    tokens.expiry_date
  );
  
  return tokens;
}

async function getOAuth2Client(userId = 'default') {
  const oAuth2Client = createOAuth2Client();
  
  // Get tokens from database
  const token = await tokenOps.getToken('gmail', userId);
  if (!token) {
    throw new Error('No Gmail tokens found. Please authenticate first.');
  }
  
  oAuth2Client.setCredentials({
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    expiry_date: token.expires_at
  });
  
  return oAuth2Client;
}

// Main email fetching function
async function fetchAndStoreEmails(userId = 'default', maxResults = 50) {
  try {
    const auth = await getOAuth2Client(userId);
    const gmail = google.gmail({ version: 'v1', auth });
    
    console.log('Fetching emails from Gmail...');
    
    // Get message list
    const res = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
      labelIds: ['INBOX']
    });
    
    const messages = res.data.messages || [];
    console.log(`Found ${messages.length} messages to process`);
    
    let processedCount = 0;
    let newEmailsCount = 0;
    
    for (const msg of messages) {
      try {
        // Check if email already exists
        const exists = await emailOps.emailExists(msg.id);
        if (exists > 0) {
          processedCount++;
          continue;
        }
        
        // Fetch full message details
        const msgRes = await gmail.users.messages.get({ 
          userId: 'me', 
          id: msg.id,
          format: 'full'
        });
        
        const emailData = msgRes.data;
        const headers = parseEmailHeaders(emailData.payload.headers);
        
        // Extract email content
        const content = extractEmailContent(emailData.payload);
        
        // Parse email data
        const email = {
          gmail_id: emailData.id,
          thread_id: emailData.threadId,
          subject: headers.subject || '(No Subject)',
          sender: parseEmailAddress(headers.from),
          recipients: parseEmailAddress(headers.to),
          content: content,
          snippet: emailData.snippet,
          timestamp: new Date(parseInt(emailData.internalDate)).toISOString(),
          labels: JSON.stringify(emailData.labelIds || [])
        };
        
        // Save email to database
        await emailOps.saveEmail(
          email.gmail_id,
          email.thread_id,
          email.subject,
          email.sender,
          email.recipients,
          email.content,
          email.snippet,
          email.timestamp,
          email.labels,
          'gmail'
        );
        
        // Update or create conversation
        const conversation = await conversationOps.getConversationByThread(email.thread_id);
        const threadEmails = await emailOps.getEmailsByThread(email.thread_id);
        const messageCount = threadEmails.length;
        
        if (conversation) {
          // Update existing conversation
          await conversationOps.updateLastMessage(
            email.snippet,
            email.timestamp,
            messageCount,
            email.thread_id
          );
        } else {
          // Create new conversation
          await conversationOps.saveConversation(
            email.thread_id,
            email.subject,
            JSON.stringify([email.sender, email.recipients]),
            email.snippet,
            email.timestamp,
            messageCount
          );
        }
        
        newEmailsCount++;
        processedCount++;
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error processing message ${msg.id}:`, error.message);
        processedCount++;
      }
    }
    
    console.log(`Processed ${processedCount} emails, ${newEmailsCount} new emails stored`);
    return { processed: processedCount, new: newEmailsCount };
    
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
}

// Get stored emails from database
async function getStoredEmails(limit = 50) {
  return await emailOps.getRecentEmails(limit);
}

async function getEmailsByThread(threadId) {
  return await emailOps.getEmailsByThread(threadId);
}

async function getConversations() {
  return await conversationOps.getConversations();
}

async function getUnreadEmails() {
  return await emailOps.getUnreadEmails();
}

// Legacy function for backward compatibility
async function fetchMail(maxResults = 10) {
  return fetchAndStoreEmails('default', maxResults);
}

module.exports = {
  fetchMail,
  fetchAndStoreEmails,
  getAuthUrl,
  handleOAuthCallback,
  getStoredEmails,
  getEmailsByThread,
  getConversations,
  getUnreadEmails,
  getOAuth2Client
};
