// src/api.js
import axios from 'axios';

// Point ALL existing axios calls to your backend
axios.defaults.baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5641';
axios.defaults.withCredentials = true; // only matters if you use sessions/cookies

// Helpful logs (optional but great for debugging)
axios.interceptors.request.use(
  (config) => {
    console.log(
      '➡️', (config.method || 'get').toUpperCase(),
      (config.baseURL || '') + (config.url || ''),
      config.params || config.data || ''
    );
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (res) => {
    console.log('✅', res.status, res.config?.url, res.data);
    return res;
  },
  (err) => {
    const s = err.response?.status;
    const u = err.config?.url;
    const d = err.response?.data;
    console.error('❌', s || err.message, u || '', d || '');
    return Promise.reject(err);
  }
);

// (no export needed — but exporting is fine)
export default axios;
