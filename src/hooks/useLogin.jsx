import { useState } from "react";
import loginSchema from "../validation/loginSchema";
import apiClient from "../utils/apiClient";

const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.format();
      setErrors({
        email: fieldErrors.email?._errors?.[0] || "",
        password: fieldErrors.password?._errors?.[0] || "",
      });
      return false;
    }
    return true;
  };

  const sendLoginRequest = async () => {
    try {
      const { data } = await apiClient.post("/users/login", formData);
      localStorage.setItem("token", data.data.token);
      console.log("Inicio de sesión exitoso");
    } catch (error){
      setErrors({ form: error.message || "Error al iniciar sesión" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    await sendLoginRequest();
    setLoading(false);
  };

  return { formData, errors, loading, handleChange, handleSubmit };
};

export default useLogin;
