const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('emailAPI', {
  // Authentication
  getAuthUrl: () => ipcRenderer.invoke('email:get-auth-url'),
  authenticate: (code, userId) => ipcRenderer.invoke('email:authenticate', code, userId),
  
  // Email operations
  syncEmails: (userId, maxResults) => ipcRenderer.invoke('email:sync', userId, maxResults),
  getConversations: (limit) => ipcRenderer.invoke('email:get-conversations', limit),
  getEmailsByThread: (threadId) => ipcRenderer.invoke('email:get-emails-by-thread', threadId),
  getRecentEmails: (limit) => ipcRenderer.invoke('email:get-recent-emails', limit),
  getUnreadEmails: () => ipcRenderer.invoke('email:get-unread-emails'),
  markAsRead: (gmailId) => ipcRenderer.invoke('email:mark-as-read', gmailId),
  
  // Search and stats
  searchEmails: (query, limit) => ipcRenderer.invoke('email:search', query, limit),
  getEmailStats: () => ipcRenderer.invoke('email:get-stats'),
  
  // Connection status
  checkConnection: () => ipcRenderer.invoke('email:check-connection'),
  
  // Listeners for real-time updates (if needed)
  onEmailSyncProgress: (callback) => {
    ipcRenderer.on('email:sync-progress', callback);
  },
  
  onEmailSyncComplete: (callback) => {
    ipcRenderer.on('email:sync-complete', callback);
  },
  
  onNewEmail: (callback) => {
    ipcRenderer.on('email:new-email', callback);
  },
  
  // Remove listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});
