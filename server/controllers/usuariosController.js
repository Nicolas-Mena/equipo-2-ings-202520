import * as Inventario from "../models/usuarioModel.js";

// ====================== EPS ======================

export async function obtenerEPS(req, res) {
  try {
    const data = await Inventario.getAllEPS();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener EPS:", error);
    res.status(500).json({ error: "Error al obtener EPS" });
  }
}

export async function crearEPS(req, res) {
  try {
    const nueva = await Inventario.createEPS(req.body);
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

    const eps = await Inventario.loginEPS(email, password);

    if (!eps) {
      console.warn("⚠️ Credenciales incorrectas:", email);
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    res.status(200).json({
      message: "✅ Login exitoso",
      eps,
    });
  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ error: "Error en el login" });
  }
}

// ====================== MEDICAMENTOS ======================

export async function obtenerMedicamentos(req, res) {
  try {
    const data = await Inventario.getAllMedicamentos();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener medicamentos:", error);
    res.status(500).json({ error: "Error al obtener medicamentos" });
  }
}

// ====================== INVENTARIO ======================

export async function obtenerInventarioPorEPS(req, res) {
  try {
    const { eps_id } = req.params;

    if (!eps_id) {
      return res.status(400).json({ error: "El ID de la EPS es requerido" });
    }

    const data = await Inventario.getInventarioPorEPS(eps_id);
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener inventario por EPS:", error);
    res.status(500).json({ error: "Error al obtener inventario por EPS" });
  }
}

export async function buscarMedicamento(req, res) {
  try {
    const { eps_id } = req.params;
    const { nombre } = req.query;

    if (!eps_id || !nombre) {
      return res
        .status(400)
        .json({ error: "Se requiere el ID de la EPS y el nombre del medicamento" });
    }

    const data = await Inventario.buscarMedicamentoEnEPS(eps_id, nombre);
    res.json(data);
  } catch (error) {
    console.error("❌ Error al buscar medicamento:", error);
    res.status(500).json({ error: "Error al buscar medicamento" });
  }
}

export async function actualizarInventario(req, res) {
  try {
    const { eps_id, medicamento_id, cantidad } = req.body;

    if (!eps_id || !medicamento_id || cantidad == null) {
      return res
        .status(400)
        .json({ error: "eps_id, medicamento_id y cantidad son requeridos" });
    }

    const actualizado = await Inventario.actualizarInventario({
      eps_id,
      medicamento_id,
      cantidad,
    });

    if (!actualizado) {
      return res.status(404).json({ error: "No se encontró el registro a actualizar" });
    }

    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al actualizar inventario:", error);
    res.status(500).json({ error: "Error al actualizar inventario" });
  }
}
