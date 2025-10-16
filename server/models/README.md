# 🧱 Modelo de Usuario (`usuarioModel.js`)

Este módulo contiene todas las funciones encargadas de interactuar directamente con la base de datos **PostgreSQL**.  
Gestiona las operaciones CRUD relacionadas con las **EPS**, **medicamentos** e **inventarios** del sistema.

---

## 🧠 Descripción General

El modelo usa el pool de conexión configurado en `config/db.js` para ejecutar consultas SQL de manera asíncrona.  
Su principal objetivo es aislar la lógica de acceso a datos del resto del código (controladores, rutas, etc.), manteniendo el principio **MVC** (Modelo–Vista–Controlador).

---

## ⚙️ Estructura del Proyecto

server/
└── models/
    ├── usuarioModel.js   # Consultas SQL (EPS, medicamentos, inventario)
    └── README.md
