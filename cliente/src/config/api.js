// Configuración de URLs para desarrollo y producción
const config = {
  development: {
    API_URL: 'http://localhost:5000/api'
  },
  production: {
    // En Vercel, el backend estará en la misma URL pero con /api
    API_URL: '/api'
  }
};

// Detecta automáticamente el entorno
const environment = import.meta.env.DEV ? 'development' : 'production';

export const API_URL = config[environment].API_URL;

export default config[environment];
