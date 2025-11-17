const { useState, useEffect } = React;

// ============================================================================
// CONFIGURACIÓN
// ============================================================================
const USE_MOCK_DATA = false;

// ============================================================================
// FUNCIONES DE VALIDACIÓN GLOBAL
// ============================================================================

const validarNombreMedicamento = (nombre) => {
  return /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,()\-]+$/.test(nombre);
};

const validarStockMedicamento = (stock) => {
  return stock <= 40000;
};

// ============================================================================
// COMPONENTES UI
// ============================================================================

function LoadingSpinner() {
  return React.createElement('div', { className: 'loading-spinner' },
    React.createElement('div', { className: 'spinner' }),
    React.createElement('p', null, 'Cargando...')
  );
}

function ErrorMessage({ message, onRetry }) {
  return React.createElement('div', { className: 'error-message' },
    React.createElement('p', null, '❌ ' + message),
    onRetry && React.createElement('button', { className: 'btn primary', onClick: onRetry }, 'Reintentar')
  );
}

function Hero() {
  return React.createElement('div', { className: 'hero' },
    React.createElement('h1', null, 'MEDICLICK'),
    React.createElement('p', null, 'Consulta medicamentos disponibles en las EPS de Colombia')
  );
}

// ============================================================================
// SELECCIÓN DE TIPO DE USUARIO
// ============================================================================

function UserTypeSelection({ onSelectUserType }) {
  return React.createElement('div', { className: 'container' },
    React.createElement(Hero),
    React.createElement('div', { className: 'grid grid-2', style: { marginTop: 24 } },
      React.createElement('div', { 
        className: 'card hover', 
        style: { padding: 28, cursor: 'pointer' }, 
        onClick: () => onSelectUserType('user') 
      },
        React.createElement('h3', null, 'Soy Usuario'),
        React.createElement('p', { className: 'muted' }, 'Consultar disponibilidad de medicamentos'),
        React.createElement('button', { className: 'btn primary' }, 'Continuar como Usuario')
      ),
      React.createElement('div', { 
        className: 'card hover', 
        style: { padding: 28, cursor: 'pointer' }, 
        onClick: () => onSelectUserType('admin') 
      },
        React.createElement('h3', null, 'Soy Miembro EPS'),
        React.createElement('p', { className: 'muted' }, 'Gestionar inventario'),
        React.createElement('button', { className: 'btn primary' }, 'Acceder como Administrador')
      )
    )
  );
}

// ============================================================================
// TOOLBAR
// ============================================================================

function Toolbar({ userType, epsName, onLogout }) {
  return React.createElement('div', { className: 'toolbar' },
    React.createElement('div', { className: 'container row-between' },
      React.createElement('div', { className: 'brand' }, 'MEDICLICK'),
      React.createElement('div', { className: 'row', style: { gap: 10 } },
        React.createElement('span', { className: 'pill green' }, 'En línea'),
        epsName && React.createElement('span', { className: 'pill', style: { background: '#0b1026', color: '#fff' } }, epsName),
        React.createElement('span', { className: 'pill', style: { background: '#0b1026', color: '#fff' } },
          userType === 'admin' ? 'Administrador' : 'Usuario'
        ),
        React.createElement('button', { className: 'btn', onClick: onLogout }, 'Salir')
      )
    )
  );
}

// ============================================================================
// LOGIN DE ADMINISTRADOR
// ============================================================================

