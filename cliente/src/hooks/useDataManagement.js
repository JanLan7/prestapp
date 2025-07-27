import { useState } from 'react';
import ApiService from '../services/ApiService';

// Hook personalizado para manejar la lógica de gestión de datos
export const useDataManagement = (token, setMensaje, setLoading) => {
  // Estados
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [elementos, setElementos] = useState([]);
  const [todosLosElementos, setTodosLosElementos] = useState([]);
  const [alquileres, setAlquileres] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [miHistorial, setMiHistorial] = useState([]);
  const [misPrestamos, setMisPrestamos] = useState([]);

  // Funciones de obtención de datos
  const obtenerUsuarios = async () => {
    try {
      const data = await ApiService.getUsers(token);
      setUsuarios(data);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const data = await ApiService.getCategories(token);
      setCategorias(data);
    } catch (error) {
      console.error("Error obteniendo categorías:", error);
    }
  };

  const obtenerElementos = async (categoriaId) => {
    try {
      const data = await ApiService.getItemsByCategory(categoriaId, token);
      setElementos(data);
    } catch (error) {
      console.error("Error obteniendo elementos:", error);
    }
  };

  const obtenerTodosLosElementos = async () => {
    try {
      const data = await ApiService.getAllItems(token);
      setTodosLosElementos(data);
    } catch (error) {
      console.error("Error obteniendo todos los elementos:", error);
    }
  };

  const obtenerAlquileres = async () => {
    try {
      const data = await ApiService.getActiveRentals(token);
      setAlquileres(data);
    } catch (error) {
      console.error('Error al obtener alquileres:', error);
    }
  };

  const obtenerRegistros = async (fechaInicio = "", fechaFin = "") => {
    try {
      setLoading(true);
      const data = await ApiService.getRecords(token, fechaInicio, fechaFin);
      setRegistros(data);
    } catch (error) {
      console.error("Error obteniendo registros:", error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerDatosUsuario = async () => {
    try {
      const data = await ApiService.getUserProfile(token);
      setDatosUsuario(data);
      console.log("👤 Datos del usuario obtenidos:", data);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };

  const obtenerMiHistorial = async (fecha = "") => {
    try {
      const data = await ApiService.getUserHistory(token, fecha);
      setMiHistorial(data);
      console.log("📋 Mi historial obtenido:", data.length, "registros");
    } catch (error) {
      console.error("Error al obtener mi historial:", error);
      setMensaje("❌ Error de conexión al obtener mi historial");
    }
  };

  const obtenerMisPrestamos = async () => {
    try {
      const data = await ApiService.getUserLoans(token);
      setMisPrestamos(data);
      console.log("📦 Mis préstamos obtenidos:", data.length, "items");
    } catch (error) {
      console.error("Error al obtener mis préstamos:", error);
      setMensaje("❌ Error de conexión al obtener mis préstamos");
    }
  };

  // Funciones de gestión de usuarios
  const buscarUsuario = async (cedula) => {
    setLoading(true);
    try {
      const data = await ApiService.searchUser(cedula, token);
      return data;
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const crearUsuarioAdmin = async (userData) => {
    setLoading(true);
    try {
      const { res, data } = await ApiService.createUser(userData, token);
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        obtenerUsuarios();
        return true;
      } else {
        setMensaje("❌ " + (data.error || "Error al crear usuario"));
        return false;
      }
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const actualizarUsuario = async (cedula, userData) => {
    setLoading(true);
    try {
      const { res, data } = await ApiService.updateUser(cedula, userData, token);
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        obtenerUsuarios();
        return true;
      } else {
        setMensaje("❌ " + (data.error || "Error al actualizar usuario"));
        return false;
      }
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (cedula) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      return false;
    }

    setLoading(true);
    try {
      const { res, data } = await ApiService.deleteUser(cedula, token);
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        obtenerUsuarios();
        return true;
      } else {
        setMensaje("❌ " + (data.error || "Error al eliminar usuario"));
        return false;
      }
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Funciones de gestión de categorías
  const crearCategoria = async (categoryData) => {
    setLoading(true);
    try {
      const { res, data } = await ApiService.createCategory(categoryData, token);
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        obtenerCategorias();
        return true;
      } else {
        setMensaje("❌ " + (data.error || "Error al crear categoría"));
        return false;
      }
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const actualizarCategoria = async (categoryId, categoryData) => {
    setLoading(true);
    try {
      const { res, data } = await ApiService.updateCategory(categoryId, categoryData, token);
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        obtenerCategorias();
        return true;
      } else {
        setMensaje("❌ " + (data.error || "Error al actualizar categoría"));
        return false;
      }
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const eliminarCategoria = async (categoryId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta categoría? Se eliminarán también todos sus elementos.")) {
      return false;
    }

    setLoading(true);
    try {
      const { res, data } = await ApiService.deleteCategory(categoryId, token);
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        obtenerCategorias();
        obtenerTodosLosElementos();
        return true;
      } else {
        setMensaje("❌ " + (data.error || "Error al eliminar categoría"));
        return false;
      }
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Funciones de gestión de elementos
  const crearElemento = async (elementData) => {
    setLoading(true);
    try {
      const { res, data } = await ApiService.createElement(elementData, token);
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        obtenerTodosLosElementos();
        return true;
      } else {
        setMensaje("❌ " + (data.error || "Error al crear elemento"));
        return false;
      }
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const actualizarElemento = async (elementId, elementData) => {
    setLoading(true);
    try {
      const { res, data } = await ApiService.updateElement(elementId, elementData, token);
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        obtenerTodosLosElementos();
        return true;
      } else {
        setMensaje("❌ " + (data.error || "Error al actualizar elemento"));
        return false;
      }
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const eliminarElemento = async (elementId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      return false;
    }

    setLoading(true);
    try {
      const { res, data } = await ApiService.deleteElement(elementId, token);
      if (res.ok) {
        setMensaje("✅ " + data.msg);
        obtenerTodosLosElementos();
        return true;
      } else {
        setMensaje("❌ " + (data.error || "Error al eliminar elemento"));
        return false;
      }
    } catch (error) {
      setMensaje("❌ Error de conexión: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Funciones de alquiler
  const confirmarAlquiler = async (elementId, cedula) => {
    setLoading(true);
    try {
      const { res, data } = await ApiService.rentElement(elementId, cedula, token);
      if (res.ok) {
        setMensaje(`✅ ${data.msg}`);
        // Actualizar todos los datos relevantes
        obtenerTodosLosElementos();
        obtenerAlquileres();
        obtenerRegistros();
        return true;
      } else {
        setMensaje(`❌ ${data.error}`);
        return false;
      }
    } catch (error) {
      console.error('Error al alquilar elemento:', error);
      setMensaje('❌ Error de conexión al alquilar elemento');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const devolverElemento = async (elementId) => {
    if (!window.confirm('¿Estás seguro de que quieres devolver este elemento?')) {
      return false;
    }

    setLoading(true);
    try {
      const { res, data } = await ApiService.returnElement(elementId, token);
      if (res.ok) {
        setMensaje(`✅ ${data.msg}`);
        // Actualizar todos los datos relevantes
        obtenerTodosLosElementos();
        obtenerAlquileres();
        obtenerRegistros();
        return true;
      } else {
        setMensaje(`❌ ${data.error}`);
        return false;
      }
    } catch (error) {
      console.error('Error al devolver elemento:', error);
      setMensaje('❌ Error de conexión al devolver elemento');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estados
    usuarios,
    categorias,
    elementos,
    todosLosElementos,
    alquileres,
    registros,
    datosUsuario,
    miHistorial,
    misPrestamos,
    // Funciones de obtención
    obtenerUsuarios,
    obtenerCategorias,
    obtenerElementos,
    obtenerTodosLosElementos,
    obtenerAlquileres,
    obtenerRegistros,
    obtenerDatosUsuario,
    obtenerMiHistorial,
    obtenerMisPrestamos,
    // Funciones de gestión de usuarios
    buscarUsuario,
    crearUsuarioAdmin,
    actualizarUsuario,
    eliminarUsuario,
    // Funciones de gestión de categorías
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    // Funciones de gestión de elementos
    crearElemento,
    actualizarElemento,
    eliminarElemento,
    // Funciones de alquiler
    confirmarAlquiler,
    devolverElemento
  };
};
