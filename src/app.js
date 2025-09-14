

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5641'; // <- your server port

axios.defaults.baseURL = API_BASE;
axios.defaults.withCredentials = true;

// Optional: log requests/results to the browser console
axios.interceptors.request.use((cfg) => {
  console.log('[API REQ]', cfg.method?.toUpperCase(), cfg.baseURL + cfg.url);
  return cfg;
});
axios.interceptors.response.use(
  (res) => {
    console.log('[API RES]', res.status, res.config.url, res.data);
    return res;
  },
  (err) => {
    if (err.response) {
      console.error('[API ERR]', err.response.status, err.config?.url, err.response.data);
    } else {
      console.error('[API ERR]', err.message);
    }
    return Promise.reject(err);
  }
);
