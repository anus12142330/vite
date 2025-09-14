
import axios from 'axios';

// read your backend url from Vite env (set this in Render Static Site env)
const base = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');

// set global defaults (affects axios.* everywhere)
axios.defaults.baseURL = base;                 // e.g. https://render-express-deployment-fzqg.onrender.com
axios.defaults.withCredentials = true;         // keep session cookie if you use express-session
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// (optional) quick sanity log (remove later)
console.log('[AXIOS]', { baseURL: axios.defaults.baseURL });