function AdminLogin({ onLogin, onCancel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor ingrese email y contraseña');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await window.API.loginEPS(email, password);
      if (response.eps) {
        onLogin(response.eps);
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return React.createElement('div', { className: 'container', style: { marginTop: 24 } },
    React.createElement(Hero),
    React.createElement('div', { className: 'card', style: { maxWidth: 480, margin: '20px auto', padding: 24 } },
      React.createElement('h2', { style: { marginBottom: 20 } }, 'Iniciar Sesión - Administrador EPS'),
      error && React.createElement(ErrorMessage, { message: error }),
      React.createElement('input', { 
        type: 'email', 
        placeholder: 'Email', 
        value: email, 
        onChange: e => setEmail(e.target.value),
        onKeyPress: handleKeyPress,
        disabled: loading
      }),
      React.createElement('input', { 
        type: 'password', 
        placeholder: 'Contraseña', 
        value: password, 
        onChange: e => setPassword(e.target.value),
        onKeyPress: handleKeyPress,
        style: { marginTop: 10 },
        disabled: loading
      }),
      React.createElement('div', { style: { marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' } },
        React.createElement('button', { className: 'btn', onClick: onCancel, disabled: loading }, 'Cancelar'),
        React.createElement('button', { 
          className: 'btn primary', 
          onClick: handleLogin,
          disabled: loading
        }, loading ? 'Iniciando...' : 'Iniciar Sesión')
      )
    )
  );
}

// ============================================================================
// ESTADÍSTICAS
// ============================================================================

function Stats({ stats }) {
  return React.createElement('div', { className: 'grid grid-1 container', style: { marginTop: 12 } },
    React.createElement('div', { className: 'stat' },
      React.createElement('div', { className: 'value' }, stats.totalEPS),
      React.createElement('div', { className: 'label' }, 'EPS Disponibles')
    )
  );
}

// ============================================================================
// TARJETA DE EPS
// ============================================================================

function EPSCard({ eps, medicamentos, onSelect }) {
  const totalStock = medicamentos.reduce((sum, med) => sum + (med.cantidad_disponible || 0), 0);
  const avgDisponibilidad = medicamentos.length > 0 
    ? Math.round((totalStock / (medicamentos.length * 100)) * 100) 
    : 0;
  const badgeClass = avgDisponibilidad >= 90 ? 'success' : avgDisponibilidad >= 70 ? 'warn' : 'red';

  return React.createElement('div', { 
    className: 'eps-card', 
    onClick: () => onSelect(eps.eps_id),
    style: { cursor: 'pointer' }
  },
    React.createElement('div', { className: 'eps-body' },
      React.createElement('h3', null, eps.nombre),
      React.createElement('span', { className: `badge ${badgeClass}` }, avgDisponibilidad + '% disponible'),
      React.createElement('p', null, 'NIT: ' + eps.nit),
      React.createElement('p', null, medicamentos.length + ' medicamentos'),
      React.createElement('button', { className: 'btn primary' }, 'Ver Medicamentos')
    )
  );
}

// ============================================================================
// DASHBOARD PRINCIPAL
// ============================================================================

function DashboardView({ userType, loggedEPS, onLogout, onEPSSelect }) {
  const [epsList, setEPSList] = useState([]);
  const [medicinesByEPS, setMedicinesByEPS] = useState({});
  const [stats, setStats] = useState({ totalEPS: 0, totalMedicamentos: 0, disponibilidadPromedio: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [epsData, statsData] = await Promise.all([
        window.API.fetchEPS(),
        window.API.fetchStats()
      ]);

      setEPSList(epsData);
      // Solo mantener el total de EPS en las estadísticas
      setStats({ totalEPS: statsData.totalEPS });

      const medByEPS = {};
      // Load inventories concurrently but tolerate failures per-EPS so one bad
      // inventory doesn't break the whole dashboard. Use Promise.allSettled
      // and fallback to empty array when a specific request fails.
      const promises = epsData.map(eps => window.API.fetchInventarioByEPS(eps.eps_id));
      const results = await Promise.allSettled(promises);
      results.forEach((res, idx) => {
        const epsId = epsData[idx].eps_id;
        if (res.status === 'fulfilled') {
          medByEPS[epsId] = res.value || [];
        } else {
          console.error('Error cargando inventario para EPS', epsId, res.reason);
          // fallback vacío para que la UI pueda renderizar el resto
          medByEPS[epsId] = [];
        }
      });
      setMedicinesByEPS(medByEPS);
    } catch (err) {
      setError(err.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return React.createElement('div', { className: 'container', style: { marginTop: 40 } }, 
    React.createElement(LoadingSpinner)
  );

  if (error) return React.createElement('div', { className: 'container', style: { marginTop: 40 } },
    React.createElement(ErrorMessage, { message: error, onRetry: loadData })
  );

  const displayEPS = userType === 'admin' && loggedEPS 
    ? epsList.filter(e => e.eps_id === loggedEPS.eps_id)
    : epsList;

  return React.createElement(React.Fragment, null,
    React.createElement(Toolbar, { 
      userType, 
      epsName: loggedEPS ? loggedEPS.nombre : null,
      onLogout 
    }),
    React.createElement('div', { className: 'container', style: { marginTop: 10 } },
      React.createElement(Stats, { stats }),
      React.createElement('div', { className: 'grid grid-3', style: { marginTop: 16 } },
        displayEPS.map(eps => React.createElement(EPSCard, { 
          key: eps.eps_id, 
          eps, 
          medicamentos: medicinesByEPS[eps.eps_id] || [], 
          onSelect: onEPSSelect 
        }))
      )
    )
  );
}

// ============================================================================
// TARJETA DE MEDICAMENTO
// ============================================================================

function MedCard({ medicamento, isAdmin, onEdit, onDelete }) {
  const stock = medicamento.cantidad_disponible || 0;
  const pillClass = stock >= 100 ? 'green' : stock >= 50 ? 'amber' : 'red';
  const stockLabel = stock >= 100 ? 'Stock Alto' : stock >= 50 ? 'Stock Medio' : 'Stock Bajo';

  const imageUrl = medicamento.imagen_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop';

  return React.createElement('div', { className: 'med-card' },
    React.createElement('img', { 
      src: imageUrl,
      alt: medicamento.medicamento || medicamento.nombre,
      className: 'med-img',
      onError: (e) => {
        e.target.src = 'https://via.placeholder.com/400x300?text=Medicamento';
      }
    }),
    React.createElement('div', { className: 'med-body' },
      React.createElement('div', { style: { fontWeight: 700 } }, medicamento.medicamento || medicamento.nombre),
      React.createElement('div', { className: 'muted', style: { fontSize: 13, marginTop: 4 } }, medicamento.descripcion || 'Sin descripción'),
      React.createElement('div', { className: `pill ${pillClass}`, style: { marginTop: 10 } },
        stock + ' disponibles - ' + stockLabel
      ),
      isAdmin && React.createElement('div', { style: { marginTop: 10, display: 'flex', gap: 8 } },
        React.createElement('button', { 
          className: 'btn primary', 
          style: { flex: 1 },
          onClick: () => onEdit(medicamento)
        }, 'Editar'),
        React.createElement('button', { 
          className: 'btn', 
          style: { backgroundColor: '#dc2626', color: '#fff', borderColor: '#dc2626' },
          onClick: () => onDelete(medicamento)
        }, 'Eliminar')
      )
    )
  );
}

// ============================================================================
// MODAL DE EDICIÓN - CON VALIDACIONES MEJORADAS
// ============================================================================

function EditModal({ medicamento, onSave, onClose, eps_id }) {
  const [cantidad, setCantidad] = useState(String(medicamento.cantidad_disponible || 0));
  const [descripcion, setDescripcion] = useState(medicamento.descripcion || '');
  const [imagenUrl, setImagenUrl] = useState(medicamento.imagen_url || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validación para cantidad - máximo 40,000
  const handleCantidadChange = (e) => {
    const value = e.target.value;
    // Permitir vacío o solo números
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = parseInt(value) || 0;
      if (numValue > 40000) {
        setError('Se excede la cantidad permitida de stock por medicamento (máximo 40,000)');
      } else {
        setError(null);
      }
      setCantidad(value);
    }
  };

  const handleSave = async () => {
    const cantidadNum = parseInt(cantidad) || 0;
    
    // Validación final antes de guardar
    if (cantidadNum > 40000) {
      setError('Se excede la cantidad permitida de stock por medicamento (máximo 40,000)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSave(medicamento, cantidadNum, descripcion, imagenUrl);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-content', onClick: (e) => e.stopPropagation() },
      React.createElement('h3', null, 'Editar Medicamento'),
      React.createElement('p', { style: { marginBottom: 16 } }, medicamento.medicamento || medicamento.nombre),
      error && React.createElement(ErrorMessage, { message: error }),
      
      React.createElement('label', null, 'Cantidad disponible:'),
      React.createElement('input', {
        type: 'text',
        value: cantidad,
        onChange: handleCantidadChange,
        disabled: loading,
        placeholder: '0',
        max: '40000'
      }),
      React.createElement('small', { className: 'muted' }, 'Máximo permitido: 40,000 unidades'),
      
      React.createElement('label', null, 'Descripción:'),
      React.createElement('textarea', {
        value: descripcion,
        onChange: (e) => setDescripcion(e.target.value),
        disabled: loading,
        style: { width: '100%', minHeight: 80, marginTop: 8, padding: '10px', borderRadius: '10px', border: '1px solid #cfd7ea' }
      }),
      
      React.createElement('label', null, 'URL imagen:'),
      React.createElement('input', {
        type: 'text',
        value: imagenUrl,
        onChange: (e) => setImagenUrl(e.target.value),
        disabled: loading,
        style: { marginTop: 8 }
      }),
      
      React.createElement('div', { style: { marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' } },
        React.createElement('button', { className: 'btn', onClick: onClose, disabled: loading }, 'Cancelar'),
        React.createElement('button', { 
          className: 'btn primary', 
          onClick: handleSave,
          disabled: loading || parseInt(cantidad) > 40000
        }, loading ? 'Guardando...' : 'Guardar')
      )
    )
  );
}

// ============================================================================
// MODAL CREAR MEDICAMENTO - CON VALIDACIONES MEJORADAS
// ============================================================================

function CreateMedicModal({ onCreate, onClose }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [cantidad, setCantidad] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validación para nombre del medicamento - sin caracteres especiales
  const handleNombreChange = (e) => {
    const value = e.target.value;
    // Permitir solo letras, números, espacios y algunos caracteres básicos
    if (/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,()\-]*$/.test(value)) {
      setNombre(value);
    }
  };

  // Validación para cantidad - máximo 40,000
  const handleCantidadChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = parseInt(value) || 0;
      if (numValue > 40000) {
        setError('Se excede la cantidad permitida de stock por medicamento (máximo 40,000)');
      } else {
        setError(null);
      }
      setCantidad(value);
    }
  };

  const handleCreate = async () => {
    // Validaciones antes de crear
    if (!nombre.trim()) { 
      setError('El nombre es requerido'); 
      return; 
    }

    // Validar caracteres especiales en el nombre
    if (!/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,()\-]+$/.test(nombre)) {
      setError('El nombre del medicamento no permite caracteres especiales');
      return;
    }

    const cantidadNum = parseInt(cantidad) || 0;
    if (cantidadNum > 40000) {
      setError('Se excede la cantidad permitida de stock por medicamento (máximo 40,000)');
      return;
    }

    setLoading(true); 
    setError(null);
    
    try {
      await onCreate({ 
        nombre, 
        descripcion, 
        imagen_url: imagenUrl,
        cantidad_disponible: cantidadNum 
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al crear medicamento');
    } finally { 
      setLoading(false); 
    }
  };

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-content', onClick: (e) => e.stopPropagation() },
      React.createElement('h3', null, 'Crear Medicamento'),
      error && React.createElement(ErrorMessage, { message: error }),
      
      React.createElement('label', null, 'Nombre:'),
      React.createElement('input', { 
        type: 'text', 
        value: nombre, 
        onChange: handleNombreChange,
        placeholder: 'Ej: Paracetamol 500mg'
      }),
      React.createElement('small', { className: 'muted' }, 'No se permiten caracteres especiales'),
      
      React.createElement('label', null, 'Descripción:'),
      React.createElement('textarea', { 
        value: descripcion, 
        onChange: e => setDescripcion(e.target.value), 
        style: { width: '100%', minHeight: 80, marginTop: 8, padding: '10px', borderRadius: '10px', border: '1px solid #cfd7ea' },
        placeholder: 'Descripción del medicamento'
      }),
      
      React.createElement('label', null, 'Cantidad inicial:'),
      React.createElement('input', { 
        type: 'text', 
        value: cantidad, 
        onChange: handleCantidadChange,
        placeholder: '0'
      }),
      React.createElement('small', { className: 'muted' }, 'Máximo permitido: 40,000 unidades'),
      
      React.createElement('label', null, 'URL imagen:'),
      React.createElement('input', { 
        type: 'text', 
        value: imagenUrl, 
        onChange: e => setImagenUrl(e.target.value),
        placeholder: 'https://ejemplo.com/imagen.jpg'
      }),
      
      React.createElement('div', { style: { marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 } },
        React.createElement('button', { className: 'btn', onClick: onClose, disabled: loading }, 'Cancelar'),
        React.createElement('button', { 
          className: 'btn primary', 
          onClick: handleCreate, 
          disabled: loading || !nombre.trim() || parseInt(cantidad) > 40000
        }, 
          loading ? 'Creando...' : 'Crear'
        )
      )
    )
  );
}

// ============================================================================
// MODAL CONFIRMAR ELIMINACIÓN
// ============================================================================

function ConfirmDeleteModal({ medicamento, onConfirm, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(medicamento);
      onClose();
    } catch (err) {
      console.error('Error al eliminar:', err);
    } finally {
      setLoading(false);
    }
  };

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-content', onClick: (e) => e.stopPropagation() },
      React.createElement('h3', null, 'Confirmar Eliminación'),
      React.createElement('p', null, '¿Estás seguro de eliminar este medicamento del inventario?'),
      React.createElement('p', { style: { fontWeight: 'bold', marginTop: 8 } }, 
        medicamento.medicamento || medicamento.nombre
      ),
      React.createElement('p', { style: { fontSize: '0.9rem', color: '#6b7280', marginTop: 8 } }, 
        'Esta acción solo lo eliminará de TU EPS, no del catálogo general.'
      ),
      React.createElement('div', { style: { marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' } },
        React.createElement('button', { className: 'btn', onClick: onClose, disabled: loading }, 'Cancelar'),
        React.createElement('button', { 
          className: 'btn', 
          style: { backgroundColor: '#dc2626', color: '#fff', borderColor: '#dc2626' },
          onClick: handleConfirm,
          disabled: loading
        }, loading ? 'Eliminando...' : 'Eliminar')
      )
    )
  );
}

// ============================================================================
// VISTA DETALLE DE EPS
// ============================================================================

function EPSDetailView({ eps_id, epsName, userType, loggedEPS, onBack }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [filteredMedicamentos, setFilteredMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMed, setEditingMed] = useState(null);
  const [deletingMed, setDeletingMed] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadInventario();
  }, [eps_id]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMedicamentos(medicamentos);
    } else {
      const filtered = medicamentos.filter(med =>
        (med.medicamento || med.nombre).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMedicamentos(filtered);
    }
  }, [searchQuery, medicamentos]);

  const loadInventario = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await window.API.fetchInventarioByEPS(eps_id);
      setMedicamentos(data);
      setFilteredMedicamentos(data);
    } catch (err) {
      console.error('Error fetching inventory for EPS', eps_id, err);
      const detail = err && err.message ? err.message : JSON.stringify(err);
      setError('Error al cargar inventario: ' + detail);
      // fallback empty list so UI continues to function
      setMedicamentos([]);
      setFilteredMedicamentos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async (medicamento, nuevaCantidad, descripcion, imagenUrl) => {
    try {
      await window.API.updateMedicamentoEPS(eps_id, medicamento.medicamento_id, {
        cantidad: nuevaCantidad,
        descripcion: descripcion,
        imagen_url: imagenUrl
      });
      
      // Actualizar estado local inmediatamente
      setMedicamentos(prev => prev.map(m => {
        if (m.medicamento_id === medicamento.medicamento_id) {
          return {
            ...m,
            cantidad_disponible: nuevaCantidad,
            descripcion: descripcion,
            imagen_url: imagenUrl
          };
        }
        return m;
      }));
    } catch (err) {
      console.error('Error al actualizar:', err);
      throw err;
    }
  };

  const handleDelete = async (medicamento) => {
    try {
      await window.API.deleteMedicamentoDeEPS(eps_id, medicamento.medicamento_id);
      
      // Eliminar del estado local
      setMedicamentos(prev => prev.filter(m => m.medicamento_id !== medicamento.medicamento_id));
      setFilteredMedicamentos(prev => prev.filter(m => m.medicamento_id !== medicamento.medicamento_id));
    } catch (err) {
      console.error('Error al eliminar:', err);
      alert('Error al eliminar: ' + err.message);
    }
  };

  const handleCreate = async (data) => {
    try {
      const resultado = await window.API.crearYAgregarMedicamento(eps_id, data);
      
      // Agregar al estado local
      const nuevoMed = {
        medicamento_eps_id: resultado.medicamento_eps.medicamento_eps_id,
        eps_id: eps_id,
        medicamento_id: resultado.medicamento.medicamento_id,
        medicamento: resultado.medicamento.nombre,
        nombre: resultado.medicamento.nombre,
        descripcion: resultado.medicamento_eps.descripcion,
        imagen_url: resultado.medicamento_eps.imagen_url,
        cantidad_disponible: resultado.medicamento_eps.cantidad_disponible || 0,
        fecha_actualizacion: resultado.medicamento_eps.fecha_actualizacion
      };
      
      setMedicamentos(prev => [nuevoMed, ...prev]);
      setFilteredMedicamentos(prev => [nuevoMed, ...prev]);
    } catch (err) {
      console.error('Error al crear:', err);
      throw err;
    }
  };

  const isAdmin = userType === 'admin' && loggedEPS && loggedEPS.eps_id === eps_id;

  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: 'toolbar' },
      React.createElement('div', { className: 'container row-between' },
        React.createElement('div', { className: 'brand' }, epsName + ' — Inventario'),
        React.createElement('div', { className: 'row', style: { gap: 8 } },
          isAdmin && React.createElement('button', { 
            className: 'btn primary', 
            onClick: () => setCreating(true) 
          }, '+ Crear Medicamento'),
          React.createElement('button', 
            { 
              className: 'btn', 
              onClick: onBack
            }, 'Volver al Catálogo'
          )
        )
      )
    ),
    React.createElement('div', { className: 'container', style: { marginTop: 10 } },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Buscar medicamento...',
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        style: { marginBottom: 16, width: '100%', maxWidth: 400 }
      }),
      loading && React.createElement(LoadingSpinner),
      error && React.createElement(ErrorMessage, { message: error, onRetry: loadInventario }),
      !loading && !error && React.createElement('div', { className: 'muted', style: { marginBottom: 8 } },
        filteredMedicamentos.length + ' medicamentos encontrados'
      ),
      !loading && !error && React.createElement('div', { className: 'grid grid-3' },
        filteredMedicamentos.map(med => React.createElement(MedCard, { 
          key: med.medicamento_id, 
          medicamento: med,
          isAdmin: isAdmin,
          onEdit: setEditingMed,
          onDelete: setDeletingMed
        }))
      )
    ),
    editingMed && React.createElement(EditModal, {
      medicamento: editingMed,
      eps_id: eps_id,
      onSave: handleSaveEdit,
      onClose: () => setEditingMed(null)
    }),
    deletingMed && React.createElement(ConfirmDeleteModal, {
      medicamento: deletingMed,
      onConfirm: handleDelete,
      onClose: () => setDeletingMed(null)
    }),
    creating && React.createElement(CreateMedicModal, {
      onCreate: handleCreate,
      onClose: () => setCreating(false)
    })
  );
}

