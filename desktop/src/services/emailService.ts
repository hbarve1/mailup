import type { EmailAPI, Email, Conversation, EmailStats, ConnectionStatus, SyncResult } from '../types/emailAPI';

class EmailService {
  private api: EmailAPI;

  constructor() {
    this.api = window.emailAPI;
  }

  // Authentication
  async getAuthUrl(): Promise<string> {
    try {
      return await this.api.getAuthUrl();
    } catch (error) {
      console.error('Error getting auth URL:', error);
      throw new Error('Failed to get authentication URL');
    }
  }

  async authenticate(code: string, userId?: string): Promise<{ success: boolean; tokens: any }> {
    try {
      return await this.api.authenticate(code, userId);
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Authentication failed');
    }
  }

  // Email operations
  async syncEmails(userId?: string, maxResults?: number): Promise<SyncResult> {
    try {
      return await this.api.syncEmails(userId, maxResults);
    } catch (error) {
      console.error('Email sync error:', error);
      throw new Error('Failed to sync emails');
    }
  }

  async getConversations(limit?: number): Promise<Conversation[]> {
    try {
      return await this.api.getConversations(limit);
    } catch (error) {
      console.error('Error getting conversations:', error);
      return [];
    }
  }

  async getEmailsByThread(threadId: string): Promise<Email[]> {
    try {
      return await this.api.getEmailsByThread(threadId);
    } catch (error) {
      console.error('Error getting emails by thread:', error);
      return [];
    }
  }

  async getRecentEmails(limit?: number): Promise<Email[]> {
    try {
      return await this.api.getRecentEmails(limit);
    } catch (error) {
      console.error('Error getting recent emails:', error);
      return [];
    }
  }

  async getUnreadEmails(): Promise<Email[]> {
    try {
      return await this.api.getUnreadEmails();
    } catch (error) {
      console.error('Error getting unread emails:', error);
      return [];
    }
  }

  async markAsRead(gmailId: string): Promise<{ success: boolean; error?: string }> {
    try {
      return await this.api.markAsRead(gmailId);
    } catch (error) {
      console.error('Error marking email as read:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Search and stats
  async searchEmails(query: string, limit?: number): Promise<Email[]> {
    try {
      return await this.api.searchEmails(query, limit);
    } catch (error) {
      console.error('Error searching emails:', error);
      return [];
    }
  }

  async getEmailStats(): Promise<EmailStats> {
    try {
      return await this.api.getEmailStats();
    } catch (error) {
      console.error('Error getting email stats:', error);
      return { totalEmails: 0, unreadEmails: 0, conversations: 0, readEmails: 0 };
    }
  }

  // Connection status
  async checkConnection(): Promise<ConnectionStatus> {
    try {
      return await this.api.checkConnection();
    } catch (error) {
      console.error('Error checking connection:', error);
      return { connected: false, authenticated: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Event listeners
  onEmailSyncProgress(callback: (event: any, data: any) => void): void {
    this.api.onEmailSyncProgress(callback);
  }

  onEmailSyncComplete(callback: (event: any, data: any) => void): void {
    this.api.onEmailSyncComplete(callback);
  }

  onNewEmail(callback: (event: any, email: Email) => void): void {
    this.api.onNewEmail(callback);
  }

  removeAllListeners(channel: string): void {
    this.api.removeAllListeners(channel);
  }

  // Utility methods
  formatEmailDate(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  }

  extractEmailFromAddress(address: string): string {
    const match = address.match(/<?([^<>@\s]+@[^<>\s]+)>?/);
    return match ? match[1] : address;
  }

  parseParticipants(participants: string): string[] {
    try {
      return JSON.parse(participants);
    } catch {
      return [participants];
    }
  }
}

export const emailService = new EmailService();
