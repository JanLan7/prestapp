/**
 * Formulario modal para editar elementos existentes
 * Permite modificar nombre, descripción y categoría del elemento
 * Incluye validación y actualización automática de la lista tras edición
 * 
 * @param {boolean} mostrarFormEditarElemento - Estado de visibilidad del formulario
 * @param {Object} categoriaSeleccionada - Categoría actualmente seleccionada para referencia
 * @param {Array} categorias - Lista completa de categorías para el selector
 * @param {Function} setMostrarFormEditarElemento - Controla la visibilidad del modal
 * @param {Object} elementoEditado - Datos del elemento en proceso de edición
 * @param {Function} setElementoEditado - Actualiza los datos del elemento editado
 * @param {Function} actualizarElemento - Función para procesar la actualización en el backend
 * @param {Function} obtenerElementos - Función para refrescar la lista de elementos
 * @param {boolean} loading - Estado de carga durante la operación de actualización
 */
function EditElementForm({ 
  mostrarFormEditarElemento, 
  categoriaSeleccionada,
  categorias,
  setMostrarFormEditarElemento,
  elementoEditado,
  setElementoEditado,
  actualizarElemento,
  obtenerElementos,
  loading 
}) {
  // No renderiza si el modal está cerrado o no hay elemento válido para editar
  if (!mostrarFormEditarElemento || !elementoEditado._id) return null;

  /**
   * Cierra el formulario y limpia los datos del elemento editado
   */
  const cerrarFormulario = () => {
    setMostrarFormEditarElemento(false);
    setElementoEditado({
      _id: "",
      nombre: "",
      descripcion: "",
      categoria: ""
    });
  };

  /**
   * Procesa el envío del formulario con validación y actualización del elemento
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepara los datos de actualización
    const elementData = {
      nombre: elementoEditado.nombre,
      descripcion: elementoEditado.descripcion,
      categoria: elementoEditado.categoria
    };

    const success = await actualizarElemento(elementoEditado._id, elementData);
    if (success) {
      cerrarFormulario();
      // Refrescar la lista de elementos si hay una categoría seleccionada
      if (obtenerElementos && categoriaSeleccionada) {
        obtenerElementos(categoriaSeleccionada._id);
      }
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        {/* Encabezado del modal de edición */}
        <div className="form-header">
          <h3>Editar Elemento</h3>
          <button 
            onClick={cerrarFormulario}
            className="btn-close"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        {/* Formulario de edición con datos pre-cargados */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <i className="bi bi-box" style={{ marginRight: '8px' }}></i>
              Nombre del Elemento
            </label>
            <input
              type="text"
              value={elementoEditado.nombre}
              onChange={(e) => setElementoEditado({...elementoEditado, nombre: e.target.value})}
              placeholder="Ej: Guitarra Acústica, Llave Aula 201"
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
              value={elementoEditado.descripcion}
              onChange={(e) => setElementoEditado({...elementoEditado, descripcion: e.target.value})}
              placeholder="Descripción opcional del elemento"
            />
          </div>
          
          {/* Selector de categoría para reasignación */}
          <div className="form-group">
            <label>
              <i className="bi bi-folder" style={{ marginRight: '8px' }}></i>
              Categoría
            </label>
            <select
              value={elementoEditado.categoria}
              onChange={(e) => setElementoEditado({...elementoEditado, categoria: e.target.value})}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map(categoria => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.icono} {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
          
          {/* Controles de acción del formulario */}
          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Actualizando..." : "Actualizar Elemento"}
            </button>
            <button 
              type="button" 
              onClick={cerrarFormulario}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditElementForm;
