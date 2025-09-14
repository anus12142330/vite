// src/api.js
import axios from 'axios';

// ✅ Point axios to your backend
axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE || 'http://localhost:5641';

axios.defaults.withCredentials = true; // needed for express-session cookies
axios.defaults.headers['Content-Type'] = 'application/json';

// Optional: debugging logs
axios.interceptors.request.use(
  (config) => {
    console.log(
      '➡️ API Request:',
      config.method?.toUpperCase(),
      (config.baseURL || '') + (config.url || ''),
      config.params || config.data || ''
    );
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    const s = error.response?.status;
    const u = error.config?.url;
    const d = error.response?.data;
    console.error('❌ API Error:', s || error.message, u || '', d || '');
    return Promise.reject(error);
  }
);

export default axios;
