const gmailIntegration = require('../integrations/gmail.cjs');
const { emailOps, conversationOps } = require('../storage/db.cjs');

class EmailService {
  constructor() {
    this.isAuthenticated = false;
    this.syncInProgress = false;
  }

  // Authentication methods
  async getAuthUrl() {
    try {
      return gmailIntegration.getAuthUrl();
    } catch (error) {
      console.error('Error getting auth URL:', error);
      throw new Error('Failed to get authentication URL');
    }
  }

  async authenticate(code, userId = 'default') {
    try {
      const tokens = await gmailIntegration.handleOAuthCallback(code, userId);
      this.isAuthenticated = true;
      return { success: true, tokens };
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Authentication failed');
    }
  }

  // Email fetching and syncing
  async syncEmails(userId = 'default', maxResults = 50) {
    if (this.syncInProgress) {
      throw new Error('Email sync already in progress');
    }

    try {
      this.syncInProgress = true;
      const result = await gmailIntegration.fetchAndStoreEmails(userId, maxResults);
      return result;
    } catch (error) {
      console.error('Email sync error:', error);
      throw new Error('Failed to sync emails');
    } finally {
      this.syncInProgress = false;
    }
  }

  // Database retrieval methods
  async getConversations(limit = 50) {
    try {
      const conversations = await conversationOps.getConversations();
      return conversations.slice(0, limit);
    } catch (error) {
      console.error('Error getting conversations:', error);
      return [];
    }
  }

  async getEmailsByThread(threadId) {
    try {
      return await emailOps.getEmailsByThread(threadId);
    } catch (error) {
      console.error('Error getting emails by thread:', error);
      return [];
    }
  }

  async getRecentEmails(limit = 50) {
    try {
      return await emailOps.getRecentEmails(limit);
    } catch (error) {
      console.error('Error getting recent emails:', error);
      return [];
    }
  }

  async getUnreadEmails() {
    try {
      return await emailOps.getUnreadEmails();
    } catch (error) {
      console.error('Error getting unread emails:', error);
      return [];
    }
  }

  // Email status updates
  async markEmailAsRead(gmailId) {
    try {
      await emailOps.markAsRead(gmailId);
      return { success: true };
    } catch (error) {
      console.error('Error marking email as read:', error);
      return { success: false, error: error.message };
    }
  }

  // Search functionality
  async searchEmails(query, limit = 50) {
    try {
      // Simple search implementation - can be enhanced with full-text search
      const allEmails = await emailOps.getRecentEmails(1000); // Get more emails for search
      const results = allEmails.filter(email => 
        email.subject?.toLowerCase().includes(query.toLowerCase()) ||
        email.content?.toLowerCase().includes(query.toLowerCase()) ||
        email.sender?.toLowerCase().includes(query.toLowerCase()) ||
        email.snippet?.toLowerCase().includes(query.toLowerCase())
      );
      return results.slice(0, limit);
    } catch (error) {
      console.error('Error searching emails:', error);
      return [];
    }
  }

  // Statistics
  async getEmailStats() {
    try {
      const totalEmails = await emailOps.getRecentEmails(10000);
      const unreadEmails = await emailOps.getUnreadEmails();
      const conversations = await conversationOps.getConversations();
      
      return {
        totalEmails: totalEmails.length,
        unreadEmails: unreadEmails.length,
        conversations: conversations.length,
        readEmails: totalEmails.length - unreadEmails.length
      };
    } catch (error) {
      console.error('Error getting email stats:', error);
      return { totalEmails: 0, unreadEmails: 0, conversations: 0, readEmails: 0 };
    }
  }

  // Health check
  async checkConnection() {
    try {
      // Try to get OAuth client to check if authenticated
      gmailIntegration.getOAuth2Client('default');
      return { connected: true, authenticated: true };
    } catch (error) {
      return { connected: false, authenticated: false, error: error.message };
    }
  }
}

module.exports = new EmailService();
