function StatsGrid({ 
  usuarios, 
  categorias, 
  todosLosElementos, 
  alquileres, 
  registros, 
  mostrarRegistros, 
  setMostrarRegistros, 
  aplicarFiltroFecha 
}) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <i className="bi bi-people" style={{ fontSize: '2.5rem', color: '#667eea' }}></i>
        <div>
          <h3>{usuarios.length}</h3>
          <p>Usuarios</p>
        </div>
      </div>
      <div className="stat-card">
        <i className="bi bi-folder" style={{ fontSize: '2.5rem', color: '#28a745' }}></i>
        <div>
          <h3>{categorias.length}</h3>
          <p>Categorías</p>
        </div>
      </div>
      <div className="stat-card">
        <i className="bi bi-box" style={{ fontSize: '2.5rem', color: '#ffc107' }}></i>
        <div>
          <h3>{todosLosElementos.length}</h3>
          <p>Elementos</p>
        </div>
      </div>
      <div className="stat-card">
        <i className="bi bi-hourglass-split" style={{ fontSize: '2.5rem', color: '#fd7e14' }}></i>
        <div>
          <h3>{alquileres.length}</h3>
          <p>Alquileres Activos</p>
        </div>
      </div>
      <div 
        className="stat-card" 
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setMostrarRegistros(!mostrarRegistros);
          if (!mostrarRegistros) {
            aplicarFiltroFecha('hoy'); // Cargar registros de hoy por defecto
          }
        }}
      >
        <i className="bi bi-clipboard-data" style={{ fontSize: '2.5rem', color: '#6f42c1' }}></i>
        <div>
          <h3>{registros.length}</h3>
          <p>Movimientos Hoy</p>
        </div>
      </div>
    </div>
  );
}

export default StatsGrid;
