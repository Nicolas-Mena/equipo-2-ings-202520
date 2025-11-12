import supabase from './config/db.js';
import bcrypt from 'bcrypt';

async function probarLogin(email, password) {
  try {
    const { data, error } = await supabase.from('eps').select('*').eq('email', email).limit(1);
    if (error) throw error;

    if (!data || data.length === 0) {
      console.log('❌ Usuario no encontrado.');
      return;
    }

    const user = data[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      console.log('✅ Login exitoso!');
      console.log('EPS:', user.nombre);
    } else {
      console.log('❌ Contraseña incorrecta.');
    }
  } catch (err) {
    console.error('Error al probar login:', err.message || err);
  }
}

// 👉 Cambia estos datos por uno de tu tabla:
const email = 'info@nuevaeps.com';
const password = 'nueva123'; // o el que usaste antes de hashear

probarLogin(email, password);
