# MediClick - Frontend Client README

## ❓ What Does This Folder Do?

The `client/` folder contains the **frontend user interface** for the MediClick application. It is a web-based client that provides a simple and intuitive interface for users to view medicine availability across different EPS (Health Promoting Entities) in Colombia. The frontend communicates with the backend server via REST API to fetch and display real-time information about medications and inventory. Users can browse medicines without authentication, while EPS administrators can log in to manage inventory and update medicine quantities for their organization.

## 🧩 How Is This Part of the Project Installed?

1. Navigate to the client folder from your terminal:

```bash
cd client
```

2. Ensure you have Node.js and npm installed on your system. If not, download from [nodejs.org](https://nodejs.org/).

3. Verify that `npx` is available (it comes with Node.js by default):

```bash
npx --version
```

4. The client does not have a `package.json` with dependencies to install. It uses a CDN-based approach where React and Babel are loaded directly from the internet. However, you'll need `npx serve` to run a local development server:

```bash
npx serve -p 8080
```

The `-p 8080` flag specifies port 8080. You can change this to any available port.

5. If you want to use a different HTTP server, you can alternatively use:

```bash
# Using Python 3
python -m http.server 8080

# Using Python 2
python -m SimpleHTTPServer 8080

# Using Node.js http-server (if installed)
npx http-server -p 8080
```

## 🚀 How Is This Part of the Project Run?

### Using npx serve (Recommended for Windows PowerShell)

1. Open PowerShell and navigate to the client folder:

```powershell
cd C:\path\to\project\client
```

2. Start the development server:

```powershell
npx serve -p 8080
```

3. You should see output similar to:

```
   ┌────────────────────────────────────────┐
   │   Accepting connections at:            │
   │   http://localhost:8080                │
   │   http://192.168.x.x:8080             │
   └────────────────────────────────────────┘
```

4. Open your browser and navigate to:

```
http://localhost:8080
```

### Application Flow

1. When the page loads, `index.html` is served to the browser.

2. `index.html` loads:
   - React 18 and ReactDOM from CDN
   - Babel Standalone for JSX compilation in the browser
   - The main `script.js` file containing React components
   - The `style.css` file for styling

3. `script.js` renders the React application to the DOM element with id `root`.

4. The application makes API calls to the backend server at `http://localhost:3000` to fetch:
   - List of EPS
   - Available medications
   - Inventory information

5. Users interact with the interface, which updates the DOM based on React state changes.

### Stopping the Server

Press `Ctrl+C` in your terminal to stop the development server.

## 🧾 Standards to Consider in This Part of the Project

### Code Style

- **ES6+ Features:** Use modern JavaScript features such as arrow functions, destructuring, const/let, and template literals.
- **Naming Convention:** Use camelCase for variables and functions, PascalCase for React components.
- **Semicolons:** Consistently use semicolons at the end of statements.
- **Indentation:** Use 2 spaces for indentation consistency.

### React Component Standards

- **Functional Components:** Create React components using functional syntax with hooks (useState, useEffect).
- **Component Naming:** Name components with PascalCase (e.g., `EPSList`, `MedicineDetail`).
- **Props Validation:** Document expected props with comments or PropTypes.
- **JSDoc Documentation:** Document React components and utility functions with JSDoc comments.

Example:

```javascript
/**
 * Displays a list of all available EPS.
 * @component
 * @returns {React.ReactElement} The EPS list component.
 * @example
 * return <EPSList />
 */
function EPSList() {
  // component implementation
}
```

### File Organization

- **index.html:** Contains only the basic HTML structure and CDN links. Keep it minimal.
- **script.js:** Contains all React components and application logic. Keep components organized with clear section comments.
- **style.css:** Contains all CSS styles. Use class names that reflect component structure (e.g., `.eps-list`, `.medicine-card`).

### Comments and Documentation

- Add comments explaining complex logic or API interactions.
- Use block comments for section separators.
- Keep comments concise and meaningful.

Example:

```javascript
// ======== FETCH EPS DATA ========
// Retrieve list of EPS from backend server
async function fetchEPS() {
  try {
    const response = await fetch('http://localhost:3000/api/eps');
    if (!response.ok) throw new Error('Failed to fetch EPS');
    return await response.json();
  } catch (error) {
    console.error('Error fetching EPS:', error);
    return [];
  }
}
```

### Error Handling

- Wrap all async operations in try-catch blocks.
- Display user-friendly error messages in the UI.
- Log errors to the console for debugging.
- Handle API failures gracefully.

### API Communication

- Always check response status before parsing JSON.
- Use `async/await` for cleaner asynchronous code.
- Handle network errors appropriately.
- Display loading states while fetching data.

Example:

```javascript
const [loading, setLoading] = React.useState(true);
const [error, setError] = React.useState(null);

React.useEffect(() => {
  fetchData()
    .then(data => setData(data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);
```

### CSS Standards

- Use class-based selectors (avoid inline styles when possible).
- Use descriptive class names related to component function.
- Group related styles together with comments.
- Use CSS variables for colors and commonly used values.
- Ensure responsive design for mobile, tablet, and desktop.

Example:

```css
/* ======== EPS SECTION ======== */
.eps-container {
  display: grid;
  gap: 1rem;
  padding: 2rem;
}

.eps-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Accessibility

- Use semantic HTML elements (header, nav, main, section, article).
- Include proper alt text for images.
- Ensure sufficient color contrast for readability.
- Use ARIA labels for interactive elements when needed.

## 🧱 JavaScript Version

The client uses **ES6+ (ECMAScript 2015 and later)** features. This includes:

- `const` and `let` for variable declarations
- Arrow functions `() => {}`
- Template literals with backticks `` `text ${variable}` ``
- Destructuring assignment `const { name, email } = user`
- `async/await` for asynchronous operations
- Spread operator `...array`
- Classes and `import/export` (via Babel transpilation in browser)

The application uses **React 18** via CDN, which provides:

- Hooks (useState, useEffect, useContext)
- Functional components
- JSX syntax (transpiled by Babel)

### Browser Compatibility

The application is compatible with all modern browsers that support:

- ES6 JavaScript
- React 18
- Fetch API
- LocalStorage (optional, for future enhancements)

**Minimum Supported Browsers:**
- Chrome 51+
- Firefox 54+
- Safari 10+
- Edge 15+

## 🗃️ What Do I Need for the Database?

The frontend client **does not directly interact with the database**. Instead, it communicates with the backend server through REST API endpoints. The database is managed entirely by the backend server.

### Backend Server Requirement

The frontend requires a running backend server to function properly. The backend server:

- Manages all database connections
- Handles user authentication
- Provides API endpoints for data retrieval and updates
- Secures database credentials and access

### Backend API Endpoints Expected

The frontend makes requests to the following backend endpoints:

**EPS Management:**
- `GET /api/eps` - Retrieve list of all EPS
- `POST /api/eps` - Create a new EPS
- `POST /api/eps/login` - Authenticate EPS administrator

**Medications:**
- `GET /api/medicamentos` - Retrieve all available medications

**Inventory:**
- `GET /api/inventario/:eps_id` - Get inventory for specific EPS
- `PUT /api/inventario` - Update medication quantities

### Environment Configuration

The frontend is configured to communicate with the backend at:

```
http://localhost:3000
```

If your backend server runs on a different host or port, update the API URLs in `script.js`:

```javascript
const API_URL = 'http://localhost:3000'; // Change this if needed
```

Or, for production:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
```

### Database Schema (Reference Only)

While the frontend doesn't access the database directly, it expects data in the following structure:

**EPS Data:**
```json
{
  "eps_id": 1,
  "nombre": "EPS Name",
  "nit": "900123456",
  "email": "info@eps.com"
}
```

**Medication Data:**
```json
{
  "medicamento_id": 1,
  "nombre": "Medicine Name",
  "descripcion": "Medicine description"
}
```

**Inventory Data:**
```json
{
  "inventario_id": 1,
  "eps": "EPS Name",
  "medicamento": "Medicine Name",
  "cantidad_disponible": 100,
  "fecha_actualizacion": "2024-10-15T10:30:00Z"
}
```

### Connecting Frontend to Backend

1. Ensure the backend server is running (see backend README):

```bash
cd server
npm run dev
```

2. Verify the backend is accessible at `http://localhost:3000`.

3. Start the frontend as described in the "How Is This Part of the Project Run?" section.

4. The frontend will automatically make API requests to fetch data from the backend.

5. Test the connection by opening the browser console (`F12`) and checking for any network errors in the Network tab.

### Troubleshooting Database/API Connection Issues

**Frontend shows "Failed to fetch" or empty data:**

1. Verify backend server is running on port 3000
2. Check browser console for CORS errors
3. Verify backend `.env` file is configured correctly
4. Test backend endpoints directly using Postman or curl:

```bash
curl http://localhost:3000/api/eps
```

**CORS Error in browser console:**

The backend should have CORS enabled. Check `app.js` includes:

```javascript
import cors from "cors";
app.use(cors());
```

**Connection refused error:**

- Backend server is not running
- Backend is running on different port than `http://localhost:3000`
- Firewall is blocking the connection

## 📁 File Descriptions

### index.html

The main HTML file that serves as the entry point for the application. It contains:

- Basic HTML structure with a root div for React
- CDN links to React, ReactDOM, and Babel
- References to external CSS and JavaScript files
- Minimal inline code, keeping logic in separate files

### script.js

Contains all React components and application logic:

- React components using `React.createElement` or JSX syntax
- State management with hooks
- API integration functions
- Event handlers
- Utility functions

Keep this file organized with clear section comments.

### style.css

Contains all application styling:

- Component-specific styles
- Layout and responsive design
- Color schemes and typography
- Animations and transitions
- Mobile-first responsive approach

## 🧭 Quick Navigation

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point and CDN setup |
| `script.js` | React components and logic |
| `style.css` | Application styling |
| `README.md` | Project documentation |

## 🚨 Common Issues and Solutions

## 🧪 Testing

For details about the client smoke tests and test guidance, see the testing README:

- `client/testing/README.md` — contains a quick smoke test (`smoke_test.js`) that checks presence of the main client files and a Jest-style `code.test.js` (if you use Jest). Run the smoke test with:

  ```powershell
  node client\testing\smoke_test.js
  ```

Read the testing README for more details on what each test does and how to run them.

**Port 8080 already in use:**

```powershell
npx serve -p 3001  # Use different port
```

**Module not found or Cannot find module:**

```powershell
npm install  # Install all dependencies (if any)
npx serve -p 8080  # Clear cache and restart
```

**Blank page or React not loading:**

1. Check browser console for errors (F12)
2. Verify index.html has correct CDN links
3. Check network tab to see if resources loaded
4. Clear browser cache (Ctrl+Shift+Delete)

**API requests failing:**

1. Verify backend is running: `npm run dev` in server folder
2. Check that backend is on port 3000
3. Look for CORS errors in console
4. Test API directly: `curl http://localhost:3000/api/eps`

