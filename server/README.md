# ⚙️ Backend — Sistema de Gestión de Inventario EPS

Este proyecto implementa el backend de un **Sistema de Gestión de Inventario** para EPS (Entidades Promotoras de Salud), desarrollado con **Node.js**, **Express** y **PostgreSQL**.  
Su objetivo es centralizar la información de medicamentos, inventarios y autenticación de EPS, ofreciendo una API REST moderna, segura y escalable.

---

## 🧩 Objetivos del Proyecto

- Centralizar los datos de **EPS**, **medicamentos** e **inventarios**.
- Permitir la **gestión de stock** por EPS en tiempo real.
- Asegurar un acceso estructurado a través de endpoints REST.
- Mantener una arquitectura **modular y mantenible** basada en MVC.

---

## 🧠 Tecnologías Utilizadas

| Tecnología | Propósito |
|-------------|------------|
| **Node.js** | Entorno de ejecución JavaScript en el servidor. |
| **Express.js** | Framework web para la creación de rutas y middlewares. |
| **PostgreSQL** | Base de datos relacional principal. |
| **pg** | Cliente oficial de PostgreSQL para Node.js. |
| **dotenv** | Manejo seguro de variables de entorno. |
| **body-parser** | Procesamiento de datos en formato JSON. |
| **cors** | Habilitación de peticiones externas (CORS). |
| **nodemon** | Reinicio automático durante desarrollo. |

---

## ⚙️ Instalación y Ejecución

Sigue estos pasos para configurar y levantar el servidor localmente:

---

### 1️⃣ Clonar el repositorio

Abre una terminal y ejecuta:

```bash
git clone <url-del-repositorio>
cd server


### 2️⃣ Instalar dependencias

Instala todos los paquetes necesarios definidos en `package.json`:

```bash
npm install

---

## 🗂️ Estructura del Proyecto

```bash
server/
├── config/
│   ├── db.js                     # Configuración y conexión a PostgreSQL
│   └── README.md                 # Documentación del módulo de conexión
│
├── controllers/
│   ├── usuariosController.js     # Controlador principal de EPS, medicamentos e inventario
│   └── README.md                 # Documentación del controlador
│
├── models/
│   ├── usuarioModel.js           # Consultas SQL y operaciones CRUD
│   └── README.md                 # Documentación del modelo
│
├── .env                          # Variables de entorno (no subir al repo)
├── app.js                        # Punto de entrada del servidor
├── package.json                  # Configuración y scripts de npm
├── package-lock.json
└── README.md                     # Este archivo
