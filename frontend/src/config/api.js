// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:4000/api',
    uploadURL: 'http://localhost:4000'
  },
  production: {
    baseURL: 'https://docconnect-backend-qapy.onrender.com/api',
    uploadURL: 'https://docconnect-backend-qapy.onrender.com'
  }
};

// Get current environment
const currentEnv = import.meta.env.MODE || 'development';

// Export current configuration
export const API_BASE_URL = API_CONFIG[currentEnv].baseURL;
export const UPLOAD_BASE_URL = API_CONFIG[currentEnv].uploadURL;

// For easy updates during deployment
export const updateProductionURLs = (backendURL) => {
  if (currentEnv === 'production') {
    API_CONFIG.production.baseURL = `${backendURL}/api`;
    API_CONFIG.production.uploadURL = backendURL;
  }
}; 