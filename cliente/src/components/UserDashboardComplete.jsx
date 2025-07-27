import UserStatsGrid from './UserStatsGrid';

function UserDashboardComplete({ 
  datosUsuario,
  mensaje,
  logout,
  misPrestamos,
  obtenerMisPrestamos,
  miHistorial,
  fechaFiltroUsuario,
  setFechaFiltroUsuario,
  filtrarHistorialPorFecha
}) {
  return (
    <div className="dashboard">
      {/* Header del usuario */}
      <div className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
          <i className="bi bi-person-circle" style={{ fontSize: '1.8rem' }}></i>
          <div>
            <h1>Mi Panel Personal</h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>
              {datosUsuario ? `${datosUsuario.nombre} ${datosUsuario.apellido}` : 'Usuario'}
            </p>
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

      {/* Estadísticas del usuario */}
      <UserStatsGrid 
        misPrestamos={misPrestamos}
        miHistorial={miHistorial}
        datosUsuario={datosUsuario}
      />

      {/* Préstamos Activos */}
      <div className="admin-section">
        <div className="section-header">
          <h2><i className="bi bi-box-seam"></i> Mis Préstamos Activos</h2>
          <button 
            onClick={obtenerMisPrestamos}
            className="btn-secondary"
            style={{ fontSize: '14px' }}
          >
            <i className="bi bi-arrow-clockwise"></i> Actualizar
          </button>
        </div>
        
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          {misPrestamos.length > 0 ? (
            <div>
              <div style={{ 
                background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                color: 'white',
                padding: '15px 20px',
                fontWeight: '600'
              }}>
                📦 Tienes {misPrestamos.length} elemento(s) en préstamo
              </div>
              {misPrestamos.map((prestamo, index) => (
                <div 
                  key={prestamo._id} 
                  style={{ 
                    padding: '20px',
                    borderBottom: index < misPrestamos.length - 1 ? '1px solid #f1f3f4' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>
                      {prestamo.item?.nombre || 'Elemento no disponible'}
                    </h4>
                    <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>
                      {prestamo.item?.descripcion || 'Sin descripción'}
                    </p>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                      <strong>Prestado el:</strong> {' '}
                      {new Date(prestamo.fechaAlquiler).toLocaleDateString('es-PY', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'America/Asuncion'
                      })}
                    </div>
                  </div>
                  <span style={{
                    background: '#28a745',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    ACTIVO
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              padding: '40px 20px', 
              textAlign: 'center',
              color: '#666'
            }}>
              <i className="bi bi-inbox" style={{ fontSize: '3rem', marginBottom: '15px', color: '#ddd' }}></i>
              <h4 style={{ margin: '0 0 10px 0' }}>No tienes préstamos activos</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Cuando tengas elementos en préstamo aparecerán aquí
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Historial Personal */}
      <div className="admin-section">
        <div className="section-header">
          <h2><i className="bi bi-clock-history"></i> Mi Historial de Movimientos</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="date"
              value={fechaFiltroUsuario}
              onChange={(e) => setFechaFiltroUsuario(e.target.value)}
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
            />
            <button 
              onClick={filtrarHistorialPorFecha}
              className="btn-secondary"
              style={{ fontSize: '14px' }}
            >
              <i className="bi bi-filter"></i> Filtrar
            </button>
            {fechaFiltroUsuario && (
              <button 
                onClick={() => {
                  setFechaFiltroUsuario("");
                  filtrarHistorialPorFecha();
                }}
                className="btn-tertiary"
                style={{ fontSize: '14px' }}
              >
                <i className="bi bi-x"></i> Limpiar
              </button>
            )}
          </div>
        </div>
        
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          {miHistorial.length > 0 ? (
            <div>
              <div style={{ 
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                color: 'white',
                padding: '15px 20px',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>📋 Mi Historial ({miHistorial.length} movimientos)</span>
                {fechaFiltroUsuario && (
                  <span style={{ fontSize: '14px', opacity: 0.9 }}>
                    {new Date(fechaFiltroUsuario).toLocaleDateString('es-PY', { timeZone: 'America/Asuncion' })}
                  </span>
                )}
              </div>
              {miHistorial.map((registro, index) => (
                <div 
                  key={registro._id} 
                  style={{ 
                    padding: '20px',
                    borderBottom: index < miHistorial.length - 1 ? '1px solid #f1f3f4' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{
                        background: registro.fechaDevolucion ? '#007bff' : '#28a745',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {registro.fechaDevolucion ? '📥 DEVUELTO' : '📤 PRÉSTAMO'}
                      </span>
                      <strong style={{ color: '#333' }}>
                        {registro.item?.nombre || 'Elemento no disponible'}
                      </strong>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>
                        {registro.item?.descripcion || 'Sin descripción'}
                      </p>
                      <div style={{ fontSize: '12px', color: '#888' }}>
                        <div>
                          <strong>Prestado:</strong> {' '}
                          {new Date(registro.fechaAlquiler).toLocaleDateString('es-PY', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'America/Asuncion'
                          })}
                        </div>
                        {registro.fechaDevolucion && (
                          <div style={{ marginTop: '2px' }}>
                            <strong>Devuelto:</strong> {' '}
                            {new Date(registro.fechaDevolucion).toLocaleDateString('es-PY', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              timeZone: 'America/Asuncion'
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span style={{
                      background: registro.fechaDevolucion ? '#6c757d' : '#28a745',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {registro.fechaDevolucion ? 'COMPLETADO' : 'ACTIVO'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              padding: '40px 20px', 
              textAlign: 'center',
              color: '#666'
            }}>
              <i className="bi bi-journal-x" style={{ fontSize: '3rem', marginBottom: '15px', color: '#ddd' }}></i>
              <h4 style={{ margin: '0 0 10px 0' }}>No hay registros en tu historial</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>
                {fechaFiltroUsuario 
                  ? `No hay movimientos para la fecha ${new Date(fechaFiltroUsuario).toLocaleDateString('es-PY', { timeZone: 'America/Asuncion' })}`
                  : 'Cuando realices préstamos aparecerán aquí'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div style={{ 
        background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        margin: '20px 30px',
        textAlign: 'center'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>
          <i className="bi bi-info-circle"></i> Información
        </h4>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
          Esta es tu vista personal de solo lectura. Aquí puedes ver tus préstamos activos y tu historial completo de movimientos.
          Para solicitar nuevos préstamos o devoluciones, contacta al administrador.
        </p>
      </div>
    </div>
  );
}

export default UserDashboardComplete;
