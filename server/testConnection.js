import supabase from './config/db.js';

async function testConnection() {
  try {
    // Use Supabase select with related tables (assumes foreign keys and relationships are configured)
    const { data, error } = await supabase
      .from('inventario')
      .select(`inventario_id, cantidad_disponible, fecha_actualizacion, eps(nombre), medicamentos(nombre)`) 
      .order('eps.nombre', { ascending: true });

    if (error) throw error;

    console.log('🕒 Conexión exitosa a Supabase. Inventario:');
    console.table(
      (data || []).map(row => ({
        inventario_id: row.inventario_id,
        eps: row.eps ? row.eps.nombre : null,
        medicamento: row.medicamentos ? row.medicamentos.nombre : null,
        cantidad_disponible: row.cantidad_disponible,
        fecha_actualizacion: row.fecha_actualizacion,
      }))
    );
  } catch (error) {
    console.error('❌ Error al ejecutar la consulta:', error.message || error);
  }
}

testConnection();
