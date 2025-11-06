# Server - General README

## 📋 Project Overview

This is the **backend server** for the EPS Inventory Management System. It provides a RESTful API for managing health insurance companies (EPS), medications, and inventory records. The server is built with **Express.js** and connects to a **PostgreSQL** database to handle all data persistence.

### Project Structure

```
server/
├── config/              # Database configuration files
│   └── db.js           # PostgreSQL connection pool
├── controllers/         # HTTP request handlers and business logic
│   └── usuariosController.js
├── models/             # Database queries and operations
│   └── usuarioModel.js
├── node_modules/       # Project dependencies
├── .env                # Environment variables (not included in repo)
├── app.js              # Main Express server file
├── migrarPasswords.js  # Password migration utility
├── probarLoginEPS.js   # Login testing utility
├── package.json        # Dependencies and scripts
└── package-lock.json   # Locked dependency versions
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download the project and navigate to the server folder:

```bash
cd server
```

2. Install all dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the server folder with your database credentials:

```
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_NAME=inventario_eps
DB_PORT=5432
PORT=3000
```

4. Ensure PostgreSQL is running and create the database:

```bash
createdb inventario_eps
```

5. Create the required database tables. You can run the initialization script if available, or manually create the tables using the SQL schema provided in the database documentation.

### Running the Server

**Development mode** (with auto-reload):

```bash
npm run dev
```

**Production mode**:

```bash
npm start
```

When the server starts successfully, you should see:

```
🚀 Servidor corriendo en puerto 3000
✅ Successful connection to PostgreSQL
```

## 🧪 Testing

See `server/testing/README.md` for details about available smoke tests and Jest-style checks. The smoke test is dependency-free and can be run with:

```powershell
node server\testing\smoke_test.js
```

The testing README explains each check and how to run the Jest-based `code.test.js` if you decide to install Jest.

## 🔗 Available API Endpoints

### EPS (Health Insurance Companies)

- **GET /api/eps** - Retrieve all registered EPS
- **POST /api/eps** - Create a new EPS
- **POST /api/eps/login** - Login with EPS email and password

### Medications

- **GET /api/medicamentos** - Retrieve all available medications

### Inventory

- **GET /api/inventario/:eps_id** - Get inventory for a specific EPS
- **PUT /api/inventario** - Update medication quantity in inventory

## 📁 Folder Descriptions

### config/

Contains all configuration files, particularly the PostgreSQL connection pool that all database operations use. The connection is centralized here to avoid credentials being hardcoded throughout the application.

**Key file:** `db.js` - Exports the connection pool used by models

### controllers/

Contains the HTTP request handlers. These functions receive API requests, validate input, call appropriate model functions, and return responses. Controllers handle the business logic flow without dealing directly with the database.

**Key file:** `usuariosController.js` - Handles all HTTP endpoints for EPS, medications, and inventory

### models/

Contains all database query functions. These are asynchronous functions that execute SQL queries and return results. Models act as the data access layer, keeping database logic separate from HTTP handling.

**Key file:** `usuarioModel.js` - All database operations (getAllEPS, createEPS, loginEPS, etc.)

### node_modules/

Auto-generated folder containing all installed npm packages. Do not modify manually.

## 🔧 Utility Scripts

### migrarPasswords.js

Utility script to hash plain-text passwords in the database using bcrypt. Run this if you have existing EPS records with unhashed passwords:

```bash
node migrarPasswords.js
```

**What it does:**
- Finds all EPS records in the database
- Checks if passwords are already hashed (bcrypt format)
- Hashes any plain-text passwords with bcrypt (10 rounds)
- Updates the database with hashed passwords

### probarLoginEPS.js

Test script to verify the login functionality works correctly:

```bash
node probarLoginEPS.js
```

**Before running:**
1. Edit the script and change the `email` and `password` variables to match an EPS record in your database
2. Run the script to test the login process

**Output examples:**
- ✅ Login exitoso! - Login succeeded
- ❌ Usuario no encontrado - Email not found
- ❌ Contraseña incorrecta - Wrong password

## ⚙️ Technologies Used

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Express.js** | Web framework for handling HTTP requests | ^4.19.2 |
| **PostgreSQL** | Relational database | ≥14 |
| **pg** | PostgreSQL client for Node.js | ^8.12.0 |
| **bcrypt** | Password hashing library | (in package.json) |
| **CORS** | Cross-origin resource sharing middleware | ^2.8.5 |
| **body-parser** | Middleware to parse request bodies | ^1.20.2 |
| **dotenv** | Environment variables management | ^16.4.5 |
| **nodemon** | Auto-restart server during development | ^3.1.0 |

## 🧾 Development Standards

### Code Style

- **ES Modules:** Use ES6+ import/export syntax
- **Naming Convention:** Use camelCase for variables and functions
- **Comments:** Use JSDoc format for function documentation
- **Async/Await:** Always use async/await for asynchronous operations

### Error Handling

All functions should include try-catch blocks and throw descriptive errors:

```javascript
try {
  const data = await someAsyncOperation();
  res.status(200).json(data);
} catch (error) {
  console.error("Error:", error);
  res.status(500).json({ error: "Descriptive error message" });
}
```

### SQL Security

Always use parameterized queries to prevent SQL injection:

```javascript
// ✅ CORRECT
const result = await pool.query("SELECT * FROM eps WHERE email = $1", [email]);

