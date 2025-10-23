import pool from "../config/db.js";
import bcrypt from "bcrypt";

// ============================================================================
// EPS
// ============================================================================

export async function getAllEPS() {
  const result = await pool.query(`
    SELECT eps_id, nombre, nit, email
    FROM eps
    ORDER BY nombre;
  `);
  return result.rows;
}

export async function getEPSById(eps_id) {
  const result = await pool.query(
    `SELECT eps_id, nombre, nit, email FROM eps WHERE eps_id = $1;`,
    [eps_id]
  );
  return result.rows[0] || null;
}

export async function createEPS({ nombre, nit, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await pool.query(
    `INSERT INTO eps (nombre, nit, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING eps_id, nombre, nit, email;`,
    [nombre, nit, email, hashedPassword]
  );
  
  return result.rows[0];
}

export async function loginEPS(email, password) {
  const result = await pool.query("SELECT * FROM eps WHERE email = $1", [email]);

  if (result.rows.length === 0) {
    console.log("❌ Usuario no encontrado:", email);
    return null;
  }

  const eps = result.rows[0];
  const match = await bcrypt.compare(password, eps.password);

  if (!match) {
    console.log("❌ Contraseña incorrecta para:", email);
    return null;
  }

  delete eps.password;
  console.log("✅ Login exitoso para:", eps.nombre);
  return eps;
}

// ============================================================================
// MEDICAMENTOS (Catálogo General)
// ============================================================================

export async function getAllMedicamentos() {
  const result = await pool.query(`
    SELECT medicamento_id, nombre
    FROM medicamentos
    ORDER BY nombre;
  `);
  return result.rows;
}

export async function createMedicamento({ nombre }) {
  const result = await pool.query(
    `INSERT INTO medicamentos (nombre)
     VALUES ($1)
     RETURNING medicamento_id, nombre;`,
    [nombre]
  );
  return result.rows[0];
}

// ============================================================================
// MEDICAMENTOS_EPS (Inventario por EPS)
// ============================================================================

/**
 * Obtener todos los medicamentos de una EPS específica
 */
export async function getMedicamentosPorEPS(eps_id) {
  const result = await pool.query(
    `SELECT 
      me.medicamento_eps_id,
      me.eps_id,
      me.medicamento_id,
      m.nombre AS medicamento,
      me.descripcion,
      me.imagen_url,
      me.cantidad_disponible,
      me.fecha_actualizacion,
      e.nombre AS eps
    FROM medicamentos_eps me
    JOIN medicamentos m ON me.medicamento_id = m.medicamento_id
    JOIN eps e ON me.eps_id = e.eps_id
    WHERE me.eps_id = $1
    ORDER BY m.nombre;`,
    [eps_id]
  );
  return result.rows;
}

/**
 * Buscar medicamentos dentro del inventario de una EPS
 */
export async function buscarMedicamentoEnEPS(eps_id, nombreMedicamento) {
  const result = await pool.query(
    `SELECT 
      me.medicamento_eps_id,
      me.eps_id,
      me.medicamento_id,
      m.nombre AS medicamento,
      me.descripcion,
      me.imagen_url,
      me.cantidad_disponible,
      me.fecha_actualizacion,
      e.nombre AS eps
    FROM medicamentos_eps me
    JOIN medicamentos m ON me.medicamento_id = m.medicamento_id
    JOIN eps e ON me.eps_id = e.eps_id
    WHERE me.eps_id = $1
      AND LOWER(m.nombre) LIKE LOWER('%' || $2 || '%')
    ORDER BY m.nombre;`,
    [eps_id, nombreMedicamento]
  );
  return result.rows;
}

/**
 * Agregar un medicamento al inventario de una EPS
 */
export async function agregarMedicamentoAEPS({ eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible }) {
  const result = await pool.query(
    `INSERT INTO medicamentos_eps (eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING medicamento_eps_id, eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible, fecha_actualizacion;`,
    [eps_id, medicamento_id, descripcion || null, imagen_url || null, cantidad_disponible || 0]
  );
  return result.rows[0];
}

/**
 * Actualizar cantidad, descripción e imagen de un medicamento en una EPS
 */
export async function actualizarMedicamentoEPS({ eps_id, medicamento_id, cantidad, descripcion, imagen_url }) {
  const campos = ['fecha_actualizacion = CURRENT_TIMESTAMP'];
  const valores = [eps_id, medicamento_id];
  let paramIndex = 3;

  if (cantidad !== undefined) {
    campos.push(`cantidad_disponible = $${paramIndex}`);
    valores.push(cantidad);
    paramIndex++;
  }

  if (descripcion !== undefined) {
    campos.push(`descripcion = $${paramIndex}`);
    valores.push(descripcion);
    paramIndex++;
  }

  if (imagen_url !== undefined) {
    campos.push(`imagen_url = $${paramIndex}`);
    valores.push(imagen_url);
    paramIndex++;
  }

  const result = await pool.query(
    `UPDATE medicamentos_eps
     SET ${campos.join(', ')}
     WHERE eps_id = $1 AND medicamento_id = $2
     RETURNING medicamento_eps_id, eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible, fecha_actualizacion;`,
    valores
  );

  return result.rows[0];
}

/**
 * Eliminar un medicamento del inventario de una EPS
 * (NO elimina el medicamento del catálogo general)
 */
export async function eliminarMedicamentoDeEPS(eps_id, medicamento_id) {
  const result = await pool.query(
    `DELETE FROM medicamentos_eps
     WHERE eps_id = $1 AND medicamento_id = $2
     RETURNING medicamento_eps_id;`,
    [eps_id, medicamento_id]
  );
  return result.rows[0];
}

// ============================================================================
// ESTADÍSTICAS
// ============================================================================

export async function getEstadisticas() {
  const totalEPSResult = await pool.query(`SELECT COUNT(*) as total FROM eps;`);
  const totalMedicamentosResult = await pool.query(`SELECT SUM(cantidad_disponible) as total FROM medicamentos_eps;`);
  const promedioResult = await pool.query(`SELECT AVG(cantidad_disponible) as promedio FROM medicamentos_eps;`);

  const totalEPS = parseInt(totalEPSResult.rows[0].total) || 0;
  const totalMedicamentos = parseInt(totalMedicamentosResult.rows[0].total) || 0;
  const promedioDisponibilidad = parseFloat(promedioResult.rows[0].promedio) || 0;

  return {
    totalEPS,
    totalMedicamentos,
    disponibilidadPromedio: Math.round(promedioDisponibilidad)
  };
}

/**
 * Crear medicamento en catálogo general Y agregarlo a una EPS específica
 */
export async function crearYAgregarMedicamento({ eps_id, nombre, descripcion, imagen_url, cantidad_disponible }) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // 1. Crear medicamento en catálogo general
    const medResult = await client.query(
      `INSERT INTO medicamentos (nombre)
       VALUES ($1)
       RETURNING medicamento_id, nombre;`,
      [nombre]
    );

    const nuevoMedicamento = medResult.rows[0];

    // 2. Agregar a la EPS específica
    const meResult = await client.query(
      `INSERT INTO medicamentos_eps (eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING medicamento_eps_id, eps_id, medicamento_id, descripcion, imagen_url, cantidad_disponible, fecha_actualizacion;`,
      [eps_id, nuevoMedicamento.medicamento_id, descripcion || null, imagen_url || null, cantidad_disponible || 0]
    );

    await client.query('COMMIT');

    return {
      medicamento: nuevoMedicamento,
      medicamento_eps: meResult.rows[0]
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}