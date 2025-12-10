const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '../data');

async function readJSON(filename) {
  const filePath = path.join(dataDir, filename);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(filePath, '[]');
      return [];
    }
    throw err;
  }
}

async function writeJSON(filename, data) {
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readJSON, writeJSON };