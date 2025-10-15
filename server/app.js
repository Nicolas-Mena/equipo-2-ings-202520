import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  obtenerEPS,
  crearEPS,
  obtenerMedicamentos,
  obtenerInventarioPorEPS,
  actualizarInventario,
  loginEPS, 
} from "./controllers/usuariosController.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ================== RUTAS ==================

// ---- EPS ----
app.get("/api/eps", obtenerEPS);
app.post("/api/eps", crearEPS);
app.post("/api/eps/login", loginEPS);

// ---- MEDICAMENTOS ----
app.get("/api/medicamentos", obtenerMedicamentos);

// ---- INVENTARIO ----
app.get("/api/inventario/:eps_id", obtenerInventarioPorEPS);
app.put("/api/inventario", actualizarInventario);

// ================== SERVIDOR ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo en puerto ${PORT}"));