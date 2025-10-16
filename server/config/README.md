# Config Folder Documentation

## ❓ What Does This Folder Do?

The `config/` folder stores all **global backend configuration files**. In this case, it contains the configuration to connect to the **PostgreSQL** database.

### 🧭 Main Purpose

- Initialize and export the connection pool (PostgreSQL client).
- Centralize connection configuration and environment variables.
- Prevent credentials from being defined directly in the source code.

## ⚙️ Technologies Used

| Technology | Description |
|-------------|-------------|
| **Node.js** | Backend runtime environment. |
| **pg** | Official PostgreSQL client for Node.js. |
| **dotenv** | Secure management of environment variables (.env). |

## 🧩 How Is This Part of the Project Installed?

1. Open a terminal in the root folder (`server/`).

2. Install the necessary dependencies:

```bash
npm install pg dotenv
```

3. Create a .env file with the connection variables:

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=inventario_eps
DB_PORT=5432
```

4. This configuration runs automatically when the server starts (app.js). You don't need to run anything manually; just make sure PostgreSQL is active and that the .env variables are properly configured.

5. To start the complete server:

```bash
npm run dev
```

or

```bash
npm start
```

When you do this, you should see in the console:

```
✅ Successful connection to PostgreSQL
Server running on port 3000
```

## 🧾 Standards to Consider

**Code Style:** ES Modules (import / export)

**Naming Convention:** lowerCamelCase for variables and functions.

**Comments:** It is recommended to use JSDoc to describe functions and parameters.

Example:

```javascript
/**
 * Establishes and exports the connection to the PostgreSQL pool.
 * @module config/db
 * @returns {Pool} pool - PostgreSQL connection instance.
 */
```

## 🧱 JavaScript Version

The project uses ES2022 (Modern ECMAScript) with native ES modules, thanks to the `"type": "module"` field in package.json. This allows using:

- import / export
- async / await
- Destructuring
- Template strings

Example of package.json:

```json
{
  "type": "module"
}
```

## 🗃️ Database Requirements

For the connection to work correctly you need:

1. Have PostgreSQL installed (recommended version: ≥ 14).

2. Create a database with the name defined in .env, for example:

```sql
CREATE DATABASE inventario_eps;
```

3. Configure a user with appropriate permissions:

```sql
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE inventario_eps TO postgres;
```

4. Verify that the PostgreSQL server is running on the indicated port (default 5432).