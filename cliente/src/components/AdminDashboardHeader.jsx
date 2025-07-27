function AdminDashboardHeader({ 
  logout,
  mensaje 
}) {
  return (
    <>
      {/* Header elegante con gradiente */}
      <div className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
          <i className="bi bi-person-badge" style={{ fontSize: '1.8rem' }}></i>
          <div>
            <h1>Panel de Administrador</h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>Gestión Completa del Sistema</p>
          </div>
        </div>
        
        {/* Logo PRESTAPP en el centro */}
        <div style={{ 
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '800', 
            color: 'white',
            margin: '0',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            letterSpacing: '1px'
          }}>
            PRESTAPP
          </h2>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '0.7rem', 
            fontWeight: '500',
            margin: '0',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Sistema de Gestión
          </p>
        </div>
        
        <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
      </div>

      {mensaje && <div className="mensaje">{mensaje}</div>}
    </>
  );
}

export default AdminDashboardHeader;