// ============================================================================
// APLICACIÓN PRINCIPAL
// ============================================================================

function App() {
  const [view, setView] = useState('login');
  const [userType, setUserType] = useState(null);
  const [loggedEPS, setLoggedEPS] = useState(null);
  const [selectedEPS, setSelectedEPS] = useState(null);
  const [selectedEPSData, setSelectedEPSData] = useState(null);

  const onSelectUserType = (type) => {
    if (type === 'admin') {
      setView('admin-login');
      return;
    }
    setUserType(type);
    setView('user-dashboard');
  };

  const onLogout = () => {
    setUserType(null);
    setLoggedEPS(null);
    setSelectedEPS(null);
    setSelectedEPSData(null);
    setView('login');
  };

  const onEPSSelect = async (eps_id) => {
    setSelectedEPS(eps_id);
    
    try {
      const epsData = await window.API.fetchEPSById(eps_id);
      setSelectedEPSData(epsData);
      setView('eps-detail');
    } catch (err) {
      console.error('Error al obtener EPS:', err);
    }
  };

  const onBackToEPS = () => {
    setSelectedEPS(null);
    setSelectedEPSData(null);
    setView(userType === 'admin' ? 'admin-dashboard' : 'user-dashboard');
  };

  const handleAdminLogin = (eps) => {
    setUserType('admin');
    setLoggedEPS(eps);
    setSelectedEPS(eps.eps_id);
    setSelectedEPSData(eps);
    setView('eps-detail');
  };

  const cancelAdminLogin = () => {
    setView('login');
  };

  if (view === 'login') {
    return React.createElement(UserTypeSelection, { onSelectUserType });
  }
  
  if (view === 'admin-login') {
    return React.createElement(AdminLogin, { 
      onLogin: handleAdminLogin, 
      onCancel: cancelAdminLogin 
    });
  }
  
  if (view === 'user-dashboard' || view === 'admin-dashboard') {
    return React.createElement(DashboardView, {
      userType,
      loggedEPS,
      onLogout,
      onEPSSelect
    });
  }
  
  if (view === 'eps-detail' && selectedEPS && selectedEPSData) {
    return React.createElement(EPSDetailView, {
      eps_id: selectedEPS,
      epsName: selectedEPSData.nombre,
      userType,
      loggedEPS,
      onBack: onBackToEPS
    });
  }

  return React.createElement('div', { className: 'container' },
    React.createElement('div', { className: 'card' }, 'Estado inesperado')
  );
}

// ============================================================================
// RENDERIZAR APLICACIÓN
// ============================================================================

function renderApp() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(React.createElement(App));
}

if (USE_MOCK_DATA) {
  renderApp();
} else {
  const start = Date.now();
  const timeout = 3000;

  const check = setInterval(() => {
    if (window.API) {
      clearInterval(check);
      renderApp();
      return;
    }
    if (Date.now() - start > timeout) {
      clearInterval(check);
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement('div', { className: 'container', style: { marginTop: 40 } },
        React.createElement('div', { className: 'card' },
          React.createElement('h3', null, 'Error al cargar la API'),
          React.createElement('p', null, 'No se encontró la API (window.API). Verifique que client/api.js se cargue correctamente.')
        )
      ));
    }
  }, 50);
}