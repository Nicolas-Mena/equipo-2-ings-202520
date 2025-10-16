# MediClick - Cliente Frontend

## 📋 Descripción

Cliente web para consultar disponibilidad de medicamentos en las EPS de Colombia. Este frontend está diseñado para conectarse con un backend PostgreSQL que gestiona EPS, medicamentos e inventarios.

## 🗂️ Estructura de Archivos

```
client/
├── index.html      # Página principal con React CDN
├── script.js       # Componentes React (usando React.createElement)
├── mockData.js     # Datos simulados del backend
├── style.css       # Estilos de la aplicación
└── README.md       # Esta documentación
```

## 🎨 Tecnologías

- **React 18** (via CDN)
- **Babel Standalone** (para JSX en el navegador)
- **CSS Vanilla**
- **JavaScript ES6+**

## 🚀 Cómo Ejecutar (PowerShell o bash)

 Node.js con npx serve

```powershell
cd ...\client
npx serve -p 8080
```

Luego abre en tu navegador: **http://localhost:8080**

## 💡 Funcionalidades

### Para Usuarios (Sin autenticación)

- ✅ Ver lista de todas las EPS disponibles
- ✅ Consultar medicamentos disponibles por EPS
- ✅ Ver cantidad disponible de cada medicamento
- ✅ Ver estadísticas generales del sistema

### Para Administradores EPS (Con autenticación)

- ✅ Login con email y password
- ✅ Todas las funciones de usuario
- ✅ Gestionar inventario de su EPS
- ✅ Actualizar cantidades de medicamentos


