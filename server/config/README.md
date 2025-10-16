# 📦 Configuración de Base de Datos (PostgreSQL)

Este módulo establece la conexión entre el backend en **Node.js** y la base de datos **PostgreSQL**, utilizando las librerías `pg` y `dotenv`.

---

## 🧠 Descripción General

El archivo `config/db.js` configura un **pool de conexiones** para interactuar con PostgreSQL de forma eficiente y segura.  
Las credenciales de la base de datos se manejan a través de variables de entorno definidas en el archivo `.env`.

---

## ⚙️ Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución.
- **pg** – Cliente oficial de PostgreSQL para Node.js.
- **dotenv** – Manejo de variables de entorno.

---

## 🗂️ Estructura del Proyecto

server/
└── config/
    ├── db.js          # Conexión a PostgreSQL (pg + dotenv)
    └── README.md
