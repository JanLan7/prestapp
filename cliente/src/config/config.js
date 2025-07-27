// Configuración para diferentes entornos
const config = {
  development: {
    API_URL: 'http://localhost:5000'
  },
  production: {
    API_URL: window.location.origin
  }
};

export const API_URL = config[import.meta.env.MODE] || config.development;
export const IS_PRODUCTION = import.meta.env.PROD;
