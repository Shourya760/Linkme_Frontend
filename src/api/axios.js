import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("linkme_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Handle expired or invalid token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthenticationRequest = /^\/?auth\/(login|register)(?:\?|$)/.test(requestUrl);

    if (error.response?.status === 401 && !isAuthenticationRequest) {

      // Remove the expired token
      localStorage.removeItem("linkme_token");
      localStorage.removeItem("linkme_profile");
      // Redirect to login
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);


export default api;
