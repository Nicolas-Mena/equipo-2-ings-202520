import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  // EPS
  obtenerEPS,
  obtenerEPSPorId,
  crearEPS,
  loginEPS,
  
  // Medicamentos (catálogo general)
  obtenerMedicamentos,
  crearMedicamento,
  
  // Medicamentos por EPS (inventario)
  obtenerMedicamentosDeEPS,
  buscarMedicamentoEnEPS,
  agregarMedicamentoAEPS,
  actualizarMedicamentoEPS,
  eliminarMedicamentoDeEPS,
  crearYAgregarMedicamento,
  
  // Estadísticas
  obtenerEstadisticas,
} from "./controllers/usuariosController.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ============================================================================
// RUTAS - EPS
// ============================================================================

app.get("/api/eps", obtenerEPS);
app.get("/api/eps/:eps_id", obtenerEPSPorId);
app.post("/api/eps", crearEPS);
app.post("/api/eps/login", loginEPS);

// ============================================================================
// RUTAS - MEDICAMENTOS (Catálogo General)
// ============================================================================

app.get("/api/medicamentos", obtenerMedicamentos);
app.post("/api/medicamentos", crearMedicamento);

// ============================================================================
// RUTAS - INVENTARIO POR EPS (medicamentos_eps)
// ============================================================================

// Obtener inventario completo de una EPS
app.get("/api/eps/:eps_id/medicamentos", obtenerMedicamentosDeEPS);

// Buscar medicamentos en el inventario de una EPS
app.get("/api/eps/:eps_id/medicamentos/search", buscarMedicamentoEnEPS);

// Crear medicamento nuevo Y agregarlo a la EPS
app.post("/api/eps/:eps_id/medicamentos/nuevo", crearYAgregarMedicamento);

// Agregar medicamento existente a la EPS
app.post("/api/eps/:eps_id/medicamentos", agregarMedicamentoAEPS);

// Actualizar medicamento en la EPS (cantidad, descripción, imagen)
app.put("/api/eps/:eps_id/medicamentos/:medicamento_id", actualizarMedicamentoEPS);

// Eliminar medicamento del inventario de la EPS
app.delete("/api/eps/:eps_id/medicamentos/:medicamento_id", eliminarMedicamentoDeEPS);

// ============================================================================
// RUTAS - ESTADÍSTICAS
// ============================================================================

app.get("/api/stats", obtenerEstadisticas);

// ============================================================================
// RUTAS LEGACY (compatibilidad con frontend antiguo - DEPRECADAS)
// ============================================================================

// Estas rutas redirigen a las nuevas para mantener compatibilidad temporal
app.get("/api/inventario/:eps_id", obtenerMedicamentosDeEPS);
app.get("/api/inventario/:eps_id/search", buscarMedicamentoEnEPS);

// ============================================================================
// SERVIDOR
// ============================================================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📊 Endpoints disponibles:`);
  console.log(`   GET    /api/eps`);
  console.log(`   GET    /api/eps/:eps_id`);
  console.log(`   POST   /api/eps/login`);
  console.log(`   GET    /api/eps/:eps_id/medicamentos`);
  console.log(`   POST   /api/eps/:eps_id/medicamentos/nuevo`);
  console.log(`   PUT    /api/eps/:eps_id/medicamentos/:medicamento_id`);
  console.log(`   DELETE /api/eps/:eps_id/medicamentos/:medicamento_id`);
  console.log(`   GET    /api/stats`);
});