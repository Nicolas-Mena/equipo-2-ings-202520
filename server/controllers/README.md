# 🧩 Controlador de Usuarios (usuariosController.js)

Este módulo gestiona las operaciones relacionadas con las **EPS**, **medicamentos** e **inventario** dentro del sistema.  
Funciona como intermediario entre las **rutas (routes)** y los **modelos (models)**, coordinando la lógica del negocio y el manejo de errores.

---

## 🧠 Descripción General

El archivo `usuariosController.js` contiene las funciones que atienden las peticiones HTTP relacionadas con:

- Gestión de **EPS** (crear, listar, iniciar sesión)
- Consulta de **medicamentos**
- Consulta y actualización del **inventario** por EPS

Cada función recibe un objeto `req` y `res` de **Express**, llama a los métodos del modelo correspondiente (`usuarioModel.js`) y devuelve una respuesta JSON adecuada.

---

## ⚙️ Estructura de Carpetas

server/
└── controllers/
    ├── usuariosController.js   # EPS, medicamentos, inventario
    └── README.md
