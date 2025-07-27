/**
 * Servicio centralizado para manejar todas las comunicaciones con la API REST
 * Incluye métodos para autenticación, gestión de usuarios, categorías, elementos y alquileres
 */
import { API_URL } from '../config/config.js';

const API_BASE = `${API_URL}/api`;

class ApiService {
  /**
   * Genera headers estándar para peticiones autenticadas
   * @param {string} token - Token JWT de autenticación
   * @returns {object} Headers configurados para la petición
   */
  static getHeaders(token) {
    return {
      "Content-Type": "application/json",
      Authorization: token,
    };
  }

  // === MÉTODOS DE AUTENTICACIÓN ===
  
  /**
   * Maneja autenticación de usuarios (login y registro)
   * @param {string} cedula - Número de cédula del usuario
   * @param {string} password - Contraseña del usuario
   * @param {string} nombre - Nombre (solo para registro)
   * @param {string} apellido - Apellido (solo para registro)
   * @param {string} email - Email (solo para registro)
   * @param {string} telefono - Teléfono (solo para registro)
   * @param {string} tipo - Tipo de operación: "login" o "register"
   * @returns {Promise<object>} Respuesta del servidor con token y datos del usuario
   */
  static async authenticate(cedula, password, nombre = "", apellido = "", email = "", telefono = "", tipo = "login") {
    const endpoint = tipo === "login" ? "login" : "register";
    const body = tipo === "login" 
      ? { cedula, password }
      : { cedula, password, nombre, apellido, email, telefono };

    const res = await fetch(`${API_BASE}/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return res.json();
  }

  // === MÉTODOS DE GESTIÓN DE USUARIOS ===
  
  /**
   * Obtiene la lista completa de usuarios registrados (solo administradores)
   */
  static async getUsers(token) {
    const res = await fetch(`${API_BASE}/auth/usuarios`, {
      headers: { Authorization: token }
    });
    return res.json();
  }

  /**
   * Busca un usuario específico por su número de cédula
   * @param {string} cedula - Número de cédula a buscar
   * @param {string} token - Token de autenticación
   * @returns {Promise<object>} Datos del usuario encontrado
   * @throws {Error} Si el usuario no existe
   */
  static async searchUser(cedula, token) {
    const res = await fetch(`${API_BASE}/auth/usuario/${cedula}`, {
      headers: { Authorization: token }
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.error || "Usuario no encontrado");
    }
  }

  /**
   * Crea un nuevo usuario en el sistema (solo administradores)
   * @param {object} userData - Datos del usuario a crear
   * @param {string} token - Token de autenticación de administrador
   * @returns {Promise<object>} Resultado de la operación y datos del usuario creado
   */
  static async createUser(userData, token) {
    const res = await fetch(`${API_BASE}/auth/crear-usuario`, {
      method: "POST",
      headers: this.getHeaders(token),
      body: JSON.stringify(userData)
    });
    return { res, data: await res.json() };
  }

  /**
   * Actualiza los datos de un usuario existente (solo administradores)
   * @param {string} cedula - Cédula del usuario a actualizar
   * @param {object} userData - Nuevos datos del usuario
   * @param {string} token - Token de autenticación de administrador
   * @returns {Promise<object>} Resultado de la operación
   */
  static async updateUser(cedula, userData, token) {
    const res = await fetch(`${API_BASE}/auth/actualizar-usuario/${cedula}`, {
      method: "PUT",
      headers: this.getHeaders(token),
      body: JSON.stringify(userData)
    });
    return { res, data: await res.json() };
  }

  /**
   * Elimina un usuario del sistema (solo administradores)
   * @param {string} cedula - Cédula del usuario a eliminar
   * @param {string} token - Token de autenticación de administrador
   * @returns {Promise<object>} Resultado de la operación
   */
  static async deleteUser(cedula, token) {
    const res = await fetch(`${API_BASE}/auth/eliminar-usuario/${cedula}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });
    return { res, data: await res.json() };
  }

  /**
   * Obtiene el perfil del usuario autenticado
   * @param {string} token - Token de autenticación del usuario
   * @returns {Promise<object>} Datos del perfil del usuario
   */
  static async getUserProfile(token) {
    const res = await fetch(`${API_BASE}/auth/perfil`, {
      headers: { Authorization: token }
    });
    return res.json();
  }

  // === MÉTODOS DE GESTIÓN DE CATEGORÍAS ===
  
  /**
   * Obtiene todas las categorías disponibles en el sistema
   * @param {string} token - Token de autenticación
   * @returns {Promise<object>} Lista de categorías
   */
  static async getCategories(token) {
    const res = await fetch(`${API_BASE}/categories`, {
      headers: { Authorization: token }
    });
    return res.json();
  }

  /**
   * Crea una nueva categoría en el sistema (solo administradores)
   * @param {object} categoryData - Datos de la categoría (nombre, descripción)
   * @param {string} token - Token de autenticación de administrador
   * @returns {Promise<object>} Resultado de la operación y datos de la categoría creada
   */
  static async createCategory(categoryData, token) {
    const res = await fetch(`${API_BASE}/categories/crear`, {
      method: "POST",
      headers: this.getHeaders(token),
      body: JSON.stringify(categoryData)
    });
    return { res, data: await res.json() };
  }

  /**
   * Actualiza una categoría existente (solo administradores)
   * @param {string} categoryId - ID de la categoría a actualizar
   * @param {object} categoryData - Nuevos datos de la categoría
   * @param {string} token - Token de autenticación de administrador
   * @returns {Promise<object>} Resultado de la operación
   */
  static async updateCategory(categoryId, categoryData, token) {
    const res = await fetch(`${API_BASE}/categories/actualizar/${categoryId}`, {
      method: "PUT",
      headers: this.getHeaders(token),
      body: JSON.stringify(categoryData)
    });
    return { res, data: await res.json() };
  }

  /**
   * Elimina una categoría del sistema (solo administradores)
   * @param {string} categoryId - ID de la categoría a eliminar
   * @param {string} token - Token de autenticación de administrador
   * @returns {Promise<object>} Resultado de la operación
   */
  static async deleteCategory(categoryId, token) {
    const res = await fetch(`${API_BASE}/categories/eliminar/${categoryId}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });
    return { res, data: await res.json() };
  }

  // === MÉTODOS DE GESTIÓN DE ELEMENTOS ===
  
  /**
   * Obtiene todos los elementos/instrumentos disponibles en el sistema
   * @param {string} token - Token de autenticación
   * @returns {Promise<object>} Lista completa de elementos
   */
  static async getAllItems(token) {
    const res = await fetch(`${API_BASE}/items`, {
      headers: { Authorization: token }
    });
    return res.json();
  }

  /**
   * Obtiene elementos filtrados por categoría específica
   * @param {string} categoryId - ID de la categoría a filtrar
   * @param {string} token - Token de autenticación
   * @returns {Promise<object>} Lista de elementos de la categoría especificada
   */
  static async getItemsByCategory(categoryId, token) {
    const res = await fetch(`${API_BASE}/items/categoria/${categoryId}`, {
      headers: { Authorization: token }
    });
    return res.json();
  }

  /**
   * Crea un nuevo elemento/instrumento en el sistema (solo administradores)
   * @param {object} elementData - Datos del elemento (nombre, categoría, estado, etc.)
   * @param {string} token - Token de autenticación de administrador
   * @returns {Promise<object>} Resultado de la operación y datos del elemento creado
   */
  static async createElement(elementData, token) {
    const res = await fetch(`${API_BASE}/items/crear`, {
      method: "POST",
      headers: this.getHeaders(token),
      body: JSON.stringify(elementData)
    });
    return { res, data: await res.json() };
  }

  /**
   * Actualiza un elemento existente (solo administradores)
   * @param {string} elementId - ID del elemento a actualizar
   * @param {object} elementData - Nuevos datos del elemento
   * @param {string} token - Token de autenticación de administrador
   * @returns {Promise<object>} Resultado de la operación
   */
  static async updateElement(elementId, elementData, token) {
    const res = await fetch(`${API_BASE}/items/actualizar/${elementId}`, {
      method: "PUT",
      headers: this.getHeaders(token),
      body: JSON.stringify(elementData)
    });
    return { res, data: await res.json() };
  }

  /**
   * Elimina un elemento del sistema (solo administradores)
   * @param {string} elementId - ID del elemento a eliminar
   * @param {string} token - Token de autenticación de administrador
   * @returns {Promise<object>} Resultado de la operación
   */
  static async deleteElement(elementId, token) {
    const res = await fetch(`${API_BASE}/items/eliminar/${elementId}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });
    return { res, data: await res.json() };
  }

  // Alquileres
  static async rentElement(elementId, cedula, token) {
    const res = await fetch(`${API_BASE}/items/alquilar-admin/${elementId}`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ cedula })
    });
    return { res, data: await res.json() };
  }

  static async returnElement(elementId, token) {
    const res = await fetch(`${API_BASE}/items/devolver/${elementId}`, {
      method: 'POST',
      headers: { Authorization: token }
    });
    return { res, data: await res.json() };
  }

  // === MÉTODOS DE GESTIÓN DE ALQUILERES ===
  
  /**
   * Obtiene todos los alquileres activos en el sistema
   * @param {string} token - Token de autenticación
   * @returns {Promise<object>} Lista de alquileres actualmente activos
   */
  static async getActiveRentals(token) {
    const res = await fetch(`${API_BASE}/items/alquileres`, {
      headers: { Authorization: token }
    });
    return res.json();
  }

  // === MÉTODOS DE GESTIÓN DE REGISTROS E HISTORIAL ===
  
  /**
   * Obtiene registros de movimientos con filtros opcionales de fecha
   * @param {string} token - Token de autenticación
   * @param {string} fechaInicio - Fecha inicial del filtro (formato YYYY-MM-DD)
   * @param {string} fechaFin - Fecha final del filtro (formato YYYY-MM-DD)
   * @returns {Promise<object>} Lista de registros filtrados por fecha
   */
  static async getRecords(token, fechaInicio = "", fechaFin = "") {
    let url = `${API_BASE}/items/registros`;
    if (fechaInicio && fechaFin) {
      url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    }
    const res = await fetch(url, {
      headers: { Authorization: token }
    });
    return res.json();
  }

  // === MÉTODOS DEL DASHBOARD DE USUARIO ===
  
  /**
   * Obtiene el historial de movimientos del usuario autenticado
   * @param {string} token - Token de autenticación del usuario
   * @param {string} fecha - Fecha específica para filtrar (formato YYYY-MM-DD)
   * @returns {Promise<object>} Historial de alquileres y devoluciones del usuario
   */
  static async getUserHistory(token, fecha = "") {
    let url = `${API_BASE}/user-dashboard/mi-historial`;
    if (fecha) {
      url += `?fecha=${fecha}`;
    }
    const res = await fetch(url, {
      headers: { Authorization: token }
    });
    return res.json();
  }

  /**
   * Obtiene los préstamos activos del usuario autenticado
   * @param {string} token - Token de autenticación del usuario
   * @returns {Promise<object>} Lista de elementos actualmente prestados al usuario
   */
  static async getUserLoans(token) {
    const res = await fetch(`${API_BASE}/user-dashboard/mis-prestamos`, {
      headers: { Authorization: token }
    });
    return res.json();
  }
}

export default ApiService;
