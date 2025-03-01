import { createContext, useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar token al inicio
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Validar token con el backend
          const response = await apiClient.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          // Guardar información completa del usuario
          setUser({
            token,
            ...response.data.user // Supone que el endpoint devuelve datos del usuario
          });
        } catch (error) {
          // Token inválido o expirado
          console.error("Error validando token:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  // Función de Login
  const login = async (form) => {
    try {
      const res = await apiClient.post("/users/login", form);
      const { token, user: userData } = res.data.data;

      localStorage.setItem("token", token);
      setUser({ token, ...userData });
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error desconocido",
      };
    }
  };

  const register = async (formData) => {
    try {
      const res = await apiClient.post("/users/register", {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      
      return {
        success: true,
        message: "Registro exitoso. Ahora puedes iniciar sesión."
      };
    } catch (error) {
      console.error("Error en el registro:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error desconocido",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Función para refrescar el token
  const refreshToken = async () => {
    try {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) return false;

      const res = await apiClient.post("/users/refresh-token", { token: currentToken });
      const newToken = res.data.data.token;
      
      localStorage.setItem("token", newToken);
      setUser(prev => ({ ...prev, token: newToken }));
      return true;
    } catch (error) {
      console.error("Error al refrescar token:", error);
      logout();
      return false;
    }
  };

  // Configurar interceptor para tokens expirados
  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401 && user) {
          const refreshed = await refreshToken();
          if (refreshed) {
            // Reintentar la solicitud original
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
            return apiClient(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => apiClient.interceptors.response.eject(interceptor);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        setUser, 
        loading, 
        logout, 
        login, 
        register,
        refreshToken,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };