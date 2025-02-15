import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL del backend
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout opcional (10 segundos)
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "❌ Error en la petición:",
      error.response?.data || error.message
    );
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
