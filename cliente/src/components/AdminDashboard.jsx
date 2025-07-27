/**
 * Componente principal del panel de administración
 * Centraliza todas las funcionalidades administrativas del sistema
 * incluyendo gestión de usuarios, categorías, elementos y alquileres
 */
import StatsGrid from './StatsGrid';
import MovementHistory from './MovementHistory';
import UserManagement from './UserManagement';
import CategoryManagement from './CategoryManagement';
import ElementsManagement from './ElementsManagement';
import ActiveRentals from './ActiveRentals';
import RentalForm from './RentalForm';
import AddElementForm from './AddElementForm';
import EditElementForm from './EditElementForm';
import EmojiSelector from './EmojiSelector';
import AdminDashboardHeader from './AdminDashboardHeader';

/**
 * Panel principal de administración que organiza todas las secciones del sistema
 * @param {Object} props - Propiedades del componente incluyendo datos, handlers y estados UI
 */
function AdminDashboard({
  // Props del header - Funciones de navegación y mensajería
  logout,
  mensaje,
  
  // Props de datos - Arrays con información del sistema
  usuarios,
  categorias,
  elementos,
  todosLosElementos,
  alquileres,
  registros,
  
  // Props del hook de UI - Estados de la interfaz de usuario
  uiState,
  
  // Props de funciones de datos - Operaciones de obtención de información
  obtenerElementos,
  obtenerAlquileres,
  
  // Props de funciones wrapper - Manejadores de eventos y operaciones CRUD
  handleBuscarUsuario,
  handleCrearUsuarioAdmin,
  editarUsuario,
  handleActualizarUsuario,
  handleEliminarUsuario,
  handleCrearCategoria,
  editarCategoria,
  handleActualizarCategoria,
  handleEliminarCategoria,
  alquilarElemento,
  handleDevolverElemento,
  handleCrearElemento,
  editarElemento,
  actualizarElemento,
  handleActualizarElemento,
  handleEliminarElemento,
  handleConfirmarAlquiler,
  abrirSelectorEmojis,
  seleccionarEmoji,
  aplicarFiltroFecha,
  aplicarFiltroPersonalizado,
  
  // Props de loading - Estado de carga
  loading
}) {
  return (
    <div className="dashboard">
      {/* Header con información del usuario admin y opciones de logout */}
      <AdminDashboardHeader 
        logout={logout}
        mensaje={mensaje}
      />

      {/* Panel de estadísticas con contadores principales del sistema */}
      <StatsGrid 
        usuarios={usuarios}
        categorias={categorias}
        todosLosElementos={todosLosElementos}
        alquileres={alquileres}
        registros={registros}
        mostrarRegistros={uiState.mostrarRegistros}
        setMostrarRegistros={uiState.setMostrarRegistros}
        aplicarFiltroFecha={aplicarFiltroFecha}
      />

      {/* Historial de movimientos con filtros de fecha */}
      <MovementHistory 
        mostrarRegistros={uiState.mostrarRegistros}
        setMostrarRegistros={uiState.setMostrarRegistros}
        registros={registros}
        loading={loading}
        fechaInicioRegistros={uiState.fechaInicioRegistros}
        setFechaInicioRegistros={uiState.setFechaInicioRegistros}
        fechaFinRegistros={uiState.fechaFinRegistros}
        setFechaFinRegistros={uiState.setFechaFinRegistros}
        aplicarFiltroFecha={aplicarFiltroFecha}
        aplicarFiltroPersonalizado={aplicarFiltroPersonalizado}
      />

      {/* Sistema de gestión de usuarios con funcionalidades CRUD */}
      <UserManagement 
        usuarios={usuarios}
        mostrarFormUsuario={uiState.mostrarFormUsuario}
        setMostrarFormUsuario={uiState.setMostrarFormUsuario}
        nuevoUsuario={uiState.nuevoUsuario}
        setNuevoUsuario={uiState.setNuevoUsuario}
        usuarioSeleccionado={uiState.usuarioSeleccionado}
        setUsuarioSeleccionado={uiState.setUsuarioSeleccionado}
        mostrarFormEditarUsuario={uiState.mostrarFormEditarUsuario}
        setMostrarFormEditarUsuario={uiState.setMostrarFormEditarUsuario}
        usuarioEditado={uiState.usuarioEditado}
        setUsuarioEditado={uiState.setUsuarioEditado}
        loading={loading}
        crearUsuarioAdmin={handleCrearUsuarioAdmin}
        buscarUsuario={handleBuscarUsuario}
        editarUsuario={editarUsuario}
        actualizarUsuario={handleActualizarUsuario}
        eliminarUsuario={handleEliminarUsuario}
      />

      {/* Gestión de categorías con selector de emojis personalizado */}
      <CategoryManagement 
        categorias={categorias}
        categoriaSeleccionada={uiState.categoriaSeleccionada}
        setCategoriaSeleccionada={uiState.setCategoriaSeleccionada}
        obtenerElementos={obtenerElementos}
        mostrarFormCategoria={uiState.mostrarFormCategoria}
        setMostrarFormCategoria={uiState.setMostrarFormCategoria}
        nuevaCategoria={uiState.nuevaCategoria}
        setNuevaCategoria={uiState.setNuevaCategoria}
        mostrarFormEditarCategoria={uiState.mostrarFormEditarCategoria}
        setMostrarFormEditarCategoria={uiState.setMostrarFormEditarCategoria}
        categoriaEditada={uiState.categoriaEditada}
        setCategoriaEditada={uiState.setCategoriaEditada}
        loading={loading}
        crearCategoria={handleCrearCategoria}
        editarCategoria={editarCategoria}
        actualizarCategoria={handleActualizarCategoria}
        eliminarCategoria={handleEliminarCategoria}
        abrirSelectorEmojis={abrirSelectorEmojis}
      />

      {/* Gestión de elementos por categoría con operaciones CRUD */}
      <ElementsManagement 
        categoriaSeleccionada={uiState.categoriaSeleccionada}
        categorias={categorias}
        elementos={elementos}
        setMostrarFormAgregarElemento={uiState.setMostrarFormAgregarElemento}
        alquilarElemento={alquilarElemento}
        devolverElemento={handleDevolverElemento}
        editarElemento={editarElemento}
        eliminarElemento={handleEliminarElemento}
        mostrarFormAgregarElemento={uiState.mostrarFormAgregarElemento}
        nuevoElemento={uiState.nuevoElemento}
        setNuevoElemento={uiState.setNuevoElemento}
        crearElemento={handleCrearElemento}
        loading={loading}
      />

      {/* Lista de alquileres activos con opción de devolución */}
      <ActiveRentals 
        alquileres={alquileres}
        obtenerAlquileres={obtenerAlquileres}
        devolverElemento={handleDevolverElemento}
      />

      {/* Formulario modal para procesar nuevos alquileres */}
      <RentalForm 
        mostrarFormAlquiler={uiState.mostrarFormAlquiler}
        elementoParaAlquilar={uiState.elementoParaAlquilar}
        setMostrarFormAlquiler={uiState.setMostrarFormAlquiler}
        setElementoParaAlquilar={uiState.setElementoParaAlquilar}
        cedulaAlquiler={uiState.cedulaAlquiler}
        setCedulaAlquiler={uiState.setCedulaAlquiler}
        confirmarAlquiler={handleConfirmarAlquiler}
        obtenerElementos={obtenerElementos}
        categoriaSeleccionada={uiState.categoriaSeleccionada}
        loading={loading}
      />

      {/* Formulario modal para agregar nuevos elementos */}
      <AddElementForm 
        mostrarFormAgregarElemento={uiState.mostrarFormAgregarElemento}
        categoriaSeleccionada={uiState.categoriaSeleccionada}
        setMostrarFormAgregarElemento={uiState.setMostrarFormAgregarElemento}
        nuevoElemento={uiState.nuevoElemento}
        setNuevoElemento={uiState.setNuevoElemento}
        crearElemento={handleCrearElemento}
        loading={loading}
      />

      {/* Formulario modal para editar elementos existentes */}
      <EditElementForm 
        mostrarFormEditarElemento={uiState.mostrarFormEditarElemento}
        categoriaSeleccionada={uiState.categoriaSeleccionada}
        categorias={categorias}
        setMostrarFormEditarElemento={uiState.setMostrarFormEditarElemento}
        elementoEditado={uiState.elementoEditado}
        setElementoEditado={uiState.setElementoEditado}
        actualizarElemento={actualizarElemento}
        obtenerElementos={obtenerElementos}
        loading={loading}
      />

      {/* Selector de emojis para iconos de categorías */}
      <EmojiSelector 
        mostrarSelectorEmojis={uiState.mostrarSelectorEmojis}
        setMostrarSelectorEmojis={uiState.setMostrarSelectorEmojis}
        categoriaEmojiSeleccionada={uiState.categoriaEmojiSeleccionada}
        setCategoriaEmojiSeleccionada={uiState.setCategoriaEmojiSeleccionada}
        onSeleccionarEmoji={seleccionarEmoji}
      />
    </div>
  );
}

export default AdminDashboard;