// ❌ WRONG
const result = await pool.query(`SELECT * FROM eps WHERE email = '${email}'`);
```

### Response Format

All API responses should be JSON:

```javascript
// Success response
res.status(200).json({ data: result });

// Error response
res.status(400).json({ error: "Error message here" });
```

## 🗄️ Database Schema Overview

The application uses three main tables:

**eps** - Health insurance company information
- eps_id (Primary Key)
- nombre (Company name)
- nit (Tax ID)
- email (Unique email)
- password (Bcrypt hashed)

**medicamentos** - Available medications
- medicamento_id (Primary Key)
- nombre (Medication name)
- descripcion (Description)

**inventario** - Tracks medication quantities per EPS
- inventario_id (Primary Key)
- eps_id (Foreign Key)
- medicamento_id (Foreign Key)
- cantidad_disponible (Current quantity)
- fecha_actualizacion (Last update timestamp)

## 🧱 JavaScript Version

The project uses **ES2022 (Modern ECMAScript)** enabled by `"type": "module"` in package.json. This allows:

- ES6 import/export statements
- async/await
- Destructuring
- Template literals
- Optional chaining (?.)
- Nullish coalescing (??)
- Spread operator (...)

## 🔐 Environment Variables

The `.env` file must contain:

```
# Database Connection
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_NAME=inventario_eps
DB_PORT=5432

# Server Configuration
PORT=3000
```

**Important:** Never commit the `.env` file to version control. Add it to `.gitignore`.

## 📦 Installing Dependencies

To install or reinstall all dependencies:

```bash
npm install
```

To add a new package:

```bash
npm install package-name
```

To update packages:

```bash
npm update
```

## 🐛 Troubleshooting

### "Cannot find module 'pg'"

Make sure all dependencies are installed:

```bash
npm install
```

### "Connection refused" error

- Verify PostgreSQL is running
- Check `.env` file has correct database credentials
- Ensure the database exists: `createdb inventario_eps`

### "Port 3000 is already in use"

Either:
- Kill the process using port 3000
- Change the PORT in the `.env` file
- Use `npm start` instead of `npm run dev`

### "bcrypt binding error"

Install build tools and reinstall bcrypt:

```bash
npm install --save-dev node-gyp
npm install bcrypt
```

## 📝 npm Scripts

Available npm commands:

```bash
npm run dev      # Start server in development mode with auto-reload
npm start        # Start server in production mode
npm run initdb   # Initialize database (if initDB.js exists)
```

## 🔄 API Request Examples

### Create a new EPS

```bash
curl -X POST http://localhost:3000/api/eps \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "EPS Nueva",
    "nit": "900123456",
    "email": "info@epsnueva.com",
    "password": "secure_password_123"
  }'
```

### Login to EPS

```bash
curl -X POST http://localhost:3000/api/eps/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "info@epsnueva.com",
    "password": "secure_password_123"
  }'
```

### Get all medications

```bash
curl http://localhost:3000/api/medicamentos
```

### Get inventory for specific EPS

```bash
curl http://localhost:3000/api/inventario/1
```

### Update inventory

```bash
curl -X PUT http://localhost:3000/api/inventario \
  -H "Content-Type: application/json" \
  -d '{
    "eps_id": 1,
    "medicamento_id": 5,
    "cantidad": 100
  }'
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [bcrypt npm Package](https://www.npmjs.com/package/bcrypt)
