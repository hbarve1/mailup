const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const emailService = require('./services/emailService.cjs');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the app
  mainWindow.loadFile('../dist/index.html');
  
  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

// IPC handlers for email operations
ipcMain.handle('email:get-auth-url', async () => {
  try {
    return await emailService.getAuthUrl();
  } catch (error) {
    console.error('Error getting auth URL:', error);
    throw error;
  }
});

ipcMain.handle('email:authenticate', async (event, code, userId) => {
  try {
    return await emailService.authenticate(code, userId);
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
});

ipcMain.handle('email:sync', async (event, userId, maxResults) => {
  try {
    return await emailService.syncEmails(userId, maxResults);
  } catch (error) {
    console.error('Sync error:', error);
    throw error;
  }
});

ipcMain.handle('email:get-conversations', async (event, limit) => {
  try {
    return emailService.getConversations(limit);
  } catch (error) {
    console.error('Error getting conversations:', error);
    return [];
  }
});

ipcMain.handle('email:get-emails-by-thread', async (event, threadId) => {
  try {
    return emailService.getEmailsByThread(threadId);
  } catch (error) {
    console.error('Error getting emails by thread:', error);
    return [];
  }
});

ipcMain.handle('email:get-recent-emails', async (event, limit) => {
  try {
    return emailService.getRecentEmails(limit);
  } catch (error) {
    console.error('Error getting recent emails:', error);
    return [];
  }
});

ipcMain.handle('email:get-unread-emails', async () => {
  try {
    return emailService.getUnreadEmails();
  } catch (error) {
    console.error('Error getting unread emails:', error);
    return [];
  }
});

ipcMain.handle('email:mark-as-read', async (event, gmailId) => {
  try {
    return emailService.markEmailAsRead(gmailId);
  } catch (error) {
    console.error('Error marking email as read:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('email:search', async (event, query, limit) => {
  try {
    return emailService.searchEmails(query, limit);
  } catch (error) {
    console.error('Error searching emails:', error);
    return [];
  }
});

ipcMain.handle('email:get-stats', async () => {
  try {
    return emailService.getEmailStats();
  } catch (error) {
    console.error('Error getting email stats:', error);
    return { totalEmails: 0, unreadEmails: 0, conversations: 0, readEmails: 0 };
  }
});

ipcMain.handle('email:check-connection', async () => {
  try {
    return await emailService.checkConnection();
  } catch (error) {
    console.error('Error checking connection:', error);
    return { connected: false, authenticated: false, error: error.message };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
