# MediClick - Frontend Client

## 📋 Description

This is the frontend client for the MediClick project. It provides a simple interface to view medicine availability across different EPS (Health Promoting Entities) in Colombia. This module is part of a larger system.

## 🗂️ File Structure

```
client/
├── index.html      # Main page with React CDN
├── script.js       # React components (using React.createElement)
├── style.css       # Application styles
└── README.md       # This documentation
```

## 🎨 Technologies

- **React 18** (via CDN)
- **Babel Standalone** (for JSX in browser)
- **Vanilla CSS**
- **JavaScript ES6+**

## 🚀 How to Run (PowerShell)

Node.js with npx serve

```powershell
cd ...\client
npx serve -p 8080
```

Then open in your browser: **http://localhost:8080**

## 💡 Features

### For Users (No authentication required)

- ✅ View list of all available EPS
- ✅ Browse medicines available by EPS
- ✅ Check available quantity for each medicine
- ✅ View general system statistics

### For EPS Administrators (Authentication required)

- ✅ Login with email and password
- ✅ All user features
- ✅ Manage EPS inventory
- ✅ Update medicine quantities


