// ============================================================================
// MOCK DATA - Estructura basada en el esquema de PostgreSQL
// ============================================================================
// Este archivo simula los datos que vendrán del backend
// Estructura de tablas: eps, medicamentos, inventario

const mockData = {
  // =========================================================================
  // TABLA: eps
  // =========================================================================
  // Representa las EPS registradas en el sistema
  eps: [
    {
      eps_id: 1,
      nombre: 'Sura EPS',
      nit: '890123456-7',
      email: 'admin@suraeps.com',
      password: 'hashed_password_1' // En producción esto estará hasheado
    },
    {
      eps_id: 2,
      nombre: 'Sanitas EPS',
      nit: '890234567-8',
      email: 'admin@sanitaseps.com',
      password: 'hashed_password_2'
    },
    {
      eps_id: 3,
      nombre: 'Coomeva EPS',
      nit: '890345678-9',
      email: 'admin@coomevaeps.com',
      password: 'hashed_password_3'
    }
  ],

  // =========================================================================
  // TABLA: medicamentos
  // =========================================================================
  // Catálogo de medicamentos disponibles en el sistema
  medicamentos: [
    {
      medicamento_id: 1,
      nombre: 'Acetaminofén 500mg',
      descripcion: 'Analgésico y antipirético para el alivio del dolor y la fiebre'
    },
    {
      medicamento_id: 2,
      nombre: 'Ibuprofeno 400mg',
      descripcion: 'Antiinflamatorio no esteroideo (AINE) para dolor e inflamación'
    },
    {
      medicamento_id: 3,
      nombre: 'Amoxicilina 250mg',
      descripcion: 'Antibiótico de amplio espectro para infecciones bacterianas'
    },
    {
      medicamento_id: 4,
      nombre: 'Omeprazol 20mg',
      descripcion: 'Inhibidor de la bomba de protones para problemas gastrointestinales'
    },
    {
      medicamento_id: 5,
      nombre: 'Losartán 50mg',
      descripcion: 'Antihipertensivo para el tratamiento de la presión arterial alta'
    },
    {
      medicamento_id: 6,
      nombre: 'Metformina 850mg',
      descripcion: 'Antidiabético oral para el control de la diabetes tipo 2'
    },
    {
      medicamento_id: 7,
      nombre: 'Atorvastatina 20mg',
      descripcion: 'Estatina para reducir el colesterol y prevenir enfermedades cardiovasculares'
    },
    {
      medicamento_id: 8,
      nombre: 'Salbutamol Inhalador',
      descripcion: 'Broncodilatador para el tratamiento del asma y EPOC'
    },
    {
      medicamento_id: 9,
      nombre: 'Loratadina 10mg',
      descripcion: 'Antihistamínico para alergias y rinitis alérgica'
    },
    {
      medicamento_id: 10,
      nombre: 'Diclofenaco 50mg',
      descripcion: 'Antiinflamatorio para dolor muscular y articular'
    }
  ],

  // =========================================================================
  // TABLA: inventario
  // =========================================================================
  // Relaciona EPS con medicamentos y sus cantidades disponibles
  inventario: [
    // Sura EPS (eps_id: 1)
    { inventario_id: 1, eps_id: 1, medicamento_id: 1, cantidad_disponible: 150, fecha_actualizacion: '2025-10-15 10:30:00' },
    { inventario_id: 2, eps_id: 1, medicamento_id: 2, cantidad_disponible: 89, fecha_actualizacion: '2025-10-15 09:15:00' },
    { inventario_id: 3, eps_id: 1, medicamento_id: 3, cantidad_disponible: 45, fecha_actualizacion: '2025-10-14 16:20:00' },
    { inventario_id: 4, eps_id: 1, medicamento_id: 4, cantidad_disponible: 67, fecha_actualizacion: '2025-10-15 08:45:00' },
    
    // Sanitas EPS (eps_id: 2)
    { inventario_id: 5, eps_id: 2, medicamento_id: 1, cantidad_disponible: 200, fecha_actualizacion: '2025-10-15 11:00:00' },
    { inventario_id: 6, eps_id: 2, medicamento_id: 5, cantidad_disponible: 156, fecha_actualizacion: '2025-10-15 10:10:00' },
    { inventario_id: 7, eps_id: 2, medicamento_id: 6, cantidad_disponible: 78, fecha_actualizacion: '2025-10-14 14:30:00' },
    { inventario_id: 8, eps_id: 2, medicamento_id: 7, cantidad_disponible: 120, fecha_actualizacion: '2025-10-15 09:50:00' },
    
    // Coomeva EPS (eps_id: 3)
    { inventario_id: 9, eps_id: 3, medicamento_id: 2, cantidad_disponible: 95, fecha_actualizacion: '2025-10-15 10:20:00' },
    { inventario_id: 10, eps_id: 3, medicamento_id: 8, cantidad_disponible: 34, fecha_actualizacion: '2025-10-14 15:40:00' },
    { inventario_id: 11, eps_id: 3, medicamento_id: 9, cantidad_disponible: 110, fecha_actualizacion: '2025-10-15 08:30:00' },
    { inventario_id: 12, eps_id: 3, medicamento_id: 10, cantidad_disponible: 73, fecha_actualizacion: '2025-10-15 11:15:00' }
  ],

  // =========================================================================
  // FUNCIONES AUXILIARES - Para facilitar el acceso a los datos
  // =========================================================================
  
  // Obtener todas las EPS (simula: SELECT * FROM eps)
  getEPS: function() {
    return this.eps;
  },

  // Obtener una EPS por ID (simula: SELECT * FROM eps WHERE eps_id = ?)
  getEPSById: function(eps_id) {
    return this.eps.find(e => e.eps_id === eps_id);
  },

  // Obtener todos los medicamentos (simula: SELECT * FROM medicamentos)
  getMedicamentos: function() {
    return this.medicamentos;
  },

  // Obtener inventario de una EPS específica con JOIN
  // Simula: SELECT m.*, i.cantidad_disponible, i.fecha_actualizacion 
  //         FROM inventario i 
  //         JOIN medicamentos m ON i.medicamento_id = m.medicamento_id 
  //         WHERE i.eps_id = ?
  getInventarioByEPS: function(eps_id) {
    return this.inventario
      .filter(inv => inv.eps_id === eps_id)
      .map(inv => {
        const medicamento = this.medicamentos.find(m => m.medicamento_id === inv.medicamento_id);
        return {
          ...medicamento,
          cantidad_disponible: inv.cantidad_disponible,
          fecha_actualizacion: inv.fecha_actualizacion,
          inventario_id: inv.inventario_id
        };
      });
  },

  // Obtener estadísticas globales
  getStats: function() {
    const totalMedicamentos = this.inventario.reduce((sum, inv) => sum + inv.cantidad_disponible, 0);
    const avgDisponibilidad = this.inventario.length > 0 
      ? Math.round((totalMedicamentos / (this.inventario.length * 100)) * 100)
      : 0;
    
    return {
      totalEPS: this.eps.length,
      totalMedicamentos: totalMedicamentos,
      disponibilidadPromedio: avgDisponibilidad
    };
  },

  // Buscar medicamentos por nombre (simula búsqueda con LIKE)
  searchMedicamentos: function(query) {
    const lowerQuery = query.toLowerCase();
    return this.medicamentos.filter(m => 
      m.nombre.toLowerCase().includes(lowerQuery) || 
      m.descripcion.toLowerCase().includes(lowerQuery)
    );
  }
};

// ============================================================================
// NOTAS PARA INTEGRACIÓN CON BACKEND
// ============================================================================
// Cuando se conecte al backend, reemplazar estas funciones por:
//
// - mockData.getEPS() → fetch('/api/eps')
// - mockData.getEPSById(id) → fetch(`/api/eps/${id}`)
// - mockData.getMedicamentos() → fetch('/api/medicamentos')
// - mockData.getInventarioByEPS(eps_id) → fetch(`/api/inventario/eps/${eps_id}`)
// - mockData.getStats() → fetch('/api/stats')
// - mockData.searchMedicamentos(query) → fetch(`/api/medicamentos/search?q=${query}`)
//
// Autenticación de EPS:
// - POST /api/auth/login { email, password } → { token, eps_id, nombre }
// - Headers: { Authorization: `Bearer ${token}` }
