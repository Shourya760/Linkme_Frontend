import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('linkme_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = /\/auth\/(login|register)(?:\?|$)/.test(error.config?.url || '');
    if (error.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem('linkme_token');
      localStorage.removeItem('linkme_profile');
      window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);

export default api;
