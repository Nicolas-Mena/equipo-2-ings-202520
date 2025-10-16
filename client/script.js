const { useState } = React;

function Hero() {
  return React.createElement('div', { className: 'container' },
    React.createElement('div', { className: 'hero' },
      React.createElement('h1', null, 'MEDICLICK'),
      React.createElement('p', null, 'Consulta medicamentos disponibles en las EPS de Colombia')
    )
  );
}

function UserTypeSelection({ onSelectUserType }) {
  return React.createElement('div', { className: 'container' },
    React.createElement(Hero),
    React.createElement('div', { className: 'grid grid-2', style: { marginTop: 24 } },
      React.createElement('div', { className: 'card hover', style: { padding: 28 }, onClick: () => onSelectUserType('user') },
        React.createElement('h3', null, 'Soy Usuario'),
        React.createElement('p', { className: 'muted' }, 'Consultar disponibilidad de medicamentos'),
        React.createElement('button', { className: 'btn primary' }, 'Continuar como Usuario')
      ),
      React.createElement('div', { className: 'card hover', style: { padding: 28 }, onClick: () => onSelectUserType('admin') },
        React.createElement('h3', null, 'Soy Miembro EPS'),
        React.createElement('p', { className: 'muted' }, 'Gestionar inventario'),
        React.createElement('button', { className: 'btn primary' }, 'Acceder como Administrador')
      )
    )
  );
}

function Toolbar({ userType, onLogout }) {
  return React.createElement('div', { className: 'toolbar' },
    React.createElement('div', { className: 'container row-between' },
      React.createElement('div', { className: 'brand' }, 'MEDICLICK'),
      React.createElement('div', { className: 'row', style: { gap: 10 } },
        React.createElement('span', { className: 'pill green' }, 'En línea'),
        React.createElement('span', { className: 'pill', style: { background: '#0b1026', color: '#fff' } },
          userType === 'admin' ? 'Administrador' : 'Usuario'
        ),
        React.createElement('button', { className: 'btn', onClick: onLogout }, 'Salir')
      )
    )
  );
}

function AdminLogin({ onLogin, onCancel }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return React.createElement('div', { className: 'container', style: { marginTop: 24 } },
    React.createElement(Hero),
    React.createElement('div', { className: 'card', style: { maxWidth: 480, margin: '20px auto', padding: 24 } },
      React.createElement('input', { type: 'text', placeholder: 'Usuario', value: user, onChange: e => setUser(e.target.value) }),
      React.createElement('input', { type: 'password', placeholder: 'Contraseña', value: pass, onChange: e => setPass(e.target.value), style: { marginTop: 10 } }),
      React.createElement('div', { style: { marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' } },
        React.createElement('button', { className: 'btn', onClick: onCancel }, 'Cancelar'),
        React.createElement('button', { className: 'btn primary', onClick: () => onLogin({ username: user }) }, 'Iniciar Sesión')
      )
    )
  );
}

function Stats({ stats }) {
  return React.createElement('div', { className: 'grid grid-3 container', style: { marginTop: 12 } },
    React.createElement('div', { className: 'stat' },
      React.createElement('div', { className: 'value' }, stats.totalEPS),
      React.createElement('div', { className: 'label' }, 'EPS Disponibles')
    ),
    React.createElement('div', { className: 'stat' },
      React.createElement('div', { className: 'value' }, stats.totalMedicamentos),
      React.createElement('div', { className: 'label' }, 'Medicamentos Total')
    ),
    React.createElement('div', { className: 'stat' },
      React.createElement('div', { className: 'value' }, stats.disponibilidadPromedio + '%'),
      React.createElement('div', { className: 'label' }, 'Disponibilidad Promedio')
    )
  );
}

function EPSCard({ eps, medicamentos, onSelect }) {
  const totalStock = medicamentos.reduce((sum, med) => sum + med.cantidad_disponible, 0);
  const avgDisponibilidad = medicamentos.length > 0 ? Math.round((totalStock / (medicamentos.length * 100)) * 100) : 0;
  const badgeClass = avgDisponibilidad >= 90 ? 'success' : avgDisponibilidad >= 70 ? 'warn' : 'red';

  return React.createElement('div', { className: 'eps-card', onClick: () => onSelect(eps.eps_id) },
    React.createElement('div', { className: 'eps-body' },
      React.createElement('h3', null, eps.nombre),
      React.createElement('span', { className: `badge ${badgeClass}` }, avgDisponibilidad + '% disponible'),
      React.createElement('p', null, 'NIT: ' + eps.nit),
      React.createElement('p', null, medicamentos.length + ' medicamentos'),
      React.createElement('button', { className: 'btn primary' }, 'Ver Medicamentos')
    )
  );
}

function DashboardView({ userType, epsList, medicinesByEPS, stats, onLogout, onEPSSelect }) {
  return React.createElement(React.Fragment, null,
    React.createElement(Toolbar, { userType, onLogout }),
    React.createElement('div', { className: 'container', style: { marginTop: 10 } },
      React.createElement(Stats, { stats }),
      React.createElement('div', { className: 'grid grid-3', style: { marginTop: 16 } },
        epsList.map(eps => React.createElement(EPSCard, { 
          key: eps.eps_id, 
          eps, 
          medicamentos: medicinesByEPS[eps.eps_id] || [], 
          onSelect: onEPSSelect 
        }))
      )
    )
  );
}

function MedCard({ medicamento }) {
  const stock = medicamento.cantidad_disponible;
  const pillClass = stock >= 100 ? 'green' : stock >= 50 ? 'amber' : 'red';
  const stockLabel = stock >= 100 ? 'Stock Alto' : stock >= 50 ? 'Stock Medio' : 'Stock Bajo';

  return React.createElement('div', { className: 'med-card' },
    React.createElement('div', { className: 'med-body' },
      React.createElement('div', { style: { fontWeight: 700 } }, medicamento.nombre),
      React.createElement('div', { className: 'muted', style: { fontSize: 13 } }, medicamento.descripcion),
      React.createElement('div', { className: `pill ${pillClass}`, style: { marginTop: 10 } },
        stock + ' disponibles - ' + stockLabel
      )
    )
  );
}

function EPSDetailView({ epsName, medicamentos, onBack }) {
  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: 'toolbar' },
      React.createElement('div', { className: 'container row-between' },
        React.createElement('div', { className: 'brand' }, epsName + ' — Inventario'),
        React.createElement('button', { className: 'btn', onClick: onBack }, 'Volver')
      )
    ),
    React.createElement('div', { className: 'container', style: { marginTop: 10 } },
      React.createElement('div', { className: 'muted', style: { marginBottom: 8 } },
        medicamentos.length + ' medicamentos encontrados'
      ),
      React.createElement('div', { className: 'grid grid-3' },
        medicamentos.map(med => React.createElement(MedCard, { key: med.id, medicamento: med }))
      )
    )
  );
}

