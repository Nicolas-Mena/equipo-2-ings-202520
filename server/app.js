import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  obtenerEPS,
  crearEPS,
  obtenerMedicamentos,
  obtenerInventario,
  obtenerInventarioPorEPS,
  actualizarInventario,
} from "./controllers/usuariosController.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ================== RUTAS ==================
app.get("/api/eps", obtenerEPS);
app.post("/api/eps", crearEPS);

app.get("/api/medicamentos", obtenerMedicamentos);

app.get("/api/inventario", obtenerInventario);
app.get("/api/inventario/:eps_id", obtenerInventarioPorEPS);
app.put("/api/inventario", actualizarInventario);

// ================== SERVIDOR ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
