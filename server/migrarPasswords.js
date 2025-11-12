// migrarPasswords.js
import bcrypt from 'bcrypt';
import supabase from './config/db.js';

async function migrarPasswords() {
  try {
    console.log('🔍 Buscando EPS con contraseñas sin hashear...');

    const { data: rows, error: selectError } = await supabase.from('eps').select('eps_id, password');
    if (selectError) throw selectError;

    for (const eps of (rows || [])) {
      const { eps_id, password } = eps;

      // Evitar re-hashear contraseñas que ya estén cifradas
      if (typeof password === 'string' && (password.startsWith('$2a$') || password.startsWith('$2b$') || password.startsWith('$2y$'))) {
        console.log(`✅ EPS ${eps_id} ya tiene contraseña hasheada, se omite.`);
        continue;
      }

      // Hashear la contraseña
      const hash = await bcrypt.hash(password || '', 10);

      // Actualizar en la BD
      const { error: updateError } = await supabase.from('eps').update({ password: hash }).eq('eps_id', eps_id);
      if (updateError) {
        console.error(`❌ Error actualizando EPS ${eps_id}:`, updateError.message || updateError);
      } else {
        console.log(`🔒 EPS ${eps_id}: contraseña hasheada correctamente.`);
      }
    }

    console.log('✅ Migración de contraseñas completada exitosamente.');
  } catch (err) {
    console.error('❌ Error al migrar contraseñas:', err.message || err);
  } finally {
    process.exit();
  }
}

migrarPasswords();
