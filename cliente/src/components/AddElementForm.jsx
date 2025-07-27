/**
 * Formulario modal para agregar nuevos elementos a una categoría específica
 * Maneja la creación de elementos con validación y limpieza automática de formulario
 * 
 * @param {boolean} mostrarFormAgregarElemento - Estado de visibilidad del formulario
 * @param {Object} categoriaSeleccionada - Categoría a la cual se agregará el elemento
 * @param {Function} setMostrarFormAgregarElemento - Controla la visibilidad del modal
 * @param {Object} nuevoElemento - Objeto con datos del elemento en creación
 * @param {Function} setNuevoElemento - Actualiza los datos del nuevo elemento
 * @param {Function} crearElemento - Función para procesar la creación en el backend
 * @param {boolean} loading - Estado de carga durante la operación de creación
 */
function AddElementForm({ 
  mostrarFormAgregarElemento, 
  categoriaSeleccionada,
  setMostrarFormAgregarElemento,
  nuevoElemento,
  setNuevoElemento,
  crearElemento,
  loading 
}) {
  // No renderiza si el modal está cerrado o no hay categoría seleccionada
  if (!mostrarFormAgregarElemento || !categoriaSeleccionada) return null;

  /**
   * Cierra el formulario y limpia los datos del elemento
   */
  const cerrarFormulario = () => {
    setMostrarFormAgregarElemento(false);
    setNuevoElemento({ nombre: "", descripcion: "" });
  };

  /**
   * Procesa el envío del formulario con validación y creación del elemento
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepara los datos incluyendo la categoría seleccionada
    const elementData = {
      ...nuevoElemento,
      categoria: categoriaSeleccionada._id
    };

    const success = await crearElemento(elementData);
    if (success) {
      cerrarFormulario();
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        {/* Encabezado del modal con título dinámico */}
        <div className="form-header">
          <h3>Agregar Elemento a {categoriaSeleccionada.nombre}</h3>
          <button 
            onClick={cerrarFormulario}
            className="btn-close"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        {/* Formulario de creación de elemento */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <i className="bi bi-box" style={{ marginRight: '8px' }}></i>
              Nombre del Elemento
            </label>
            <input
              type="text"
              value={nuevoElemento.nombre}
              onChange={(e) => setNuevoElemento({...nuevoElemento, nombre: e.target.value})}
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
              value={nuevoElemento.descripcion}
              onChange={(e) => setNuevoElemento({...nuevoElemento, descripcion: e.target.value})}
              placeholder="Descripción opcional del elemento"
            />
          </div>
          
          {/* Controles de acción del formulario */}
          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Creando..." : "Crear Elemento"}
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

export default AddElementForm;