function App() {
  const [view, setView] = useState('login');
  const [userType, setUserType] = useState(null);
  const [selectedEPS, setSelectedEPS] = useState(null);

  const onSelectUserType = (t) => {
    if (t === 'admin') {
      setView('admin-login');
      return;
    }
    setUserType(t);
    setView('user-dashboard');
  };

  const onLogout = () => {
    setUserType(null);
    setSelectedEPS(null);
    setView('login');
  };

  const onEPSSelect = (eps_id) => {
    setSelectedEPS(eps_id);
    setView('eps-detail');
  };

  const onBackToEPS = () => {
    setSelectedEPS(null);
    setView(userType === 'admin' ? 'admin-dashboard' : 'user-dashboard');
  };

  function handleAdminLogin(user) {
    setUserType('admin');
    setView('admin-dashboard');
  }

  function cancelAdminLogin() {
    setView('login');
  }

  if (view === 'login') return React.createElement(UserTypeSelection, { onSelectUserType });
  if (view === 'admin-login') return React.createElement(AdminLogin, { onLogin: handleAdminLogin, onCancel: cancelAdminLogin });
  if (view === 'user-dashboard' || view === 'admin-dashboard') {
    // Preparar datos organizados por EPS ID
    const epsList = mockData.getEPS();
    const medicinesByEPS = {};
    epsList.forEach(eps => {
      medicinesByEPS[eps.eps_id] = mockData.getInventarioByEPS(eps.eps_id);
    });
    
    return React.createElement(DashboardView, {
      userType,
      epsList: epsList,
      medicinesByEPS: medicinesByEPS,
      stats: mockData.getStats(),
      onLogout,
      onEPSSelect
    });
  }
  if (view === 'eps-detail' && selectedEPS) {
    const eps = mockData.getEPSById(selectedEPS);
    const medicamentos = mockData.getInventarioByEPS(selectedEPS);
    
    return React.createElement(EPSDetailView, {
      epsName: eps ? eps.nombre : 'EPS',
      medicamentos: medicamentos,
      onBack: onBackToEPS
    });
  }

  return React.createElement('div', { className: 'container' },
    React.createElement('div', { className: 'card' }, 'Estado inesperado')
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
