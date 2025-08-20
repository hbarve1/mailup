// TypeScript declarations for the email API exposed by the preload script

declare global {
  interface Window {
    emailAPI: EmailAPI;
  }
}

export interface EmailAPI {
  // Authentication
  getAuthUrl(): Promise<string>;
  authenticate(code: string, userId?: string): Promise<{ success: boolean; tokens: any }>;
  
  // Email operations
  syncEmails(userId?: string, maxResults?: number): Promise<{ processed: number; new: number }>;
  getConversations(limit?: number): Promise<Conversation[]>;
  getEmailsByThread(threadId: string): Promise<Email[]>;
  getRecentEmails(limit?: number): Promise<Email[]>;
  getUnreadEmails(): Promise<Email[]>;
  markAsRead(gmailId: string): Promise<{ success: boolean; error?: string }>;
  
  // Search and stats
  searchEmails(query: string, limit?: number): Promise<Email[]>;
  getEmailStats(): Promise<EmailStats>;
  
  // Connection status
  checkConnection(): Promise<ConnectionStatus>;
  
  // Event listeners
  onEmailSyncProgress(callback: (event: any, data: any) => void): void;
  onEmailSyncComplete(callback: (event: any, data: any) => void): void;
  onNewEmail(callback: (event: any, email: Email) => void): void;
  removeAllListeners(channel: string): void;
}

export interface Email {
  id: number;
  gmail_id: string;
  thread_id: string;
  subject: string;
  sender: string;
  recipients: string;
  content: string;
  snippet: string;
  timestamp: string;
  is_read: boolean;
  is_starred: boolean;
  labels: string;
  provider: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: number;
  thread_id: string;
  subject: string;
  participants: string;
  last_message: string;
  last_timestamp: string;
  message_count: number;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailStats {
  totalEmails: number;
  unreadEmails: number;
  conversations: number;
  readEmails: number;
}

export interface ConnectionStatus {
  connected: boolean;
  authenticated: boolean;
  error?: string;
}

export interface SyncResult {
  processed: number;
  new: number;
}
