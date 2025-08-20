const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// You should replace these with your actual credentials and token paths

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Scopes for Gmail read access
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

// Generate an OAuth2 client
function createOAuth2Client() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const { client_id, client_secret, redirect_uris } = credentials.installed;
  return new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
}

// Get the Google sign-in URL for user consent
function getAuthUrl() {
  const oAuth2Client = createOAuth2Client();
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
}

// Exchange code for tokens and save them
async function handleOAuthCallback(code) {
  const oAuth2Client = createOAuth2Client();
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  return tokens;
}


function getOAuth2Client() {
  const oAuth2Client = createOAuth2Client();
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

async function fetchMail(maxResults = 10) {
  const auth = getOAuth2Client();
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.list({
    userId: 'me',
    maxResults,
  });
  const messages = res.data.messages || [];
  const mailData = [];
  for (const msg of messages) {
    const msgRes = await gmail.users.messages.get({ userId: 'me', id: msg.id });
    mailData.push({
      id: msg.id,
      snippet: msgRes.data.snippet,
      payload: msgRes.data.payload,
    });
  }
  return mailData;
}

module.exports = {
  fetchMail,
  getAuthUrl, // Call this to get the Google sign-in URL
  handleOAuthCallback, // Call this with the code from Google to save tokens
};
