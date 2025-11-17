# Models Folder README

## ❓ What Does This Folder Do?

The `models/` folder contains all the **database interaction logic** for the application. In this project, the `usuarioModel.js` file exports asynchronous functions that directly query the PostgreSQL database through the connection pool. Each function handles specific database operations related to EPS (health insurance companies), medications, and inventory management. The model layer acts as an intermediary between the controllers and the database, ensuring that all data persistence logic is centralized and reusable.

## 🧩 How Is This Part of the Project Installed?

1. Open a terminal in the root folder (`server/`).

2. Install the necessary dependencies:

```bash
npm install pg bcrypt dotenv
```

3. Create a .env file in the root folder with the database connection variables:

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=inventario_eps
DB_PORT=5432
```

4. Ensure that the `config/db.js` file is properly configured to export the connection pool:

```javascript
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export default pool;
```

5. Verify that PostgreSQL is running and that the database and tables are created with the required schema.

## 🚀 How Is This Part of the Project Run?

1. The model functions are imported and called from the **controllers** (`controllers/usuariosController.js`).

2. When the server starts with:

```bash
npm run dev
```

or

```bash
npm start
```

The controllers automatically use the model functions to handle HTTP requests.

3. Example of how a controller uses the model:

```javascript
import {
  getAllEPS,
  createEPS,
  loginEPS,
  getAllMedicamentos,
  getInventarioPorEPS,
  buscarMedicamentoEnEPS,
  actualizarInventario
} from "../models/usuarioModel.js";

// In a controller function
export async function obtenerEPS(req, res) {
  try {
    const eps = await getAllEPS();
    res.status(200).json(eps);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving EPS" });
  }
}
```

4. You can test the endpoints using Postman or curl to verify that the model functions are working correctly:

```bash
GET http://localhost:3000/api/eps
POST http://localhost:3000/api/eps
POST http://localhost:3000/api/eps/login
GET http://localhost:3000/api/medicamentos
GET http://localhost:3000/api/inventario/:eps_id
PUT http://localhost:3000/api/inventario
```

## 🧾 Standards to Consider in This Part of the Project

**Code Style:** Follow ES Modules convention (import / export) and use camelCase for function and variable names.

**Asynchronous Functions:** All database operations must use async/await to handle asynchronous queries properly.

**JSDoc Documentation:** Every function should be documented with JSDoc comments describing parameters, return values, and purpose. Example:

```javascript
/**
 * Retrieves all registered EPS from the database.
 * @async
 * @function getAllEPS
 * @returns {Promise<Array>} Array of EPS objects containing eps_id, nombre, nit, and email.
 * @throws {Error} If database query fails.
 */
export async function getAllEPS() {
  // function body
}
```

**Error Handling:** Use try-catch blocks for error handling and throw descriptive errors that can be caught by controllers.

**Transactions:** For complex operations involving multiple queries (like createEPS), use database transactions with BEGIN, COMMIT, and ROLLBACK to ensure data consistency.

**SQL Parameterization:** Always use parameterized queries ($1, $2, etc.) to prevent SQL injection attacks:

```javascript
// ✅ CORRECT - Prevents SQL injection
const result = await pool.query("SELECT * FROM eps WHERE email = $1", [email]);

// ❌ WRONG - Vulnerable to SQL injection
const result = await pool.query(`SELECT * FROM eps WHERE email = '${email}'`);
```

**Naming Conventions:** Function names should clearly describe their database operation (e.g., getAllEPS, createEPS, loginEPS, actualizarInventario).

**Separation of Concerns:** Keep database logic separate from business logic and HTTP handling. Model functions should only handle database operations.

## 🧱 JavaScript Version

The project uses **ES2022 (Modern ECMAScript)** with native ES modules, enabled by the `"type": "module"` field in package.json. This allows using modern JavaScript features:

- import / export
- async / await
- Destructuring
- Template strings
- Optional chaining (?.)
- Nullish coalescing operator (??)
- Spread operator (...)

Example of package.json:

```json
{
  "name": "inventario-eps",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch app.js",
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.9.0",
    "bcrypt": "^5.1.0",
    "dotenv": "^16.0.3"
  }
}
```

## 🗃️ What Do I Need for the Database?

### PostgreSQL Installation

Ensure PostgreSQL is installed on your system (version 14 or higher recommended).

### Database Creation

Create the database specified in your .env file:

```sql
CREATE DATABASE inventario_eps;
```

### Required Tables

The following tables must exist in the database for the model functions to work:

1. **eps table** - Stores health insurance company information:

```sql
CREATE TABLE eps (
  eps_id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  nit VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

2. **medicamentos table** - Stores medication information:

```sql
CREATE TABLE medicamentos (
  medicamento_id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT
);
```

3. **inventario table** - Stores inventory records linking EPS to medications:

```sql
CREATE TABLE inventario (
  inventario_id SERIAL PRIMARY KEY,
  eps_id INTEGER NOT NULL REFERENCES eps(eps_id),
  medicamento_id INTEGER NOT NULL REFERENCES medicamentos(medicamento_id),
  cantidad_disponible INTEGER DEFAULT 0,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Permissions

Create a database user with appropriate permissions:

```sql
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE inventario_eps TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
```

### Environment Variables

Configure these variables in the .env file:

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=inventario_eps
DB_PORT=5432
```

### Verification

Before running the server, verify that:

1. PostgreSQL is running on the specified host and port.
2. The database exists and is accessible with the provided credentials.
3. All required tables are created with the correct schema.
4. The .env file is properly configured with correct credentials.

If everything is set up correctly, when you start the server you should see:

```
✅ Successful connection to PostgreSQL
Server running on port 3000
```