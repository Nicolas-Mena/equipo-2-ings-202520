# MediClick - Backend Server

> REST API for real-time medicine inventory management system for EPS (Health Promotion Entities) in Colombia

## 📋 Description

MediClick Server is a Node.js REST API that provides backend services for medicine inventory consultation and management across different EPS in Colombia. It uses Supabase as the database provider and implements secure authentication with bcrypt.

## 🚀 Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database provider
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
server/
├── config/
│   ├── db.js              # Supabase client configuration
│   └── initDB.js          # Database initialization script
├── controllers/
│   └── usuariosController.js  # Route controllers
├── models/
│   └── usuarioModel.js    # Data access layer
├── app.js                 # Express app and routes
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not in repo)
└── README.md             # This file
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the server root with:

```env
# === Supabase Configuration ===
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# === Server Configuration ===
PORT=3000

# === Legacy PostgreSQL (if not using Supabase) ===
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=inventario_eps
DB_PORT=5432
```

**Important:** Never commit the `.env` file to version control.

## 🔧 Installation

### Prerequisites

- Node.js >= 14.x
- npm >= 6.x
- Supabase account and project

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. **Initialize database (optional)**
```bash
npm run initdb
```

## 🎮 Available Scripts

### Development Mode
```bash
npm run dev
```
Starts the server with nodemon (auto-restart on changes) on port 3000

### Production Mode
```bash
npm start
```
Starts the server with node

### Initialize Database
```bash
npm run initdb
```
Runs the database initialization script

## 📊 Database Schema

### Tables

#### `eps` - Health Promotion Entities
```sql
eps_id          SERIAL PRIMARY KEY
nombre          VARCHAR(255) NOT NULL
nit             VARCHAR(50) UNIQUE NOT NULL
email           VARCHAR(255) UNIQUE NOT NULL
password        VARCHAR(255) NOT NULL  -- bcrypt hashed
fecha_registro  TIMESTAMP DEFAULT NOW()
```

#### `medicamentos` - General Medicine Catalog
```sql
medicamento_id  SERIAL PRIMARY KEY
nombre          VARCHAR(255) NOT NULL UNIQUE
fecha_creacion  TIMESTAMP DEFAULT NOW()
```

#### `medicamentos_eps` - Inventory per EPS
```sql
medicamento_eps_id    SERIAL PRIMARY KEY
eps_id                INTEGER REFERENCES eps(eps_id)
medicamento_id        INTEGER REFERENCES medicamentos(medicamento_id)
descripcion           TEXT
imagen_url            VARCHAR(500)
cantidad_disponible   INTEGER DEFAULT 0
fecha_actualizacion   TIMESTAMP DEFAULT NOW()

CONSTRAINT unique_eps_medicamento UNIQUE(eps_id, medicamento_id)
```

## 🛣️ API Endpoints

### EPS Management

#### Get all EPS
```http
GET /api/eps
```

**Response:**
```json
[
  {
    "eps_id": 1,
    "nombre": "EPS Sura",
    "nit": "890123456-1",
    "email": "admin@sura.com"
  }
]
```

#### Get EPS by ID
```http
GET /api/eps/:eps_id
```

#### Create new EPS
```http
POST /api/eps
Content-Type: application/json

{
  "nombre": "Nueva EPS",
  "nit": "890999999-1",
  "email": "admin@nuevaeps.com",
  "password": "securepassword"
}
```

#### EPS Login
```http
POST /api/eps/login
Content-Type: application/json

{
  "email": "admin@sura.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "✅ Login exitoso",
  "eps": {
    "eps_id": 1,
    "nombre": "EPS Sura",
    "nit": "890123456-1",
    "email": "admin@sura.com"
  }
}
```

### Medicine Catalog (General)

#### Get all medicines
```http
GET /api/medicamentos
```

#### Create medicine
```http
POST /api/medicamentos
Content-Type: application/json

{
  "nombre": "Paracetamol 500mg"
}
```

### Inventory per EPS

#### Get complete inventory of an EPS
```http
GET /api/eps/:eps_id/medicamentos
```

**Response:**
```json
[
  {
    "medicamento_eps_id": 1,
    "eps_id": 1,
    "medicamento_id": 5,
    "medicamento": "Paracetamol 500mg",
    "descripcion": "Analgésico y antipirético",
    "imagen_url": "https://example.com/image.jpg",
    "cantidad_disponible": 150,
    "fecha_actualizacion": "2025-01-15T10:30:00Z",
    "eps": "EPS Sura"
  }
]
```

#### Search medicines in EPS inventory
```http
GET /api/eps/:eps_id/medicamentos/search?nombre=paracetamol
```

#### Create medicine and add to EPS
```http
POST /api/eps/:eps_id/medicamentos/nuevo
Content-Type: application/json

{
  "nombre": "Ibuprofeno 400mg",
  "descripcion": "Antiinflamatorio no esteroideo",
  "imagen_url": "https://example.com/ibuprofen.jpg",
  "cantidad_disponible": 200
}
```

