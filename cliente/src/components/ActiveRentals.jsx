/**
 * Componente para visualizar y gestionar alquileres activos
 * Muestra la lista de elementos actualmente alquilados con información del usuario
 * Permite procesar devoluciones y actualizar la lista en tiempo real
 * 
 * @param {Array} alquileres - Lista de alquileres activos en el sistema
 * @param {Function} obtenerAlquileres - Función para refrescar la lista de alquileres
 * @param {Function} devolverElemento - Función para procesar la devolución de un elemento
 */
function ActiveRentals({ 
  alquileres, 
  obtenerAlquileres, 
  devolverElemento 
}) {
  return (
    <div className="admin-section">
      {/* Encabezado con título y botón de actualización */}
      <div className="section-header">
        <h2><i className="bi bi-hourglass-split"></i> Alquileres Activos</h2>
        <button 
          onClick={obtenerAlquileres}
          className="btn-primary"
        >
          <i className="bi bi-arrow-clockwise"></i> Actualizar
        </button>
      </div>
      
      {/* Contenido principal: lista de alquileres o mensaje vacío */}
      <div style={{ padding: '30px' }}>
        {alquileres.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Mapeo de cada alquiler activo con información completa */}
            {alquileres.map(alquiler => (
              <div key={alquiler._id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e9ecef'
              }}>
                {/* Información del elemento y usuario */}
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>
                    <i className="bi bi-box" style={{ color: '#667eea', marginRight: '8px' }}></i>
                    {alquiler.nombre}
                  </h4>
                  <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.9rem' }}>
                    {alquiler.descripcion}
                  </p>
                  {/* Información del usuario que tiene el elemento alquilado */}
                  {alquiler.alquiladoPor && (
                    <p style={{ margin: 0, color: '#28a745', fontSize: '0.9rem', fontWeight: '600' }}>
                      <i className="bi bi-person" style={{ marginRight: '5px' }}></i>
                      {alquiler.alquiladoPor.nombre} {alquiler.alquiladoPor.apellido} (Cédula: {alquiler.alquiladoPor.cedula})
                    </p>
                  )}
                </div>
                
                {/* Botón de devolución */}
                <button 
                  onClick={() => devolverElemento(alquiler._id)}
                  style={{
                    background: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="bi bi-arrow-return-left"></i> Devolver
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Estado vacío cuando no hay alquileres activos */
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <i className="bi bi-inbox" style={{ fontSize: '3rem', marginBottom: '15px', color: '#ccc' }}></i>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>No hay alquileres activos</p>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Los elementos alquilados aparecerán aquí</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveRentals;
