const { useState } = React;

function Hero() {
  return (
    <div className="container">
      <div className="hero">
        <h1>MEDICLICK</h1>
        <p>Consulta medicamentos disponibles en las EPS de Colombia</p>
      </div>
    </div>
  );
}

function UserTypeSelection({ onSelectUserType }) {
  return (
    <div className="container">
      <Hero />
      <div className="grid grid-2" style={{ marginTop: 24 }}>
        <div className="card hover" style={{ padding: 28 }}>
          <div className="row" style={{ gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 999,
                background: "#f1f5f9",
                display: "grid",
                placeItems: "center",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111827"
                strokeWidth="2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h3 style={{ margin: "0 0 4px 0" }}>Soy Usuario</h3>
              <p className="muted">
                Consultar disponibilidad de medicamentos en las EPS de Colombia
              </p>
            </div>
          </div>
          <div className="row" style={{ marginTop: 18 }}>
            <button
              className="btn primary"
              onClick={() => onSelectUserType("user")}
            >
              Continuar como Usuario
            </button>
          </div>
        </div>

        <div className="card hover" style={{ padding: 28 }}>
          <div className="row" style={{ gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 999,
                background: "#f1f5f9",
                display: "grid",
                placeItems: "center",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111827"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 style={{ margin: "0 0 4px 0" }}>Soy Miembro EPS</h3>
              <p className="muted">
                Gestionar inventario y actualizar disponibilidad de medicamentos
              </p>
            </div>
          </div>
          <div className="row" style={{ marginTop: 18 }}>
            <button
              className="btn primary"
              onClick={() => onSelectUserType("admin")}
            >
              Acceder como Administrador
            </button>
          </div>
        </div>
      </div>
      <p className="muted" style={{ textAlign: "center", marginTop: 24 }}>
        Selecciona tu tipo de acceso para continuar
      </p>
    </div>
  );
}

function Toolbar({ userType, onLogout }) {
  return (
    <div className="toolbar">
      <div className="container row-between">
        <div className="brand row" style={{ gap: 10 }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          >
            <path d="M3 8a4 4 0 0 1 4-4h4v4H7v4H3V8Z" />
            <path d="M21 16a4 4 0 0 1-4 4h-4v-4h4v-4h4v4Z" />
          </svg>
          MEDICLICK
        </div>
        <div className="row" style={{ gap: 10 }}>
          <span className="pill green">En línea</span>
          <span
            className="pill"
            style={{ background: "#0b1026", color: "#fff" }}
          >
            {userType === "admin" ? "Administrador" : "Usuario"}
          </span>
          <button className="btn" onClick={onLogout}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}

// === Se mantienen los demás componentes: Stats, EPSCard, DashboardView, MEDS, MedCard, EPSDetailView, App ===
// (Por espacio no los repito aquí, pero son idénticos al original y van en el mismo archivo app.js)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
