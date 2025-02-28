import { createContext, useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // Función de Login
  const login = async (form) => {
    try {
      const res = await apiClient.post("/users/login", form);
      console.log(res.data.data.token)
      const token = res.data.data.token;

      localStorage.setItem("token", token);
      setUser({ token });
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
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

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
