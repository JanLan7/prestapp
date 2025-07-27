/**
 * Componente de gestión de usuarios del sistema
 * Proporciona funcionalidades CRUD para usuarios, búsqueda y visualización
 * con interfaz de lista desplegable para optimizar el espacio
 */
import { useState } from 'react';

/**
 * Gestiona todas las operaciones relacionadas con usuarios del sistema
 * @param {Object} props - Propiedades del componente
 * @param {Array} usuarios - Lista de usuarios registrados
 * @param {boolean} mostrarFormUsuario - Estado del formulario de creación
 * @param {Function} setMostrarFormUsuario - Setter para el formulario de creación
 * @param {Object} nuevoUsuario - Datos del usuario a crear
 * @param {Function} setNuevoUsuario - Setter para los datos del nuevo usuario
 * @param {Object} usuarioSeleccionado - Usuario actualmente seleccionado
 * @param {Function} setUsuarioSeleccionado - Setter para usuario seleccionado
 * @param {boolean} mostrarFormEditarUsuario - Estado del formulario de edición
 * @param {Function} setMostrarFormEditarUsuario - Setter para el formulario de edición
 * @param {Object} usuarioEditado - Datos del usuario en edición
 * @param {Function} setUsuarioEditado - Setter para usuario en edición
 * @param {boolean} loading - Estado de carga
 * @param {Function} crearUsuarioAdmin - Función para crear usuarios
 * @param {Function} buscarUsuario - Función para buscar usuarios
 * @param {Function} editarUsuario - Función para iniciar edición
 * @param {Function} actualizarUsuario - Función para actualizar usuario
 * @param {Function} eliminarUsuario - Función para eliminar usuario
 */
