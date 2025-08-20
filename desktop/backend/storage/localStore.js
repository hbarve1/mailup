// Simple local storage utility for backend (JSON file-based)
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

function getFilePath(key) {
  return path.join(DATA_DIR, `${key}.json`);
}

function save(key, data) {
  fs.writeFileSync(getFilePath(key), JSON.stringify(data, null, 2));
}

function load(key) {
  const file = getFilePath(key);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file));
}

module.exports = { save, load };
