/**
 * Componente de gestión de elementos por categoría
 * Muestra los elementos de la categoría seleccionada con operaciones CRUD completas
 * Incluye funcionalidad de alquiler y devolución con estado visual
 * 
 * @param {Object} categoriaSeleccionada - Categoría actualmente seleccionada
 * @param {Array} categorias - Lista completa de categorías para referencias
 * @param {Array} elementos - Elementos de la categoría seleccionada
 * @param {Function} setMostrarFormAgregarElemento - Controla la visualización del formulario de agregar
 * @param {Function} alquilarElemento - Función para procesar el alquiler de un elemento
 * @param {Function} devolverElemento - Función para procesar la devolución de un elemento
 * @param {Function} editarElemento - Función para iniciar la edición de un elemento
 * @param {Function} eliminarElemento - Función para eliminar un elemento del sistema
 */
function ElementsManagement({ 
  categoriaSeleccionada,
  categorias,
  elementos,
  setMostrarFormAgregarElemento,
  alquilarElemento,
  devolverElemento,
  editarElemento,
  eliminarElemento
}) {
  // Renderiza null si no hay categoría seleccionada
  if (!categoriaSeleccionada) return null;

  return (
    <div className="admin-section">
      {/* Encabezado de la sección con información de categoría */}
      <div className="section-header">
        <h2>
          <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>
            {categorias.find(c => c._id === categoriaSeleccionada._id)?.icono}
          </span>
          Elementos - {categoriaSeleccionada.nombre}
        </h2>
        <button 
          onClick={() => setMostrarFormAgregarElemento(true)}
          className="btn-primary"
        >
          <i className="bi bi-plus-circle"></i> Agregar Elemento
        </button>
      </div>
      
      {/* Grid de elementos con controles de gestión y estado */}
      <div className="elements-grid">
        {elementos.map(elemento => (
          <div key={elemento._id} className="element-card">
            {/* Información básica del elemento */}
            <div className="element-info">
              <h4>{elemento.nombre}</h4>
              <p>{elemento.descripcion}</p>
              <span className={`status ${elemento.disponible ? 'available' : 'unavailable'}`}>
                {elemento.disponible ? 'Disponible' : 'No disponible'}
              </span>
              {/* Información de alquiler si el elemento no está disponible */}
              {!elemento.disponible && elemento.alquiladoPor && (
                <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '5px' }}>
                  Alquilado por: {elemento.alquiladoPor.nombre} {elemento.alquiladoPor.apellido}
                </p>
              )}
            </div>
            
            {/* Controles de acción según disponibilidad y operaciones CRUD */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
              {/* Botón condicional: Alquilar si disponible, Devolver si no */}
              {elemento.disponible ? (
                <button 
                  onClick={() => alquilarElemento(elemento)}
                  style={{
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <i className="bi bi-person-plus"></i> Alquilar
                </button>
              ) : (
                <button 
                  onClick={() => devolverElemento(elemento._id)}
                  style={{
                    background: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <i className="bi bi-arrow-return-left"></i> Devolver
                </button>
              )}
              
              {/* Botón de edición para modificar datos del elemento */}
              <button 
                onClick={() => editarElemento(elemento)}
                style={{
                  background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <i className="bi bi-pencil"></i> Editar
              </button>
              
              {/* Botón de eliminación con confirmación */}
              <button 
                onClick={() => eliminarElemento(elemento._id, elemento.nombre)}
                style={{
                  background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <i className="bi bi-trash"></i> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementsManagement;
