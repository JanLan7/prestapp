function UserStatsGrid({ misPrestamos, miHistorial, datosUsuario }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <i className="bi bi-box" style={{ fontSize: '2.5rem', color: '#007bff' }}></i>
        <div>
          <h3>{misPrestamos.length}</h3>
          <p>Préstamos Activos</p>
        </div>
      </div>
      <div className="stat-card">
        <i className="bi bi-clock-history" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
        <div>
          <h3>{miHistorial.length}</h3>
          <p>Total Movimientos</p>
        </div>
      </div>
      <div className="stat-card">
        <i className="bi bi-calendar-check" style={{ fontSize: '2.5rem', color: '#ffc107' }}></i>
        <div>
          <h3>{datosUsuario?.cedula || 'N/A'}</h3>
          <p>Mi Cédula</p>
        </div>
      </div>
    </div>
  );
}

export default UserStatsGrid;
