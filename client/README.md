# MediClick - Frontend Client

> Real-time medicine availability consultation system for EPS (Health Promotion Entities) in Colombia

## 📋 Description

MediClick is a web application that allows users and EPS administrators to consult and manage medicine availability in real-time. The frontend is built with vanilla React (no build tools) for maximum simplicity and portability.

### Problem it Solves

- ❌ Unnecessary trips to pharmacies without available stock
- ❌ Long lines and wasted time at multiple delivery points
- ❌ Risk of delays in critical medical treatments
- ❌ Fragmented information across different applications
- ❌ Lack of real-time inventory updates

### Target Users

**Primary Users:**
- People with chronic diseases requiring regular medication
- Users with urgent treatments who cannot afford delays

**Secondary Users:**
- Parents and caregivers responsible for third-party medication
- Any healthcare system user who values agility and simplicity

## 🚀 Technologies

- **React 18** (CDN - no build tools)
- **Vanilla JavaScript** (ES6+)
- **CSS3** (Custom Properties, Flexbox, Grid)
- **Architecture:** Client-Server (REST API)

## 📁 Project Structure

```
client/
├── index.html           # Application entry point
├── script.js            # React application logic
├── style.css            # Global styles
├── api.js               # API client for backend communication
├── package.json         # NPM configuration and scripts
├── package-lock.json    # Dependency lock file
└── testing/             # Test files
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# === PostgreSQL Database Configuration ===
DB_USER=postgres           # Database user
DB_PASSWORD=123            # Postgres user password
DB_HOST=localhost          # Database server
DB_NAME=inventario_eps     # Database name
DB_PORT=5432               # PostgreSQL default port

# === Node.js Server Configuration ===
PORT=3000                  # API Express server port
```

**Note:** In production, these variables are configured in **Supabase** (database) and **Render** (application).

## 🔧 Installation

### Prerequisites

- Node.js >= 14.x
- npm >= 6.x
- Backend server running on port 3000

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Verify backend configuration**

Make sure the backend server is running at `http://localhost:3000` or update the URL in `api.js`.

## 🎮 Available Scripts

### Development Mode
```bash
npm run dev
```
Starts a development server with live-reload at `http://localhost:5000`

### Production Mode
```bash
npm start
```
Serves the static application at `http://localhost:5000`

## 🏗️ Main Features

### For Users (General Public)

✅ **Medicine Consultation**
- Real-time medicine search by name
- Availability visualization by EPS
- Stock indicators (High, Medium, Low)
- Detailed information for each medicine

✅ **Intuitive Interface**
- Minimalist and professional design
- Responsive (works on mobile and tablets)
- Simple navigation with no learning curve

### For Administrators (EPS Members)

✅ **Inventory Management**
- Secure login with EPS credentials
- Create new medicines
- Edit medicine information and stock
- Delete medicines from inventory
- Data validations (names, quantities, maximum stock)

✅ **Administrative Dashboard**
- Exclusive view of your EPS inventory
- Real-time statistics
- Immediate updates

## 🎨 Design and UX

### Color Palette

```css
--bg: #f5efe6;           /* Main background */
--primary: #3f63e1;       /* Primary color */
--surface: #ffffff;       /* Surfaces/cards */
--text: #1f2430;         /* Main text */
--muted: #6b7280;        /* Secondary text */
```

### Main Components

- **Hero:** Application presentation
- **UserTypeSelection:** User type selector
- **DashboardView:** Main view with EPS catalog
- **EPSDetailView:** Inventory detail by EPS
- **MedCard:** Medicine card
- **EditModal/CreateMedicModal:** Management forms
- **Toolbar:** Top navigation bar

## 🔐 Implemented Validations

### Medicine Name
- ✅ Only letters, numbers, spaces and basic characters (.,()-áéíóú)
- ❌ Does not allow special characters

### Medicine Stock
- ✅ Maximum 40,000 units per medicine
- ❌ Alert when exceeding limit

### Required Fields
- Medicine name (required)
- Available quantity (required, minimum 0)

## 📱 Responsive Design

The application is fully responsive with breakpoints at:

- **Desktop:** 1200px+ (3 columns)
- **Tablet:** 768px - 1199px (2 columns)
- **Mobile:** < 768px (1 column)

## 🔄 User Flow

### Public User
1. Select "I'm a User"
2. View available EPS catalog
3. Select an EPS
4. Search and consult medicines

### EPS Administrator
1. Select "I'm an EPS Member"
2. Login with credentials
3. Access your EPS inventory
4. Manage medicines (create, edit, delete)

## 🚀 Production Deployment

### Render (Recommended)

1. Connect repository to Render
2. Configure as **Static Site**
3. Build Command: `npm install`
4. Publish Directory: `.`
5. Add backend environment variables

### Alternatives

- **Netlify:** Similar configuration to Render
- **Vercel:** For static applications
- **GitHub Pages:** For free hosting

## 🐛 Troubleshooting

### Frontend doesn't connect to backend

**Problem:** CORS error or connection refused

**Solution:**
1. Verify backend is running on correct port
2. Check API URL in `api.js`
3. Ensure CORS is enabled on server

### Images don't load

**Problem:** Broken image URLs

**Solution:**
- Placeholder image is used automatically as fallback
- Verify valid URLs when creating/editing medicines

### Error saving medicines

**Problem:** Validations fail

**Solution:**
- Name: only alphanumeric and basic characters
- Stock: maximum 40,000 units
- Check browser console for details

## 📞 Support

To report issues or suggestions:
- Create an issue in the repository
- Contact the development team

## 📄 License

This project is part of the MediClick system for medicine access in Colombia.

---
