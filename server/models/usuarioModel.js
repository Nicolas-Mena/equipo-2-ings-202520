import pool from "../config/db.js";

// ======== EPS =========
export async function getAllEPS() {
  const result = await pool.query("SELECT * FROM eps ORDER BY eps_id");
  return result.rows;
}

export async function createEPS({ nombre, nit, email, password }) {
  const result = await pool.query(
    `INSERT INTO eps (nombre, nit, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombre, nit, email, password]
  );
  return result.rows[0];
}

// ======== MEDICAMENTOS =========
export async function getAllMedicamentos() {
  const result = await pool.query(
    "SELECT medicamento_id, nombre, descripcion FROM medicamentos ORDER BY medicamento_id"
  );
  return result.rows;
}

// ======== INVENTARIO =========
export async function getInventarioCompleto() {
  const result = await pool.query(`
    SELECT i.inventario_id, e.nombre AS eps, m.nombre AS medicamento,
           i.cantidad_disponible, i.fecha_actualizacion
    FROM inventario i
    JOIN eps e ON i.eps_id = e.eps_id
    JOIN medicamentos m ON i.medicamento_id = m.medicamento_id
    ORDER BY e.nombre, m.nombre;
  `);
  return result.rows;
}

export async function getInventarioPorEPS(eps_id) {
  const result = await pool.query(`
    SELECT i.inventario_id, e.nombre AS eps, m.nombre AS medicamento,
           i.cantidad_disponible, i.fecha_actualizacion
    FROM inventario i
    JOIN eps e ON i.eps_id = e.eps_id
    JOIN medicamentos m ON i.medicamento_id = m.medicamento_id
    ORDER BY m.nombre;
  `, [eps_id]);
  return result.rows;
}

export async function actualizarInventario({ eps_id, medicamento_id, cantidad }) {
  const result = await pool.query(`
    UPDATE inventario
    SET cantidad_disponible = $1, fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE eps_id = $2 AND medicamento_id = $3
    RETURNING *;
  `, [cantidad, eps_id, medicamento_id]);
  return result.rows[0];
}