function UserManagement({ 
  usuarios, 
  mostrarFormUsuario, 
  setMostrarFormUsuario,
  nuevoUsuario, 
  setNuevoUsuario,
  usuarioSeleccionado, 
  setUsuarioSeleccionado,
  mostrarFormEditarUsuario, 
  setMostrarFormEditarUsuario,
  usuarioEditado, 
  setUsuarioEditado,
  loading,
  crearUsuarioAdmin,
  buscarUsuario,
  editarUsuario,
  actualizarUsuario,
  eliminarUsuario
}) {
  // Estado para controlar la expansión de la lista de usuarios
  const [listaExpandida, setListaExpandida] = useState(false);

  /**
   * Maneja el envío del formulario de creación de usuario
   * Valida los datos y ejecuta la función de creación
   */
  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    
    const success = await crearUsuarioAdmin(nuevoUsuario);
    
    if (success) {
      // Resetear formulario y cerrar modal
      setNuevoUsuario({ cedula: "", nombre: "", apellido: "", password: "" });
      setMostrarFormUsuario(false);
    }
  };

  /**
   * Maneja el envío del formulario de actualización de usuario
   * Procesa los cambios y actualiza la información en el sistema
   */
  const handleActualizarUsuario = async (e) => {
    e.preventDefault();
    const success = await actualizarUsuario(usuarioEditado.cedula, usuarioEditado);
    if (success) {
      setMostrarFormEditarUsuario(false);
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2><i className="bi bi-people"></i> Gestión de Usuarios</h2>
        <button 
          onClick={() => setMostrarFormUsuario(!mostrarFormUsuario)}
          className="btn-primary"
        >
          <i className="bi bi-person-plus"></i> Crear Usuario
        </button>
      </div>

      {/* Sección de búsqueda de usuarios por cédula */}
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            id="cedulaBusqueda"
            placeholder="Ingresa la cédula del usuario a buscar"
            style={{ flex: 1 }}
          />
          <button onClick={buscarUsuario} className="btn-secondary">
            <i className="bi bi-search"></i> Buscar
          </button>
        </div>
      </div>

      {/* Información del usuario encontrado en la búsqueda */}
      {usuarioSeleccionado && (
        <div style={{ padding: '20px 30px', background: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
          <h4 style={{ color: '#333', marginBottom: '15px' }}>
            <i className="bi bi-person-check" style={{ color: '#28a745', marginRight: '10px' }}></i>
            Usuario Registrado
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div>
              <strong style={{ color: '#333' }}>{usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}</strong>
              <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                Cédula: {usuarioSeleccionado.cedula}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => editarUsuario(usuarioSeleccionado)}
                className="btn-edit"
                title="Editar usuario"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button 
                onClick={() => eliminarUsuario(usuarioSeleccionado.cedula)}
                className="btn-delete"
                title="Eliminar usuario"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista desplegable de usuarios registrados */}
      <div className="users-list">
        <div 
          className="collapsible-header"
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
            padding: '15px',
            background: listaExpandida ? '#f8f9fa' : 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setListaExpandida(!listaExpandida)}
        >
          <h4 style={{ 
            color: '#333', 
            margin: 0, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }}>
            <i className="bi bi-person-lines-fill" style={{ color: '#667eea' }}></i>
            Lista de Usuarios ({usuarios.length})
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {!listaExpandida && usuarios.length > 0 && (
              <span style={{ 
                fontSize: '12px', 
                color: '#28a745', 
                background: '#e8f5e9', 
                padding: '4px 8px', 
                borderRadius: '12px',
                fontWeight: '600'
              }}>
                {usuarios.length} usuario{usuarios.length !== 1 ? 's' : ''} registrado{usuarios.length !== 1 ? 's' : ''}
              </span>
            )}
            <span style={{ fontSize: '14px', color: '#666' }}>
              {listaExpandida ? 'Ocultar lista' : 'Ver lista completa'}
            </span>
            <i 
              className={`bi bi-chevron-${listaExpandida ? 'up' : 'down'}`}
              style={{ 
                fontSize: '16px', 
                color: '#667eea',
                transition: 'transform 0.3s ease'
              }}
            ></i>
          </div>
        </div>

        {/* Contenido expandible de la lista de usuarios */}
        {listaExpandida && (
          <div 
            className="collapsible-content"
            style={{ 
              marginTop: '10px'
            }}
          >
            {usuarios.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {usuarios.map(usuario => (
                  <div key={usuario.cedula} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    background: 'white',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div>
                      <strong style={{ color: '#333' }}>{usuario.nombre} {usuario.apellido}</strong>
                      <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                        Cédula: {usuario.cedula}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => editarUsuario(usuario)}
                        style={{
                          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                        title="Editar usuario"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button 
                        onClick={() => eliminarUsuario(usuario.cedula)}
                        style={{
                          background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                        title="Eliminar usuario"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>No hay usuarios registrados</p>
            )}
          </div>
        )}
      </div>

      {/* Modal para crear nuevo usuario */}
      {mostrarFormUsuario && (
        <div className="form-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h3>Crear Nuevo Usuario</h3>
              <button 
                onClick={() => setMostrarFormUsuario(false)}
                className="btn-close"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
            <form onSubmit={handleCrearUsuario}>
              <div className="form-group">
                <label>Cédula</label>
                <input
                  type="text"
                  value={nuevoUsuario.cedula}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, cedula: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={nuevoUsuario.nombre}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  value={nuevoUsuario.apellido}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, apellido: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={nuevoUsuario.password}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Creando..." : "Crear Usuario"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setMostrarFormUsuario(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar usuario existente */}
      {mostrarFormEditarUsuario && (
        <div className="form-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h3>Editar Usuario</h3>
              <button 
                onClick={() => setMostrarFormEditarUsuario(false)}
                className="btn-close"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
            <form onSubmit={handleActualizarUsuario}>
              <div className="form-group">
                <label>Cédula</label>
                <input
                  type="text"
                  value={usuarioEditado.cedula}
                  disabled
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
                <small style={{ color: '#666' }}>La cédula no puede ser modificada</small>
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={usuarioEditado.nombre}
                  onChange={(e) => setUsuarioEditado({...usuarioEditado, nombre: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  value={usuarioEditado.apellido}
                  onChange={(e) => setUsuarioEditado({...usuarioEditado, apellido: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña (opcional)</label>
                <input
                  type="password"
                  value={usuarioEditado.password}
                  onChange={(e) => setUsuarioEditado({...usuarioEditado, password: e.target.value})}
                  placeholder="Dejar vacío para mantener la actual"
                />
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Actualizando..." : "Actualizar Usuario"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setMostrarFormEditarUsuario(false)}
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

export default UserManagement;
