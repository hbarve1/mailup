// SQLite storage utility for backend
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'mailup.db');
const db = new sqlite3.Database(DB_PATH);

// Initialize database tables
function init() {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const totalOperations = 3; // 3 tables
    
    function checkComplete(err) {
      if (err) {
        reject(err);
        return;
      }
      completed++;
      if (completed === totalOperations) {
        // Create indexes after tables are created
        createIndexes().then(resolve).catch(reject);
      }
    }

    // Tokens table for OAuth credentials
    db.run(`CREATE TABLE IF NOT EXISTS tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT NOT NULL,
      user_id TEXT NOT NULL,
      access_token TEXT NOT NULL,
      refresh_token TEXT,
      expires_at INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, checkComplete);

    // Emails table for storing fetched emails
    db.run(`CREATE TABLE IF NOT EXISTS emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gmail_id TEXT UNIQUE NOT NULL,
      thread_id TEXT NOT NULL,
      subject TEXT,
      sender TEXT NOT NULL,
      recipients TEXT,
      content TEXT,
      snippet TEXT,
      timestamp DATETIME NOT NULL,
      is_read BOOLEAN DEFAULT 0,
      is_starred BOOLEAN DEFAULT 0,
      labels TEXT,
      provider TEXT DEFAULT 'gmail',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, checkComplete);

    // Conversations table for grouping emails
    db.run(`CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      thread_id TEXT UNIQUE NOT NULL,
      subject TEXT,
      participants TEXT,
      last_message TEXT,
      last_timestamp DATETIME,
      message_count INTEGER DEFAULT 0,
      is_read BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, checkComplete);
  });
}

// Create indexes separately
function createIndexes() {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const totalOperations = 4; // 4 indexes
    
    function checkComplete(err) {
      if (err) {
        // Don't reject for index creation errors, just log them
        console.warn('Index creation warning:', err.message);
      }
      completed++;
      if (completed === totalOperations) {
        resolve();
      }
    }

    // Create indexes for better performance
    db.run(`CREATE INDEX IF NOT EXISTS idx_emails_gmail_id ON emails(gmail_id)`, checkComplete);
    db.run(`CREATE INDEX IF NOT EXISTS idx_emails_thread_id ON emails(thread_id)`, checkComplete);
    db.run(`CREATE INDEX IF NOT EXISTS idx_emails_timestamp ON emails(timestamp)`, checkComplete);
    db.run(`CREATE INDEX IF NOT EXISTS idx_conversations_thread_id ON conversations(thread_id)`, checkComplete);
  });
}

// Email operations
const emailOps = {
  // Save or update an email
  saveEmail: (gmailId, threadId, subject, sender, recipients, content, snippet, timestamp, labels, provider) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT OR REPLACE INTO emails 
        (gmail_id, thread_id, subject, sender, recipients, content, snippet, timestamp, labels, provider)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [gmailId, threadId, subject, sender, recipients, content, snippet, timestamp, labels, provider],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },
  
  // Get emails by thread
  getEmailsByThread: (threadId) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM emails WHERE thread_id = ? ORDER BY timestamp ASC`, [threadId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  
  // Get recent emails
  getRecentEmails: (limit) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM emails ORDER BY timestamp DESC LIMIT ?`, [limit], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  
  // Get unread emails
  getUnreadEmails: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM emails WHERE is_read = 0 ORDER BY timestamp DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  
  // Mark email as read
  markAsRead: (gmailId) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE emails SET is_read = 1 WHERE gmail_id = ?`, [gmailId], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  },
  
  // Check if email exists
  emailExists: (gmailId) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT COUNT(*) as count FROM emails WHERE gmail_id = ?`, [gmailId], (err, row) => {
        if (err) reject(err);
        else resolve(row ? row.count : 0);
      });
    });
  },
};

// Conversation operations
const conversationOps = {
  // Save or update a conversation
  saveConversation: (threadId, subject, participants, lastMessage, lastTimestamp, messageCount) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT OR REPLACE INTO conversations 
        (thread_id, subject, participants, last_message, last_timestamp, message_count)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [threadId, subject, participants, lastMessage, lastTimestamp, messageCount],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },
  
  // Get all conversations
  getConversations: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM conversations ORDER BY last_timestamp DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  
  // Get conversation by thread ID
  getConversationByThread: (threadId) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM conversations WHERE thread_id = ?`, [threadId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  
  // Update conversation last message
  updateLastMessage: (lastMessage, lastTimestamp, messageCount, threadId) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE conversations 
        SET last_message = ?, last_timestamp = ?, message_count = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE thread_id = ?`,
        [lastMessage, lastTimestamp, messageCount, threadId],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },
};

// Token operations
const tokenOps = {
  // Save or update token
  saveToken: (provider, userId, accessToken, refreshToken, expiresAt) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT OR REPLACE INTO tokens 
        (provider, user_id, access_token, refresh_token, expires_at)
        VALUES (?, ?, ?, ?, ?)`,
        [provider, userId, accessToken, refreshToken, expiresAt],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },
  
  // Get token by provider and user
  getToken: (provider, userId) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM tokens WHERE provider = ? AND user_id = ?`, [provider, userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  
  // Delete token
  deleteToken: (provider, userId) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM tokens WHERE provider = ? AND user_id = ?`, [provider, userId], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  },
};

// Initialize database synchronously
let initPromise = init().then(() => {
  console.log('Database initialized successfully');
}).catch(err => {
  console.error('Database initialization failed:', err);
});

module.exports = {
  db,
  emailOps,
  conversationOps,
  tokenOps,
  initPromise
};
