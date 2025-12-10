// Handle form submissions
document.addEventListener('DOMContentLoaded', () => {
  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          window.location.href = 'thankyou.html';
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        showAlert('Failed to send message. Please try again.', 'error');
      }
    });
  }

  // Admission Form
  const admissionForm = document.getElementById('admission-form');
  if (admissionForm) {
    admissionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(admissionForm);
      const data = Object.fromEntries(formData);

      try {
        const res = await fetch('/api/admission', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          window.location.href = 'thankyou.html';
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        showAlert('Failed to submit admission. Please try again.', 'error');
      }
    });
  }

  // Admin Login
  const adminLogin = document.getElementById('admin-login');
  if (adminLogin) {
    adminLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(adminLogin);
      const data = Object.fromEntries(formData);

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();
        if (result.success) {
          loadAdminData();
        } else {
          showAlert('Invalid username or password.', 'error');
        }
      } catch (err) {
        showAlert('Login failed.', 'error');
      }
    });
  }
});

function showAlert(message, type = 'success') {
  const div = document.createElement('div');
  div.className = `alert alert-${type}`;
  div.textContent = message;
  document.body.insertBefore(div, document.body.firstChild);
  setTimeout(() => div.remove(), 5000);
}

// Load admin data after login
async function loadAdminData() {
  try {
    const res = await fetch('/api/admin/data');
    const data = await res.json();
    if (res.ok) {
      displayAdminData(data);
    } else {
      showAlert('Unauthorized access.', 'error');
    }
  } catch (err) {
    showAlert('Failed to load data.', 'error');
  }
}

function displayAdminData({ contacts, admissions }) {
  const container = document.getElementById('admin-data');
  if (!container) return;

  container.innerHTML = `
    <h2>Submissions Dashboard</h2>
    <h3>Contact Messages (${contacts.length})</h3>
    <pre>${JSON.stringify(contacts, null, 2)}</pre>
    <h3>Admission Applications (${admissions.length})</h3>
    <pre>${JSON.stringify(admissions, null, 2)}</pre>
  `;
}