import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  withCredentials: true,
});

// OPTIONAL: auto-handle 401 (expired token)
// If user token expires → auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.warn("Unauthorized → clearing stale cookie");
      // you can redirect or clear redux here if needed
    }
    return Promise.reject(error);
  }
);

export default api;
