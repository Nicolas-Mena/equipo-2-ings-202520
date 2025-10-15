import pool from "../config/db.js";

// ======== EPS =========
export async function getAllEPS() {
  const result = await pool.query(`
    SELECT eps_id, nombre, nit, email
    FROM eps
    ORDER BY nombre;
  `);
  return result.rows;
}

export async function createEPS({ nombre, nit, email, password }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Crear la nueva EPS
    const resultEPS = await client.query(
      `
      INSERT INTO eps (nombre, nit, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING eps_id, nombre, nit, email;
      `,
      [nombre, nit, email, password]
    );

    const nuevaEPS = resultEPS.rows[0];

    // 2️⃣ Insertar todos los medicamentos con cantidad 0 en inventario
    await client.query(
      `
      INSERT INTO inventario (eps_id, medicamento_id, cantidad_disponible)
      SELECT $1, m.medicamento_id, 0
      FROM medicamentos m;
      `,
      [nuevaEPS.eps_id]
    );

    await client.query("COMMIT");

    return nuevaEPS;

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}


// Verificar inicio de sesión de una EPS (login)
export async function loginEPS({ email, password }) {
  const result = await pool.query(
    `
    SELECT eps_id, nombre, nit, email, password
    FROM eps
    WHERE email = $1
    `,
    [email]
  );

  // Si no existe ese correo
  if (result.rowCount === 0) return null;

  const eps = result.rows[0];

  // ⚠️ Si aún no estás usando bcrypt, solo compara directo
  if (eps.password !== password) return null;

  // Devuelve los datos (sin el password)
  delete eps.password;
  return eps;
}


// ======== MEDICAMENTOS =========
export async function getAllMedicamentos() {
  const result = await pool.query(`
    SELECT medicamento_id, nombre, descripcion
    FROM medicamentos
    ORDER BY nombre;
  `);
  return result.rows;
}

// ======== INVENTARIO =========
export async function getInventarioPorEPS(eps_id) {
  const result = await pool.query(
    `
    SELECT 
      i.inventario_id,
      e.nombre AS eps,
      m.medicamento_id,
      m.nombre AS medicamento,
      i.cantidad_disponible,
      i.fecha_actualizacion
    FROM inventario i
    JOIN eps e ON i.eps_id = e.eps_id
    JOIN medicamentos m ON i.medicamento_id = m.medicamento_id
    WHERE i.eps_id = $1
    ORDER BY m.nombre;
    `,
    [eps_id]
  );
  return result.rows;
}

export async function buscarMedicamentoEnEPS(eps_id, nombreMedicamento) {
  const result = await pool.query(
    `
    SELECT 
      i.inventario_id,
      e.nombre AS eps,
      m.nombre AS medicamento,
      i.cantidad_disponible,
      i.fecha_actualizacion
    FROM inventario i
    JOIN eps e ON i.eps_id = e.eps_id
    JOIN medicamentos m ON i.medicamento_id = m.medicamento_id
    WHERE i.eps_id = $1
      AND LOWER(m.nombre) LIKE LOWER('%' || $2 || '%')
    ORDER BY m.nombre;
    `,
    [eps_id, nombreMedicamento]
  );
  return result.rows;
}


export async function actualizarInventario({ eps_id, medicamento_id, cantidad }) {
  const result = await pool.query(
    `
    UPDATE inventario
    SET cantidad_disponible = $1,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE eps_id = $2 AND medicamento_id = $3
    RETURNING inventario_id, eps_id, medicamento_id, cantidad_disponible, fecha_actualizacion;
    `,
    [cantidad, eps_id, medicamento_id]
  );
  return result.rows[0];
}
