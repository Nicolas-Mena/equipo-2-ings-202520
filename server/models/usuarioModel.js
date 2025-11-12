import supabase from "../config/db.js";
import bcrypt from "bcrypt";

// ============================================================================
// EPS
// ============================================================================

export async function getAllEPS() {
  const { data, error } = await supabase
    .from('eps')
    .select('eps_id, nombre, nit, email')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getEPSById(eps_id) {
  const { data, error } = await supabase
    .from('eps')
    .select('eps_id, nombre, nit, email')
    .eq('eps_id', eps_id)
    .limit(1);

  if (error) throw error;
  return (data && data[0]) || null;
}

export async function createEPS({ nombre, nit, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('eps')
    .insert([{ nombre, nit, email, password: hashedPassword }])
    .select('eps_id, nombre, nit, email')
    .limit(1);

  if (error) throw error;
  return (data && data[0]) || null;
}

export async function loginEPS(email, password) {
  const { data, error } = await supabase
    .from('eps')
    .select('*')
    .eq('email', email)
    .limit(1);

  if (error) throw error;

  if (!data || data.length === 0) {
    console.log('❌ Usuario no encontrado:', email);
    return null;
  }

  const eps = data[0];
  const match = await bcrypt.compare(password, eps.password);

  if (!match) {
    console.log('❌ Contraseña incorrecta para:', email);
    return null;
  }

  // Remove password before returning
  const { password: _pw, ...publicEps } = eps;
  console.log('✅ Login exitoso para:', publicEps.nombre);
  return publicEps;
}

// ============================================================================
// MEDICAMENTOS (Catálogo General)
// ============================================================================

export async function getAllMedicamentos() {
  const { data, error } = await supabase
    .from('medicamentos')
    .select('medicamento_id, nombre')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createMedicamento({ nombre }) {
  const { data, error } = await supabase
    .from('medicamentos')
    .insert([{ nombre }])
    .select('medicamento_id, nombre')
    .limit(1);

  if (error) throw error;
  return (data && data[0]) || null;
}

// ============================================================================
// MEDICAMENTOS_EPS (Inventario por EPS)
// ============================================================================

/**
 * Obtener todos los medicamentos de una EPS específica
 */
export async function getMedicamentosPorEPS(eps_id) {
  // Use Supabase RPC or joins via select foreign tables
  const { data, error } = await supabase
    .from('medicamentos_eps')
    .select(`medicamento_eps_id, eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible, fecha_actualizacion, medicamentos(nombre), eps(nombre)`)
    .eq('eps_id', eps_id)
    .order('medicamentos.nombre', { ascending: true });

  if (error) throw error;

  // Normalize the response to match previous shape (medicamento field and eps name)
  return (
    (data || []).map((row) => ({
      medicamento_eps_id: row.medicamento_eps_id,
      eps_id: row.eps_id,
      medicamento_id: row.medicamento_id,
      medicamento: row.medicamentos ? row.medicamentos.nombre : null,
      descripcion: row.descripcion,
      imagen_url: row.imagen_url,
      cantidad_disponible: row.cantidad_disponible,
      fecha_actualizacion: row.fecha_actualizacion,
      eps: row.eps ? row.eps.nombre : null,
    })) || []
  );
}

/**
 * Buscar medicamentos dentro del inventario de una EPS
 */
export async function buscarMedicamentoEnEPS(eps_id, nombreMedicamento) {
  const { data, error } = await supabase
    .from('medicamentos_eps')
    .select(`medicamento_eps_id, eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible, fecha_actualizacion, medicamentos(nombre), eps(nombre)`)
    .eq('eps_id', eps_id)
    .ilike('medicamentos.nombre', `%${nombreMedicamento}%`)
    .order('medicamentos.nombre', { ascending: true });

  if (error) throw error;

  return (
    (data || []).map((row) => ({
      medicamento_eps_id: row.medicamento_eps_id,
      eps_id: row.eps_id,
      medicamento_id: row.medicamento_id,
      medicamento: row.medicamentos ? row.medicamentos.nombre : null,
      descripcion: row.descripcion,
      imagen_url: row.imagen_url,
      cantidad_disponible: row.cantidad_disponible,
      fecha_actualizacion: row.fecha_actualizacion,
      eps: row.eps ? row.eps.nombre : null,
    })) || []
  );
}

/**
 * Agregar un medicamento al inventario de una EPS
 */
export async function agregarMedicamentoAEPS({ eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible }) {
  const { data, error } = await supabase
    .from('medicamentos_eps')
    .insert([{ eps_id, medicamento_id, descripcion: descripcion || null, imagen_url: imagen_url || null, cantidad_disponible: cantidad_disponible || 0 }])
    .select('medicamento_eps_id, eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible, fecha_actualizacion')
    .limit(1);

  if (error) throw error;
  return (data && data[0]) || null;
}

/**
 * Actualizar cantidad, descripción e imagen de un medicamento en una EPS
 */
export async function actualizarMedicamentoEPS({ eps_id, medicamento_id, cantidad, descripcion, imagen_url }) {
  const updates = { fecha_actualizacion: new Date().toISOString() };
  if (cantidad !== undefined) updates.cantidad_disponible = cantidad;
  if (descripcion !== undefined) updates.descripcion = descripcion;
  if (imagen_url !== undefined) updates.imagen_url = imagen_url;

  const { data, error } = await supabase
    .from('medicamentos_eps')
    .update(updates)
    .eq('eps_id', eps_id)
    .eq('medicamento_id', medicamento_id)
    .select('medicamento_eps_id, eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible, fecha_actualizacion')
    .limit(1);

  if (error) throw error;
  return (data && data[0]) || null;
}

/**
 * Eliminar un medicamento del inventario de una EPS
 * (NO elimina el medicamento del catálogo general)
 */
export async function eliminarMedicamentoDeEPS(eps_id, medicamento_id) {
  const { data, error } = await supabase
    .from('medicamentos_eps')
    .delete()
    .eq('eps_id', eps_id)
    .eq('medicamento_id', medicamento_id)
    .select('medicamento_eps_id')
    .limit(1);

  if (error) throw error;
  return (data && data[0]) || null;
}

// ============================================================================
// ESTADÍSTICAS
// ============================================================================

export async function getEstadisticas() {
  const [{ count: totalEPS }, { sum: totalMedicamentos }, { avg: promedio }] = await Promise.all([
    (async () => {
      const { count, error } = await supabase.from('eps').select('*', { count: 'exact', head: true });
      if (error) throw error;
      return { count };
    })(),
    (async () => {
      const { data, error } = await supabase.from('medicamentos_eps').select('cantidad_disponible');
      if (error) throw error;
      const total = (data || []).reduce((s, r) => s + (r.cantidad_disponible || 0), 0);
      return { sum: total };
    })(),
    (async () => {
      const { data, error } = await supabase.from('medicamentos_eps').select('cantidad_disponible');
      if (error) throw error;
      const arr = (data || []).map(r => r.cantidad_disponible || 0);
      const avg = arr.length ? arr.reduce((a,b) => a + b, 0) / arr.length : 0;
      return { avg };
    })(),
  ]);

  return {
    totalEPS: parseInt(totalEPS) || 0,
    totalMedicamentos: parseInt(totalMedicamentos) || 0,
    disponibilidadPromedio: Math.round(parseFloat(promedio) || 0)
  };
}

/**
 * Crear medicamento en catálogo general Y agregarlo a una EPS específica
 */
export async function crearYAgregarMedicamento({ eps_id, nombre, descripcion, imagen_url, cantidad_disponible }) {
  // Supabase doesn't support multi-statement transactions across inserts in a single call easily without using RLS/Functions.
  // We'll create the medicamento then add the medicamentos_eps referencing its id.
  const { data: medData, error: medError } = await supabase
    .from('medicamentos')
    .insert([{ nombre }])
    .select('medicamento_id, nombre')
    .limit(1);

  if (medError) throw medError;
  const nuevoMedicamento = (medData && medData[0]) || null;

  const { data: meData, error: meError } = await supabase
    .from('medicamentos_eps')
    .insert([{
      eps_id,
      medicamento_id: nuevoMedicamento.medicamento_id,
      descripcion: descripcion || null,
      imagen_url: imagen_url || null,
      cantidad_disponible: cantidad_disponible || 0
    }])
    .select('medicamento_eps_id, eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible, fecha_actualizacion')
    .limit(1);

  if (meError) throw meError;

  return {
    medicamento: nuevoMedicamento,
    medicamento_eps: (meData && meData[0]) || null
  };
}