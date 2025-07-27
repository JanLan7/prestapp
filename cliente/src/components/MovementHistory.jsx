function MovementHistory({ 
  mostrarRegistros, 
  setMostrarRegistros, 
  registros, 
  loading, 
  fechaInicioRegistros, 
  setFechaInicioRegistros,
  fechaFinRegistros, 
  setFechaFinRegistros,
  aplicarFiltroFecha,
  aplicarFiltroPersonalizado 
}) {
  if (!mostrarRegistros) return null;

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2><i className="bi bi-clipboard-data"></i> Historial de Movimientos</h2>
        <button 
          onClick={() => setMostrarRegistros(false)}
          className="btn-secondary"
        >
          <i className="bi bi-x"></i> Cerrar
        </button>
      </div>

      {/* Filtros rápidos */}
      <div style={{ 
        background: 'rgba(102, 126, 234, 0.1)', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '20px' 
      }}>
        <h4 style={{ color: '#333', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="bi bi-filter"></i> Filtros Rápidos
        </h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <button 
            onClick={() => aplicarFiltroFecha('hoy')}
            className="btn-primary"
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            <i className="bi bi-calendar-day"></i> Hoy
          </button>
          <button 
            onClick={() => aplicarFiltroFecha('ayer')}
            className="btn-secondary"
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            <i className="bi bi-calendar-minus"></i> Ayer
          </button>
          <button 
            onClick={() => aplicarFiltroFecha('semana')}
            className="btn-secondary"
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            <i className="bi bi-calendar-week"></i> Esta Semana
          </button>
          <button 
            onClick={() => aplicarFiltroFecha('mes')}
            className="btn-secondary"
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            <i className="bi bi-calendar-month"></i> Este Mes
          </button>
        </div>
        
        {/* Filtro personalizado con calendarios */}
        <div style={{ 
          background: 'white', 
          padding: '15px', 
          borderRadius: '8px',
          border: '2px solid #e1e5e9'
        }}>
          <h5 style={{ color: '#333', marginBottom: '10px', fontSize: '14px' }}>
            📅 Rango Personalizado
          </h5>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>Desde:</label>
              <input
                type="date"
                value={fechaInicioRegistros}
                onChange={(e) => setFechaInicioRegistros(e.target.value)}
                style={{ 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  border: '2px solid #e1e5e9',
                  fontSize: '14px'
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>Hasta:</label>
              <input
                type="date"
                value={fechaFinRegistros}
                onChange={(e) => setFechaFinRegistros(e.target.value)}
                style={{ 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  border: '2px solid #e1e5e9',
                  fontSize: '14px'
                }}
              />
            </div>
            <button 
              onClick={aplicarFiltroPersonalizado}
              className="btn-primary"
              disabled={loading || !fechaInicioRegistros || !fechaFinRegistros}
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              <i className="bi bi-search"></i> {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>
      </div>

      {/* Lista de registros */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        {registros.length > 0 ? (
          <div>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '15px 20px',
              fontWeight: '600',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>📋 Registros de Movimientos ({registros.length})</span>
              <span style={{ fontSize: '14px', opacity: 0.9 }}>
                {fechaInicioRegistros && fechaFinRegistros 
                  ? `${fechaInicioRegistros} - ${fechaFinRegistros}`
                  : 'Todos los registros'
                }
              </span>
            </div>
            {registros.map((registro, index) => (
              <div 
                key={registro._id} 
                style={{ 
                  padding: '15px 20px',
                  borderBottom: index < registros.length - 1 ? '1px solid #f1f3f4' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    <span style={{
                      background: registro.tipo === 'alquiler' ? '#28a745' : '#007bff',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {registro.tipo === 'alquiler' ? '📤 ALQUILER' : '📥 DEVOLUCIÓN'}
                    </span>
                    <strong style={{ color: '#333' }}>
                      {registro.elemento?.nombre || 'Elemento no disponible'}
                    </strong>
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    <strong>{registro.usuario?.nombre} {registro.usuario?.apellido}</strong> 
                    (Cédula: {registro.usuario?.cedula})
                  </div>
                  {registro.elemento?.categoria && (
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                      📁 {registro.elemento.categoria.nombre}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                    {new Date(registro.fecha).toLocaleDateString('es-PY', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      timeZone: 'America/Asuncion'
                    })}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {new Date(registro.fecha).toLocaleTimeString('es-CO', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
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
            {loading ? (
              <div>
                <i className="bi bi-hourglass-split" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                <p>Cargando registros...</p>
              </div>
            ) : (
              <div>
                <i className="bi bi-inbox" style={{ fontSize: '3rem', marginBottom: '15px', color: '#ddd' }}></i>
                <p>No hay registros para el período seleccionado</p>
                <p style={{ fontSize: '14px' }}>
                  {fechaInicioRegistros && fechaFinRegistros 
                    ? `Período: ${new Date(fechaInicioRegistros).toLocaleDateString('es-PY', { timeZone: 'America/Asuncion' })} - ${new Date(fechaFinRegistros).toLocaleDateString('es-PY', { timeZone: 'America/Asuncion' })}`
                    : 'Prueba seleccionando un rango de fechas diferente'
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovementHistory;
