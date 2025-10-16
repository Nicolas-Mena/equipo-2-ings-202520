// migrarPasswords.js
import bcrypt from "bcrypt";
import pool from "../server/config/db.js"; // ajusta la ruta según tu estructura

async function migrarPasswords() {
  const client = await pool.connect();

  try {
    console.log("🔍 Buscando EPS con contraseñas sin hashear...");

    const { rows } = await client.query("SELECT eps_id, password FROM eps");

    for (const eps of rows) {
      const { eps_id, password } = eps;

      // Evitar re-hashear contraseñas que ya estén cifradas
      if (password.startsWith("$2a$") || password.startsWith("$2b$") || password.startsWith("$2y$")) {
        console.log(`✅ EPS ${eps_id} ya tiene contraseña hasheada, se omite.`);
        continue;
      }

      // Hashear la contraseña
      const hash = await bcrypt.hash(password, 10);

      // Actualizar en la BD
      await client.query("UPDATE eps SET password = $1 WHERE eps_id = $2", [hash, eps_id]);
      console.log(`🔒 EPS ${eps_id}: contraseña hasheada correctamente.`);
    }

    console.log("✅ Migración de contraseñas completada exitosamente.");
  } catch (err) {
    console.error("❌ Error al migrar contraseñas:", err);
  } finally {
    client.release();
    process.exit();
  }
}

migrarPasswords();
