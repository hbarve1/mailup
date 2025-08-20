// SQLite storage utility for backend
const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, 'mailup.db');
const db = new Database(DB_PATH);

// Example: create a table for storing tokens
function init() {
  db.prepare(`CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider TEXT NOT NULL,
    user_id TEXT NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at INTEGER
  )`).run();
}

init();

module.exports = db;
