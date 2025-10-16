import pool from "../server/config/db.js";
import bcrypt from "bcrypt";

async function probarLogin(email, password) {
  try {
    const result = await pool.query("SELECT * FROM eps WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      console.log("❌ Usuario no encontrado.");
      return;
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      console.log("✅ Login exitoso!");
      console.log("EPS:", user.nombre);
    } else {
      console.log("❌ Contraseña incorrecta.");
    }
  } catch (err) {
    console.error("Error al probar login:", err);
  } finally {
    await pool.end();
  }
}

// 👉 Cambia estos datos por uno de tu tabla:
const email = "info@nuevaeps.com";
const password = "nueva123"; // o el que usaste antes de hashear

probarLogin(email, password);
