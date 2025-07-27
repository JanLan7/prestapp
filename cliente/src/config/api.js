// Configuración de URLs para desarrollo y producción
const config = {
  development: {
    API_URL: 'http://localhost:5000/api'
  },
  production: {
    // Cambia esta URL por tu backend deployado (Railway, Render, etc.)
    API_URL: import.meta.env.VITE_API_URL || 'prestapp'
  }
};

// Detecta automáticamente el entorno
const environment = import.meta.env.DEV ? 'development' : 'production';

export const API_URL = config[environment].API_URL;

export default config[environment];
