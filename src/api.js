import axios from 'axios';

// ✅ Create a pre-configured axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5641',
  withCredentials: true,   // needed for express-session cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: log requests/responses for debugging
api.interceptors.request.use(
  (config) => {
    console.log('➡️ API Request:', config.method?.toUpperCase(), config.url, config.data || config.params);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
