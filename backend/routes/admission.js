const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/fileHandler');

router.post('/', async (req, res) => {
  try {
    // Read existing admissions
    const admissions = await readJSON('admissions.json');
    
    // Create new admission with all form fields
    const newAdmission = {
      id: Date.now(),
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      program: req.body.program,
      motivation: req.body.motivation,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Save to file
    admissions.push(newAdmission);
    await writeJSON('admissions.json', admissions);

    console.log('✅ Application saved:', newAdmission);
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error('❌ Save error:', err);
    res.status(500).json({ error: 'Failed to save application' });
  }
});

module.exports = router;