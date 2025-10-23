import * as Model from "../models/usuarioModel.js";

// ============================================================================
// EPS
// ============================================================================

export async function obtenerEPS(req, res) {
  try {
    const data = await Model.getAllEPS();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener EPS:", error);
    res.status(500).json({ error: "Error al obtener EPS" });
  }
}

export async function obtenerEPSPorId(req, res) {
  try {
    const { eps_id } = req.params;
    if (!eps_id) return res.status(400).json({ error: "El ID de la EPS es requerido" });

    const eps = await Model.getEPSById(eps_id);
    if (!eps) return res.status(404).json({ error: "EPS no encontrada" });

    res.json(eps);
  } catch (error) {
    console.error("❌ Error al obtener EPS por ID:", error);
    res.status(500).json({ error: "Error al obtener EPS" });
  }
}

export async function crearEPS(req, res) {
  try {
    const nueva = await Model.createEPS(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    console.error("❌ Error al crear EPS:", error);
    res.status(500).json({ error: "Error al crear EPS" });
  }
}

export async function loginEPS(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const eps = await Model.loginEPS(email, password);
    if (!eps) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    res.status(200).json({ message: "✅ Login exitoso", eps });
  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ error: "Error en el login" });
  }
}

// ============================================================================
// MEDICAMENTOS (Catálogo General)
// ============================================================================

export async function obtenerMedicamentos(req, res) {
  try {
    const data = await Model.getAllMedicamentos();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener medicamentos:", error);
    res.status(500).json({ error: "Error al obtener medicamentos" });
  }
}

export async function crearMedicamento(req, res) {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

    const nuevo = await Model.createMedicamento({ nombre });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('❌ Error al crear medicamento:', error);
    res.status(500).json({ error: 'Error al crear medicamento' });
  }
}

// ============================================================================
// MEDICAMENTOS_EPS (Inventario por EPS)
// ============================================================================

/**
 * GET /api/eps/:eps_id/medicamentos
 * Obtener inventario completo de una EPS
 */
export async function obtenerMedicamentosDeEPS(req, res) {
  try {
    const { eps_id } = req.params;
    if (!eps_id) return res.status(400).json({ error: "El ID de la EPS es requerido" });

    const data = await Model.getMedicamentosPorEPS(eps_id);
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener medicamentos de EPS:", error);
    res.status(500).json({ error: "Error al obtener medicamentos de EPS" });
  }
}

/**
 * GET /api/eps/:eps_id/medicamentos/search?nombre=XXX
 * Buscar medicamentos en inventario de una EPS
 */
export async function buscarMedicamentoEnEPS(req, res) {
  try {
    const { eps_id } = req.params;
    const { nombre } = req.query;

    if (!eps_id || !nombre) {
      return res.status(400).json({ error: "Se requiere el ID de la EPS y el nombre del medicamento" });
    }

    const data = await Model.buscarMedicamentoEnEPS(eps_id, nombre);
    res.json(data);
  } catch (error) {
    console.error("❌ Error al buscar medicamento:", error);
    res.status(500).json({ error: "Error al buscar medicamento" });
  }
}

/**
 * POST /api/eps/:eps_id/medicamentos
 * Agregar un medicamento existente al inventario de una EPS
 */
export async function agregarMedicamentoAEPS(req, res) {
  try {
    const { eps_id } = req.params;
    const { medicamento_id, descripcion, imagen_url, cantidad_disponible } = req.body;

    if (!eps_id || !medicamento_id) {
      return res.status(400).json({ error: "eps_id y medicamento_id son requeridos" });
    }

    const resultado = await Model.agregarMedicamentoAEPS({
      eps_id,
      medicamento_id,
      descripcion,
      imagen_url,
      cantidad_disponible
    });

    res.status(201).json(resultado);
  } catch (error) {
    // Error de duplicado (constraint unique_eps_medicamento)
    if (error.code === '23505') {
      return res.status(409).json({ error: "Este medicamento ya existe en el inventario de esta EPS" });
    }

    console.error("❌ Error al agregar medicamento a EPS:", error);
    res.status(500).json({ error: "Error al agregar medicamento a EPS" });
  }
}

/**
 * PUT /api/eps/:eps_id/medicamentos/:medicamento_id
 * Actualizar cantidad, descripción e imagen de un medicamento en una EPS
 */
export async function actualizarMedicamentoEPS(req, res) {
  try {
    const { eps_id, medicamento_id } = req.params;
    const { cantidad, descripcion, imagen_url } = req.body;

    if (!eps_id || !medicamento_id) {
      return res.status(400).json({ error: "eps_id y medicamento_id son requeridos" });
    }

    const actualizado = await Model.actualizarMedicamentoEPS({
      eps_id,
      medicamento_id,
      cantidad,
      descripcion,
      imagen_url
    });

    if (!actualizado) {
      return res.status(404).json({ error: "Medicamento no encontrado en el inventario de esta EPS" });
    }

    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al actualizar medicamento de EPS:", error);
    res.status(500).json({ error: "Error al actualizar medicamento de EPS" });
  }
}

/**
 * DELETE /api/eps/:eps_id/medicamentos/:medicamento_id
 * Eliminar un medicamento del inventario de una EPS
 */
export async function eliminarMedicamentoDeEPS(req, res) {
  try {
    const { eps_id, medicamento_id } = req.params;

    if (!eps_id || !medicamento_id) {
      return res.status(400).json({ error: "eps_id y medicamento_id son requeridos" });
    }

    const eliminado = await Model.eliminarMedicamentoDeEPS(eps_id, medicamento_id);

    if (!eliminado) {
      return res.status(404).json({ error: "Medicamento no encontrado en el inventario de esta EPS" });
    }

    res.json({ message: "Medicamento eliminado del inventario exitosamente", medicamento_eps_id: eliminado.medicamento_eps_id });
  } catch (error) {
    console.error("❌ Error al eliminar medicamento de EPS:", error);
    res.status(500).json({ error: "Error al eliminar medicamento de EPS" });
  }
}

/**
 * POST /api/eps/:eps_id/medicamentos/nuevo
 * Crear medicamento nuevo Y agregarlo al inventario de la EPS
 */
export async function crearYAgregarMedicamento(req, res) {
  try {
    const { eps_id } = req.params;
    const { nombre, descripcion, imagen_url, cantidad_disponible } = req.body;

    if (!eps_id || !nombre) {
      return res.status(400).json({ error: "eps_id y nombre son requeridos" });
    }

    const resultado = await Model.crearYAgregarMedicamento({
      eps_id,
      nombre,
      descripcion,
      imagen_url,
      cantidad_disponible
    });

    res.status(201).json(resultado);
  } catch (error) {
    console.error("❌ Error al crear y agregar medicamento:", error);
    res.status(500).json({ error: "Error al crear y agregar medicamento" });
  }
}

// ============================================================================
// ESTADÍSTICAS
// ============================================================================

export async function obtenerEstadisticas(req, res) {
  try {
    const stats = await Model.getEstadisticas();
    res.json(stats);
  } catch (error) {
    console.error("❌ Error al obtener estadísticas:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
}