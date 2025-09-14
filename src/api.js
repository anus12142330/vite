
// src/api.js
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5641';
axios.defaults.withCredentials = true; // if you use sessions/cookies
