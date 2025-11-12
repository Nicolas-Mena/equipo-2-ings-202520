// ============================================================================
// API HELPER - Conexión Frontend con Backend (REDISEÑADO)
// ============================================================================

// Deployed backend URL (Render)
const API_URL = 'https://equipo-2-ings-202520.onrender.com';

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error del servidor' }));
    throw new Error(error.error || `Error HTTP: ${response.status}`);
  }
  return response.json();
}

async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
}

// ============================================================================
// EPS
// ============================================================================

async function fetchEPS() {
  return apiCall('/api/eps');
}

async function fetchEPSById(eps_id) {
  return apiCall(`/api/eps/${eps_id}`);
}

async function createEPS(data) {
  return apiCall('/api/eps', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function loginEPS(email, password) {
  return apiCall('/api/eps/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// ============================================================================
// MEDICAMENTOS (Catálogo General)
// ============================================================================

async function fetchMedicamentos() {
  return apiCall('/api/medicamentos');
}

async function createMedicamento(data) {
  return apiCall('/api/medicamentos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================================================
// INVENTARIO POR EPS (medicamentos_eps)
// ============================================================================

/**
 * Obtener inventario completo de una EPS
 */
async function fetchInventarioByEPS(eps_id) {
  return apiCall(`/api/eps/${eps_id}/medicamentos`);
}

/**
 * Buscar medicamentos en el inventario de una EPS
 */
async function searchMedicamentos(eps_id, query) {
  return apiCall(`/api/eps/${eps_id}/medicamentos/search?nombre=${encodeURIComponent(query)}`);
}

/**
 * Crear medicamento nuevo Y agregarlo al inventario de la EPS
 */
async function crearYAgregarMedicamento(eps_id, data) {
  return apiCall(`/api/eps/${eps_id}/medicamentos/nuevo`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Agregar medicamento existente al inventario de una EPS
 */
async function agregarMedicamentoAEPS(eps_id, data) {
  return apiCall(`/api/eps/${eps_id}/medicamentos`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Actualizar medicamento en inventario de EPS
 * (cantidad, descripción, imagen_url)
 */
async function updateMedicamentoEPS(eps_id, medicamento_id, data) {
  return apiCall(`/api/eps/${eps_id}/medicamentos/${medicamento_id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Eliminar medicamento del inventario de una EPS
 */
async function deleteMedicamentoDeEPS(eps_id, medicamento_id) {
  return apiCall(`/api/eps/${eps_id}/medicamentos/${medicamento_id}`, {
    method: 'DELETE',
  });
}

// ============================================================================
// ESTADÍSTICAS
// ============================================================================

async function fetchStats() {
  return apiCall('/api/stats');
}

// ============================================================================
// EXPORTAR FUNCIONES (disponibles globalmente)
// ============================================================================

try {
  console.log('[api.js] Cargado, registrando API global en window.API');

  if (typeof window !== 'undefined') {
    window.API = {
      // EPS
      fetchEPS,
      fetchEPSById,
      createEPS,
      loginEPS,
      
      // Medicamentos (catálogo)
      fetchMedicamentos,
      createMedicamento,
      
      // Inventario por EPS
      fetchInventarioByEPS,
      searchMedicamentos,
      crearYAgregarMedicamento,
      agregarMedicamentoAEPS,
      updateMedicamentoEPS,
      deleteMedicamentoDeEPS,
      
      // Estadísticas
      fetchStats,
    };

    console.log('[api.js] window.API registrado exitosamente');
  }
} catch (err) {
  console.error('[api.js] Error al registrar window.API:', err);
}