**Response:**
```json
{
  "medicamento": {
    "medicamento_id": 10,
    "nombre": "Ibuprofeno 400mg"
  },
  "medicamento_eps": {
    "medicamento_eps_id": 25,
    "eps_id": 1,
    "medicamento_id": 10,
    "descripcion": "Antiinflamatorio no esteroideo",
    "imagen_url": "https://example.com/ibuprofen.jpg",
    "cantidad_disponible": 200,
    "fecha_actualizacion": "2025-01-15T11:00:00Z"
  }
}
```

#### Add existing medicine to EPS
```http
POST /api/eps/:eps_id/medicamentos
Content-Type: application/json

{
  "medicamento_id": 5,
  "descripcion": "Stock disponible",
  "imagen_url": "https://example.com/image.jpg",
  "cantidad_disponible": 100
}
```

#### Update medicine in EPS
```http
PUT /api/eps/:eps_id/medicamentos/:medicamento_id
Content-Type: application/json

{
  "cantidad": 250,
  "descripcion": "Stock actualizado",
  "imagen_url": "https://example.com/new-image.jpg"
}
```

#### Delete medicine from EPS inventory
```http
DELETE /api/eps/:eps_id/medicamentos/:medicamento_id
```

**Note:** This only removes the medicine from the EPS inventory, not from the general catalog.

### Statistics

#### Get system statistics
```http
GET /api/stats
```

**Response:**
```json
{
  "totalEPS": 5,
  "totalMedicamentos": 1250,
  "disponibilidadPromedio": 85
}
```

## 🔒 Security Features

### Password Hashing
- All passwords are hashed using bcrypt (10 salt rounds)
- Automatic migration from plaintext to hashed passwords on login
- Passwords never returned in API responses

### Authentication
- Login endpoint validates credentials and returns EPS data (without password)
- Failed login attempts return appropriate error messages
- Email existence check for better error feedback

### Validations
- Required field validation on all endpoints
- Unique constraints on NIT and email for EPS
- Duplicate medicine prevention per EPS (unique constraint)
- Input sanitization through Express body-parser

## 🐛 Error Handling

### Common HTTP Status Codes

- `200` - Success
- `201` - Resource created successfully
- `400` - Bad request (missing required fields)
- `401` - Unauthorized (invalid credentials)
- `404` - Resource not found
- `409` - Conflict (duplicate resource)
- `500` - Server error

### Error Response Format
```json
{
  "error": "Error description",
  "details": "Additional details (only in development)"
}
```

## 🚀 Deployment

### Render (Recommended)

1. **Create new Web Service**
2. **Connect repository**
3. **Configure:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
4. **Add environment variables:**
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `PORT` (optional, Render auto-assigns)

### Alternative Platforms

- **Heroku:** Use Procfile with `web: npm start`
- **Railway:** Auto-detects Node.js configuration
- **DigitalOcean App Platform:** Similar to Render setup

## 📈 Performance Considerations

### Database Queries
- Uses Supabase client with automatic connection pooling
- Indexes on foreign keys (eps_id, medicamento_id)
- Unique constraints for data integrity
- Order results by name for better UX

### Caching Recommendations
- Consider Redis for frequently accessed data
- Implement ETag headers for conditional requests
- Use CDN for static content (if applicable)

## 🧪 Testing

### Manual Testing with curl

```bash
# Test EPS endpoint
curl http://localhost:3000/api/eps

# Test login
curl -X POST http://localhost:3000/api/eps/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sura.com","password":"password123"}'

# Test inventory
curl http://localhost:3000/api/eps/1/medicamentos
```

### Recommended Testing Tools
- **Postman** - API testing and documentation
- **Insomnia** - REST client
- **Jest** - Unit testing framework (to implement)

## 🔄 Migration from PostgreSQL to Supabase

The application now uses Supabase instead of direct PostgreSQL connection. Legacy environment variables (DB_USER, DB_PASSWORD, etc.) are maintained for reference but not used.

### Benefits of Supabase
- Built-in authentication and security
- Real-time subscriptions (future feature)
- Auto-generated REST API
- Built-in storage for files
- Dashboard for database management

## 📝 Development Notes

### Code Style
- ES6+ modules (type: "module")
- Async/await for asynchronous operations
- Descriptive error messages with emojis
- Console logging for debugging

### Future Improvements
- [ ] Implement JWT authentication
- [ ] Add rate limiting
- [ ] Implement request validation middleware
- [ ] Add comprehensive unit tests
- [ ] Add API documentation with Swagger
- [ ] Implement pagination for large datasets
- [ ] Add real-time updates with WebSockets

## 📞 Support

For issues or suggestions:
- Create an issue in the repository
- Contact the development team

## 📄 License

This project is part of the MediClick system for medicine access in Colombia.

---

