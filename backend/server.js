const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Helper: Read JSON file
function readJsonFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]');
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Helper: Write JSON file
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// ✅ NEW: Save admission application
app.post('/api/admission', (req, res) => {
  try {
    const admissionsPath = path.join(__dirname, 'data/admissions.json');
    const admissions = readJsonFile(admissionsPath);
    
    const newAdmission = {
      id: Date.now(),
      ...req.body,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    admissions.push(newAdmission);
    
    if (writeJsonFile(admissionsPath, admissions)) {
      console.log('✅ Application saved:', newAdmission);
      res.status(201).json({ message: 'Application submitted!' });
    } else {
      res.status(500).json({ error: 'Failed to save application' });
    }
  } catch (err) {
    console.error('Admission save error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminPath = path.join(__dirname, 'data/admin.json');
  const adminData = readJsonFile(adminPath);

  if (adminData && adminData.username === username && adminData.password === password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// ✅ FIXED: Return structured data for dashboard
app.get('/api/admin/data', (req, res) => {
  const admissionsPath = path.join(__dirname, 'data/admissions.json');
  const admissions = readJsonFile(admissionsPath);
  
  // Format for dashboard
  const formatted = admissions.map(app => ({
    id: app.id,
    fullName: app.fullName || 'N/A',
    program: app.program || 'N/A',
    email: app.email || 'N/A',
    applied: app.timestamp ? new Date(app.timestamp).toLocaleDateString() : 'N/A',
    status: app.status || 'pending'
  }));

  res.json({ admissions: formatted });
});

// ✅ FIXED: Update status of existing application
app.post('/api/admin/admission/status', (req, res) => {
  const { id, status } = req.body;
  const admissionsPath = path.join(__dirname, 'data/admissions.json');
  const admissions = readJsonFile(admissionsPath);

  const index = admissions.findIndex(app => app.id == id);
  if (index === -1) {
    return res.status(404).json({ error: 'Application not found' });
  }

  admissions[index].status = status;
  
  if (writeJsonFile(admissionsPath, admissions)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Public: Check status by email
app.get('/api/admission/status', (req, res) => {
  const { email } = req.query;
  const admissionsPath = path.join(__dirname, 'data/admissions.json');
  const admissions = readJsonFile(admissionsPath);

  const app = admissions.find(a => a.email?.toLowerCase() === email?.toLowerCase());
  
  if (app) {
    res.json({
      found: true,
      status: app.status || 'pending',
      program: app.program || 'N/A'
    });
  } else {
    res.json({ found: false });
  }
});

app.listen(PORT, () => {
  console.log(`✅ MetStud running on http://localhost:${PORT}`);
  console.log(`📁 Data folder: ${path.join(__dirname, 'data')}`);
});