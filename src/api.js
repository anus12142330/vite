// src/api.js
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5641';
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const full = `${config.baseURL || ''}${config.url || ''}`;
  if (full.includes('/api/login')) {
    console.warn('[TRACE] Requesting', full, config.method?.toUpperCase());
    console.trace();                     // ← this prints the call stack
  }
  return config;
});

export default axios;
