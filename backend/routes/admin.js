const express = require('express');
const router = express.Router();
const { readJSON } = require('../utils/fileHandler');

let adminSession = false;

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminCreds = await readJSON('admin.json');

    if (
      adminCreds &&
      adminCreds.username === username &&
      adminCreds.password === password
    ) {
      adminSession = true;
      return res.json({ success: true });
    }

    res.status(401).json({ success: false, error: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Middleware to protect routes
const requireAdmin = (req, res, next) => {
  if (!adminSession) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};

// Get all data (admin only) — FIXED TO FORMAT DATA CORRECTLY
router.get('/data', requireAdmin, async (req, res) => {
  try {
    const contacts = await readJSON('contacts.json');
    const admissions = await readJSON('admissions.json');
    
    // ✅ Format each application to match dashboard expectations
    const formattedAdmissions = admissions.map(app => ({
      id: app.id,
      fullName: app.fullName || app.name || 'N/A',
      program: app.program || 'N/A',
      email: app.email || 'N/A',
      // Convert timestamp to readable date
      applied: app.timestamp 
        ? new Date(app.timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : 'N/A',
      status: app.status || 'pending'
    }));

    res.json({
      contacts,
      admissions: formattedAdmissions
    });
  } catch (err) {
    console.error('Admin data fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = { router, requireAdmin };