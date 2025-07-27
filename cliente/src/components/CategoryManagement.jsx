/**
 * Componente de gestión de categorías del sistema
 * Permite crear, editar, eliminar y visualizar categorías con iconos personalizados
 * Incluye selección interactiva para mostrar elementos de cada categoría
 */
function CategoryManagement({ 
  categorias, 
  categoriaSeleccionada, 
  setCategoriaSeleccionada,
  obtenerElementos,
  mostrarFormCategoria, 
  setMostrarFormCategoria,
  nuevaCategoria, 
  setNuevaCategoria,
  mostrarFormEditarCategoria, 
  setMostrarFormEditarCategoria,
  categoriaEditada, 
  setCategoriaEditada,
  loading,
  crearCategoria,
  editarCategoria,
  actualizarCategoria,
  eliminarCategoria,
  abrirSelectorEmojis
}) {
  return (
    <div className="admin-section">
      <div className="section-header">
        <h2><i className="bi bi-folder"></i> Gestión de Categorías</h2>
        <button 
          onClick={() => setMostrarFormCategoria(true)}
          className="btn-primary"
        >
          <i className="bi bi-plus-circle"></i> Crear Categoría
        </button>
      </div>
      
      {/* Grid de categorías con interfaz interactiva y gestión CRUD */}
      <div className="categories-grid">
        {categorias.map(categoria => (
          <div 
            key={categoria._id} 
            className={`category-card ${categoriaSeleccionada?._id === categoria._id ? 'selected' : ''}`}
            style={{ position: 'relative' }}
          >
            {/* Contenido principal clickeable para selección de categoría */}
            <div 
              onClick={() => {
                setCategoriaSeleccionada(categoria);
                obtenerElementos(categoria._id);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{categoria.icono}</div>
              <h3>{categoria.nombre}</h3>
              <p>{categoria.descripcion}</p>
            </div>
            
            {/* Controles de edición y eliminación posicionados absolutamente */}
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px',
              display: 'flex',
              gap: '5px',
              zIndex: 10
            }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  editarCategoria(categoria);
                }}
                style={{
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: '600'
                }}
                title="Editar categoría"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  eliminarCategoria(categoria._id, categoria.nombre);
                }}
                style={{
                  background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: '600'
                }}
                title="Eliminar categoría"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de formulario para crear nueva categoría */}
      {mostrarFormCategoria && (
        <div className="form-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h3>Crear Nueva Categoría</h3>
              <button 
                onClick={() => setMostrarFormCategoria(false)}
                className="btn-close"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
            <form onSubmit={crearCategoria}>
              <div className="form-group">
                <label>
                  <i className="bi bi-folder" style={{ marginRight: '8px' }}></i>
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  value={nuevaCategoria.nombre}
                  onChange={(e) => setNuevaCategoria({...nuevaCategoria, nombre: e.target.value})}
                  placeholder="Ej: Equipos de Laboratorio, Instrumentos..."
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <i className="bi bi-card-text" style={{ marginRight: '8px' }}></i>
                  Descripción
                </label>
                <input
                  type="text"
                  value={nuevaCategoria.descripcion}
                  onChange={(e) => setNuevaCategoria({...nuevaCategoria, descripcion: e.target.value})}
                  placeholder="Descripción de la categoría (opcional)"
                />
              </div>
              <div className="form-group">
                <label>
                  <i className="bi bi-emoji-smile" style={{ marginRight: '8px' }}></i>
                  Icono
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <input
                    type="text"
                    value={nuevaCategoria.icono}
                    onChange={(e) => setNuevaCategoria({...nuevaCategoria, icono: e.target.value})}
                    placeholder="📦"
                    style={{ width: '80px', textAlign: 'center', fontSize: '24px' }}
                  />
                  <button 
                    type="button"
                    onClick={abrirSelectorEmojis}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <i className="bi bi-emoji-smile"></i>
                    Elegir Emoji
                  </button>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Creando..." : "Crear Categoría"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setMostrarFormCategoria(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de formulario para editar categoría existente */}
      {mostrarFormEditarCategoria && (
        <div className="form-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h3>Editar Categoría</h3>
              <button 
                onClick={() => setMostrarFormEditarCategoria(false)}
                className="btn-close"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
            <form onSubmit={actualizarCategoria}>
              <div className="form-group">
                <label>
                  <i className="bi bi-folder" style={{ marginRight: '8px' }}></i>
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  value={categoriaEditada.nombre}
                  onChange={(e) => setCategoriaEditada({...categoriaEditada, nombre: e.target.value})}
                  placeholder="Ej: Equipos de Laboratorio, Instrumentos..."
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <i className="bi bi-card-text" style={{ marginRight: '8px' }}></i>
                  Descripción
                </label>
                <input
                  type="text"
                  value={categoriaEditada.descripcion}
                  onChange={(e) => setCategoriaEditada({...categoriaEditada, descripcion: e.target.value})}
                  placeholder="Descripción de la categoría (opcional)"
                />
              </div>
              <div className="form-group">
                <label>
                  <i className="bi bi-emoji-smile" style={{ marginRight: '8px' }}></i>
                  Icono
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <input
                    type="text"
                    value={categoriaEditada.icono}
                    onChange={(e) => setCategoriaEditada({...categoriaEditada, icono: e.target.value})}
                    placeholder="📦"
                    style={{ width: '80px', textAlign: 'center', fontSize: '24px' }}
                  />
                  <button 
                    type="button"
                    onClick={abrirSelectorEmojis}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <i className="bi bi-emoji-smile"></i>
                    Elegir Emoji
                  </button>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Actualizando..." : "Actualizar Categoría"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setMostrarFormEditarCategoria(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManagement;
