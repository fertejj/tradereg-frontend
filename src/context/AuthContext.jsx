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
      const token = res.data.data.token;
      const user = res.data.data.user;
      localStorage.setItem("token", token);
      setUser({ token, user });
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
      await apiClient.post("/users/register", {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
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

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, login, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
