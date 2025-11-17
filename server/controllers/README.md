# Controllers Folder Documentation

## ❓ What Does This Folder Do?

The **`controllers/`** folder contains the files responsible for handling the **business logic** and **HTTP requests** of the project. Each controller acts as an intermediary between the **routes** (`routes`) and the **models** (`models`). In this case, the `usuariosController.js` file manages all operations related to **EPS**, **medications**, and **inventories**. It receives requests from the client (`req`), processes the information, and sends responses (`res`). It calls functions from the `usuarioModel.js` model to perform database operations. It also handles errors and validates data before executing any action.

## ⚙️ Technologies Used

- **Node.js** → Runtime environment for the backend.
- **Express.js** → Framework that handles routes, requests, and HTTP responses.
- **pg** → PostgreSQL connection client used indirectly through the models.
- **dotenv** → Environment variables management.
- **ES Modules** → For importing/exporting dependencies (`import` / `export`).

## 🧩 How Is This Part of the Project Installed?

1. Make sure you have installed the main backend dependencies (Express and PostgreSQL):

```bash
npm install express pg dotenv
```

2. Start the server from the root folder (server/):

```bash
npm run dev
```

or in production mode:

```bash
npm start
```

3. When starting the server (app.js), Express will automatically import the controller functions and associate them with the defined endpoints:

```javascript
import {
  obtenerEPS,
  crearEPS,
  loginEPS,
  obtenerMedicamentos,
  obtenerInventarioPorEPS,
  actualizarInventario
} from "./controllers/usuariosController.js";
```

4. Once executed, you can test the following endpoints from Postman or the browser:

- `GET /api/eps` → Lists all EPS.
- `POST /api/eps` → Creates a new EPS.
- `POST /api/eps/login` → Logs in.
- `GET /api/medicamentos` → Returns all medications.
- `GET /api/inventario/:eps_id` → Queries inventory by EPS.
- `PUT /api/inventario` → Updates inventory quantity.

5. If everything is correct, the console will show:

```
✅ Successful connection to PostgreSQL
Server running on port 3000
```

## 🧾 What Standards Should Be Considered?

**Code Style:**

- Follow the ES Modules convention (import / export).
- Name functions with camelCase.
- Controllers should be asynchronous (async/await) to handle database operations.

**Comments and Documentation:**

It is recommended to document each function with JSDoc, for example:

```javascript
/**
 * Gets all registered EPS from the database.
 * @async
 * @function obtenerEPS
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @returns {JSON} List of registered EPS.
 */
```

**Response Standardization:**

- All responses must be JSON.
- In case of error, return a correct HTTP code (400, 401, 404, 500).

Example:

```javascript
res.status(500).json({ error: "Error obtaining EPS" });
```

**Validations:**

- Each endpoint must validate required fields before executing queries.
- Use conditionals to avoid null or malformed input errors.

## 🧱 What Version of JavaScript Does It Use?

The controller is written with JavaScript ES2022 (Modern ECMAScript), taking advantage of the features enabled by `"type": "module"` in the package.json file. It allows using:

- import / export
- async / await
- Destructuring
- Template strings
- Modern logical operators (??, ?., etc.)

Example:

```json
{
  "type": "module"
}
```

## 🗃️ What Do I Need for the Database?

This controller depends on the connection configured in config/db.js and the usuarioModel.js model, therefore, it is necessary to have:

1. PostgreSQL installed (recommended version ≥ 14).

2. .env file configured with the connection variables:

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=inventario_eps
DB_PORT=5432
```

3. Necessary tables in the database:

- eps
- medicamentos
- inventario

4. Verify that the database is active before starting the server.