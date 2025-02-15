import axios from "axios";

const getToken = () => localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL del backend
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout opcional (10 segundos)
});

// Interceptor para agregar el token a cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "❌ Error en la petición:",
      error.response?.data || error.message
    );

    // Manejo de error por token expirado (Ejemplo: HTTP 401)
    if (error.response?.status === 401) {
      console.warn("⚠️ Token expirado. Cerrando sesión...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirigir al login (opcional)
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
