# 🎓 metstud - Student Management Web App

A simple, file-based web application for managing student admissions, administrative tasks, and contact information. Built with Node.js for the backend and static HTML for the frontend — perfect for learning or prototyping.

> ⚠️ **Note**: This is a prototype using the filesystem for data storage. It is **not secure or scalable** for production use. Intended for educational purposes only.

---

## 📁 Project Structure
![image alt](https://github.com/me2-z/metstud/blob/c005e167df240f1d1524820b9f7cf562f4921695/projectstructure.png)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A modern web browser

### Installation & Run

 I added .bat files in project so easy to go.
1. Clone or download this repository.
2. Open your terminal in the project root folder.
3. Start the server:

   ```bash
   node backend/server.js
then copy url : 
http://localhost:3000

🛠️ Backend Details
The backend is a minimal Node.js HTTP server that serves static HTML pages and handles form submissions by reading/writing to JSON files.

server.js: Starts the server and routes requests.
routes/*.js: Handles specific endpoints (/admission, /admin, /contact).
utils/fileHandler.js: Helper for safe read/write operations on JSON files.
data/*.json: Stores all persistent data as plain JSON.

💻 Frontend Pages
All frontend pages are static HTML files served directly by the server

![image alt](https://github.com/me2-z/metstud/blob/754f3e052985b2c42f562b567239c92a266b7795/%F0%9F%92%BB%20Frontend%20Pages.png)

⚙️ How It Works
User visits admission.html and fills out the form.
Form submits data to /admission endpoint.
Backend route (routes/admission.js) validates and saves data to data/admissions.json.

Server redirects user to thankyou.html.

