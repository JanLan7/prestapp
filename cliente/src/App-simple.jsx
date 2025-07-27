/**
 * Componente principal de la aplicación de gestión de préstamos
 * Maneja la autenticación, enrutamiento y estado global de la aplicación
 */
import { useEffect, useState } from "react";
import './App.css'
import Auth from './components/Auth';
import UserDashboardComplete from './components/UserDashboardComplete';
import AdminDashboard from './components/AdminDashboard';
import ApiService from './services/ApiService';
import { useDataManagement } from './hooks/useDataManagement';
import { useUIState } from './hooks/useUIState';

function App() {
  // Estados principales de autenticación y navegación
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [rol, setRol] = useState(localStorage.getItem("rol") || "");
  const [vistaActual, setVistaActual] = useState("login");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook personalizado para gestión de datos del sistema
  const {
    usuarios, categorias, elementos, todosLosElementos, alquileres, registros,
    datosUsuario, miHistorial, misPrestamos,
    obtenerUsuarios, obtenerCategorias, obtenerElementos, obtenerTodosLosElementos,
    obtenerAlquileres, obtenerRegistros, obtenerDatosUsuario, obtenerMiHistorial, obtenerMisPrestamos,
    buscarUsuario, crearUsuarioAdmin, actualizarUsuario, eliminarUsuario,
    crearCategoria, actualizarCategoria, eliminarCategoria,
    crearElemento, actualizarElemento, eliminarElemento, confirmarAlquiler, devolverElemento
  } = useDataManagement(token, setMensaje, setLoading);

  // Hook personalizado para gestión del estado de la interfaz de usuario
  const uiState = useUIState();

  // Estados específicos para filtrado de registros de movimientos
  const [mostrarRegistros, setMostrarRegistros] = useState(false);
  const [fechaInicioRegistros, setFechaInicioRegistros] = useState("");
  const [fechaFinRegistros, setFechaFinRegistros] = useState("");

  // Configuración para limpiar mensajes automáticamente después de 4 segundos
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  // Verificación y restauración de sesión activa al cargar la aplicación
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    const rolGuardado = localStorage.getItem("rol");
    
    if (tokenGuardado && rolGuardado) {
      setToken(tokenGuardado);
      setRol(rolGuardado);
      setVistaActual(rolGuardado === "admin" ? "admin" : "usuario");
      console.log("✅ Sesión restaurada:", rolGuardado);
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  // Cargar datos al iniciar según el rol
  useEffect(() => {
    if (token && rol) {
      obtenerCategorias();
      obtenerTodosLosElementos();
      if (rol === "admin") {
        obtenerUsuarios();
        obtenerAlquileres();
      } else if (rol === "usuario") {
        obtenerDatosUsuario();
        obtenerMiHistorial();
        obtenerMisPrestamos();
      }
    }
  }, [token, rol]);



  // Función para filtrar historial por fecha
  const filtrarHistorialPorFecha = () => {
    if (uiState.fechaFiltroUsuario) {
      obtenerMiHistorial(uiState.fechaFiltroUsuario);
      setMensaje(`✅ Mostrando registros del ${new Date(uiState.fechaFiltroUsuario).toLocaleDateString('es-PY', { timeZone: 'America/Asuncion' })}`);
    } else {
      obtenerMiHistorial();
      setMensaje("✅ Mostrando todo el historial");
    }
  };

  // LOGIN Y REGISTRO
  const manejarAutenticacion = async (cedula, password, nombre = "", apellido = "", email = "", telefono = "", tipo = "login") => {
    setLoading(true);
    try {
      const endpoint = tipo === "login" ? "login" : "register";
      const body = tipo === "login" 
        ? { cedula, password }
        : { cedula, password, nombre, apellido, email, telefono };

      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        if (tipo === "login") {
          setToken(data.token);
          setRol(data.rol);
          localStorage.setItem("token", data.token);
          localStorage.setItem("rol", data.rol);
          setVistaActual(data.rol === "admin" ? "admin" : "usuario");
          setMensaje("Login exitoso");
        } else {
          setMensaje("Usuario registrado exitosamente");
        }
      } else {
        setMensaje(data.error || `Error en ${tipo === "login" ? "el login" : "el registro"}`);
      }
    } catch (error) {
      setMensaje("Error de conexión");
    }
    setLoading(false);
  };

  // Logout
  const logout = () => {
    setToken("");
    setRol("");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setVistaActual("login");
    setMensaje("Sesión cerrada");
    uiState.setCategoriaSeleccionada(null);
  };

  // === FUNCIONES MANEJADORAS DE ELEMENTOS ===
  
  /**
   * Prepara el formulario de alquiler para un elemento específico
   */
  const alquilarElemento = async (elemento) => {
    uiState.setElementoParaAlquilar(elemento);
    uiState.setMostrarFormAlquiler(true);
    uiState.setCedulaAlquiler("");
  };

  /**
   * Maneja la devolución de un elemento alquilado
   * Actualiza la lista de elementos si hay una categoría seleccionada
   */
  const handleDevolverElemento = async (elementoId) => {
    const success = await devolverElemento(elementoId);
    if (success && uiState.categoriaSeleccionada) {
      obtenerElementos(uiState.categoriaSeleccionada._id);
    }
  };

  /**
   * Maneja la creación de un nuevo elemento
   * Resetea el formulario y actualiza la lista tras la creación exitosa
   */
  const handleCrearElemento = async (elementData) => {
    const success = await crearElemento(elementData);
    
    if (success) {
      uiState.setNuevoElemento({ nombre: "", descripcion: "" });
      uiState.setMostrarFormAgregarElemento(false);
      if (uiState.categoriaSeleccionada) {
        obtenerElementos(uiState.categoriaSeleccionada._id);
      }
    }
  };

  /**
   * Prepara el formulario de edición con los datos del elemento seleccionado
   */
  const editarElemento = (elemento) => {
    uiState.setElementoEditado({
      _id: elemento._id,
      nombre: elemento.nombre,
      descripcion: elemento.descripcion,
      categoria: elemento.categoria._id || elemento.categoria
    });
    uiState.setMostrarFormEditarElemento(true);
  };

  /**
   * Maneja la actualización de un elemento existente
   * Cierra el formulario y actualiza la lista tras la edición exitosa
   */

  const handleActualizarElemento = async (e) => {
    e.preventDefault();
    const success = await actualizarElemento(uiState.elementoEditado._id, {
      nombre: uiState.elementoEditado.nombre,
      descripcion: uiState.elementoEditado.descripcion,
      categoria: uiState.elementoEditado.categoria
    });
    
    if (success) {
      uiState.setMostrarFormEditarElemento(false);
      if (uiState.categoriaSeleccionada) {
        obtenerElementos(uiState.categoriaSeleccionada._id);
      }
    }
  };

  /**
   * Maneja la eliminación de un elemento con confirmación del usuario
   */
  const handleEliminarElemento = async (elementId, nombreElemento) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${nombreElemento}"?`)) {
      const success = await eliminarElemento(elementId);
      if (success && uiState.categoriaSeleccionada) {
        obtenerElementos(uiState.categoriaSeleccionada._id);
      }
    }
  };

  // === FUNCIONES DE FILTRADO Y BÚSQUEDA ===
  
  /**
   * Aplica filtros predefinidos de fecha para los registros de movimientos
   * Soporta filtros: hoy, ayer, semana, mes
   */
  const aplicarFiltroFecha = (tipoFiltro) => {
    const hoy = new Date();
    let fechaInicio, fechaFin;

    // Utilidad para formatear fechas en formato ISO local (YYYY-MM-DD)
    const formatearFechaLocal = (fecha) => {
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0');
      const day = String(fecha.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    switch (tipoFiltro) {
      case 'hoy':
        fechaInicio = fechaFin = formatearFechaLocal(hoy);
        break;
      case 'ayer':
        const ayer = new Date(hoy);
        ayer.setDate(ayer.getDate() - 1);
        fechaInicio = fechaFin = formatearFechaLocal(ayer);
        break;
      case 'semana':
        const inicioSemana = new Date(hoy);
        inicioSemana.setDate(hoy.getDate() - hoy.getDay());
        fechaInicio = formatearFechaLocal(inicioSemana);
        fechaFin = formatearFechaLocal(hoy);
        break;
      case 'mes':
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        fechaInicio = formatearFechaLocal(inicioMes);
        fechaFin = formatearFechaLocal(hoy);
        break;
      default:
        return;
    }

    setFechaInicioRegistros(fechaInicio);
    setFechaFinRegistros(fechaFin);
    obtenerRegistros(fechaInicio, fechaFin);
  };

  const aplicarFiltroPersonalizado = () => {
    if (fechaInicioRegistros && fechaFinRegistros) {
      obtenerRegistros(fechaInicioRegistros, fechaFinRegistros);
    } else {
      setMensaje("Selecciona ambas fechas para el filtro personalizado");
    }
  };

  // Funciones para gestión de usuarios con wrapper
  const handleBuscarUsuario = async () => {
    const cedula = document.getElementById("cedulaBusqueda").value.trim();
    if (!cedula) {
      setMensaje("Ingresa una cédula para buscar");
      return;
    }

    const usuario = await buscarUsuario(cedula);
    if (usuario) {
      uiState.setUsuarioSeleccionado(usuario);
      setMensaje(`Usuario encontrado: ${usuario.nombre} ${usuario.apellido}`);
    }
  };

  const handleCrearUsuarioAdmin = async (userData) => {
    const dataToUse = userData || uiState.nuevoUsuario;
    
    const success = await crearUsuarioAdmin(dataToUse);
    if (success) {
      uiState.setNuevoUsuario({ cedula: "", nombre: "", apellido: "", password: "" });
      uiState.setMostrarFormUsuario(false);
    }
    return success;
  };

  const editarUsuario = (usuario) => {
    uiState.setUsuarioEditado({
      cedula: usuario.cedula,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      password: ""
    });
    uiState.setMostrarFormEditarUsuario(true);
  };

  const handleActualizarUsuario = async (e) => {
    e.preventDefault();
    const usuarioActualizado = await actualizarUsuario(uiState.usuarioEditado.cedula, {
      nombre: uiState.usuarioEditado.nombre,
      apellido: uiState.usuarioEditado.apellido,
      password: uiState.usuarioEditado.password || undefined
    });
    
    if (usuarioActualizado) {
      uiState.setMostrarFormEditarUsuario(false);
      if (uiState.usuarioSeleccionado && uiState.usuarioSeleccionado.cedula === uiState.usuarioEditado.cedula) {
        uiState.setUsuarioSeleccionado({
          ...uiState.usuarioSeleccionado,
          nombre: uiState.usuarioEditado.nombre,
          apellido: uiState.usuarioEditado.apellido
        });
      }
    }
  };

  const handleEliminarUsuario = async (cedula) => {
    const success = await eliminarUsuario(cedula);
    if (success && uiState.usuarioSeleccionado && uiState.usuarioSeleccionado.cedula === cedula) {
      uiState.setUsuarioSeleccionado(null);
    }
  };

  // Funciones para categorías
  const handleCrearCategoria = async (e) => {
    e.preventDefault();
    const success = await crearCategoria(uiState.nuevaCategoria);
    if (success) {
      uiState.setNuevaCategoria({ nombre: "", descripcion: "", icono: "�" });
      uiState.setMostrarFormCategoria(false);
    }
  };

  const editarCategoria = (categoria) => {
    uiState.setCategoriaEditada({
      _id: categoria._id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      icono: categoria.icono
    });
    uiState.setMostrarFormEditarCategoria(true);
  };

  const handleActualizarCategoria = async (e) => {
    e.preventDefault();
    const success = await actualizarCategoria(uiState.categoriaEditada._id, {
      nombre: uiState.categoriaEditada.nombre,
      descripcion: uiState.categoriaEditada.descripcion,
      icono: uiState.categoriaEditada.icono
    });
    
    if (success) {
      uiState.setMostrarFormEditarCategoria(false);
      if (uiState.categoriaSeleccionada && uiState.categoriaSeleccionada._id === uiState.categoriaEditada._id) {
        uiState.setCategoriaSeleccionada({
          ...uiState.categoriaSeleccionada,
          nombre: uiState.categoriaEditada.nombre,
          descripcion: uiState.categoriaEditada.descripcion,
          icono: uiState.categoriaEditada.icono
        });
      }
    }
  };

  const handleEliminarCategoria = async (categoriaId) => {
    const success = await eliminarCategoria(categoriaId);
    if (success && uiState.categoriaSeleccionada && uiState.categoriaSeleccionada._id === categoriaId) {
      uiState.setCategoriaSeleccionada(null);
    }
  };

  // Funciones del selector de emojis
  const abrirSelectorEmojis = () => {
    uiState.setMostrarSelectorEmojis(true);
  };

  const seleccionarEmoji = (emoji) => {
    if (uiState.mostrarFormCategoria) {
      uiState.setNuevaCategoria({ ...uiState.nuevaCategoria, icono: emoji });
    } else if (uiState.mostrarFormEditarCategoria) {
      uiState.setCategoriaEditada({ ...uiState.categoriaEditada, icono: emoji });
    }
    uiState.setMostrarSelectorEmojis(false);
  };

  // COMPONENTES JSX

  // Vista de Login/Register
  if (vistaActual === "login" || vistaActual === "register") {
    return (
      <Auth 
        onLogin={manejarAutenticacion}
        mensaje={mensaje}
        loading={loading}
      />
    );
  }

  // Dashboard Admin
  if (rol === "admin") {
    return (
      <AdminDashboard 
        // Props del header
        logout={logout}
        mensaje={mensaje}
        
        // Props de datos
        usuarios={usuarios}
        categorias={categorias}
        elementos={elementos}
        todosLosElementos={todosLosElementos}
        alquileres={alquileres}
        registros={registros}
        
        // Props del hook de UI
        uiState={uiState}
        
        // Props de funciones de datos
        obtenerElementos={obtenerElementos}
        obtenerAlquileres={obtenerAlquileres}
        
        // Props de funciones wrapper
        handleBuscarUsuario={handleBuscarUsuario}
        handleCrearUsuarioAdmin={handleCrearUsuarioAdmin}
        editarUsuario={editarUsuario}
        handleActualizarUsuario={handleActualizarUsuario}
        handleEliminarUsuario={handleEliminarUsuario}
        handleCrearCategoria={handleCrearCategoria}
        editarCategoria={editarCategoria}
        handleActualizarCategoria={handleActualizarCategoria}
        handleEliminarCategoria={handleEliminarCategoria}
        alquilarElemento={alquilarElemento}
        handleDevolverElemento={handleDevolverElemento}
        handleCrearElemento={handleCrearElemento}
        editarElemento={editarElemento}
        actualizarElemento={actualizarElemento}
        handleActualizarElemento={handleActualizarElemento}
        handleEliminarElemento={handleEliminarElemento}
        handleConfirmarAlquiler={confirmarAlquiler}
        abrirSelectorEmojis={abrirSelectorEmojis}
        seleccionarEmoji={seleccionarEmoji}
        aplicarFiltroFecha={aplicarFiltroFecha}
        aplicarFiltroPersonalizado={aplicarFiltroPersonalizado}
        
        // Props de loading
        loading={loading}
      />
    );
  }

  // Dashboard Usuario
  if (rol === "usuario") {
    return (
      <UserDashboardComplete 
        datosUsuario={datosUsuario}
        mensaje={mensaje}
        logout={logout}
        misPrestamos={misPrestamos}
        obtenerMisPrestamos={obtenerMisPrestamos}
        miHistorial={miHistorial}
        fechaFiltroUsuario={uiState.fechaFiltroUsuario}
        setFechaFiltroUsuario={uiState.setFechaFiltroUsuario}
        filtrarHistorialPorFecha={filtrarHistorialPorFecha}
      />
    );
  }

  return null;
}

export default App;
