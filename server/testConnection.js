import pool from "./config/db.js";

async function testConnection() {
  try {

    const result = await pool.query(`
    SELECT i.inventario_id, e.nombre AS eps, m.nombre AS medicamento,
           i.cantidad_disponible, i.fecha_actualizacion
    FROM inventario i
    JOIN eps e ON i.eps_id = e.eps_id
    JOIN medicamentos m ON i.medicamento_id = m.medicamento_id
    ORDER BY e.nombre, m.nombre;
  `);


    console.log("🕒 Conexión exitosa. Fecha del servidor PostgreSQL:");  
    console.table(result.rows)

  } catch (error) {
    console.error("❌ Error al ejecutar la consulta:", error.message);
  } finally {
    pool.end();
  }
}

testConnection();
