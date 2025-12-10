const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/fileHandler');

router.post('/', async (req, res) => {
  try {
    const contacts = await readJSON('contacts.json');
    const newContact = {
      id: Date.now(),
      ...req.body,
      timestamp: new Date().toISOString()
    };
    contacts.push(newContact);
    await writeJSON('contacts.json', contacts);
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

module.exports = router;