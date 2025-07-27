function RentalForm({ 
  mostrarFormAlquiler, 
  elementoParaAlquilar, 
  setMostrarFormAlquiler, 
  setElementoParaAlquilar,
  cedulaAlquiler,
  setCedulaAlquiler,
  confirmarAlquiler,
  obtenerElementos,
  categoriaSeleccionada,
  loading 
}) {
  if (!mostrarFormAlquiler || !elementoParaAlquilar) return null;

  const cerrarFormulario = () => {
    setMostrarFormAlquiler(false);
    setElementoParaAlquilar(null);
    setCedulaAlquiler("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cedulaAlquiler.trim()) {
      alert("❌ Debes ingresar la cédula del usuario");
      return;
    }

    const success = await confirmarAlquiler(elementoParaAlquilar._id, cedulaAlquiler);
    if (success) {
      cerrarFormulario();
      // Actualizar elementos si hay categoría seleccionada
      if (categoriaSeleccionada) {
        obtenerElementos(categoriaSeleccionada._id);
      }
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h3>Alquilar Elemento</h3>
          <button 
            onClick={cerrarFormulario}
            className="btn-close"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <div style={{ padding: '20px 25px 0' }}>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
              <i className="bi bi-box" style={{ color: '#667eea', marginRight: '8px' }}></i>
              {elementoParaAlquilar.nombre}
            </h4>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              {elementoParaAlquilar.descripcion}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <i className="bi bi-person" style={{ marginRight: '8px' }}></i>
              Cédula del Usuario
            </label>
            <input
              type="text"
              value={cedulaAlquiler}
              onChange={(e) => setCedulaAlquiler(e.target.value)}
              placeholder="Ingresa la cédula del usuario"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Alquilando..." : "Confirmar Alquiler"}
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

export default RentalForm;
