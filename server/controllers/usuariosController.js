import * as Inventario from "../models/usuarioModel.js";

export async function obtenerEPS(req, res) {
  try {
    const data = await Inventario.getAllEPS();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener EPS" });
  }
}

export async function crearEPS(req, res) {
  try {
    const nueva = await Inventario.createEPS(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear EPS" });
  }
}

export async function obtenerMedicamentos(req, res) {
  try {
    const data = await Inventario.getAllMedicamentos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener medicamentos" });
  }
}

export async function obtenerInventario(req, res) {
  try {
    const data = await Inventario.getInventarioCompleto();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inventario" });
  }
}

export async function obtenerInventarioPorEPS(req, res) {
  try {
    const { eps_id } = req.params;
    const data = await Inventario.getInventarioPorEPS(eps_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inventario por EPS" });
  }
}

export async function actualizarInventario(req, res) {
  try {
    const actualizado = await Inventario.actualizarInventario(req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar inventario" });
  }
}
