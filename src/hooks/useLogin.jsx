import { useState } from "react";
import loginSchema from "../validation/loginSchema";

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
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ form: data.message || "Error en el inicio de sesión" });
        return;
      }

      localStorage.setItem("token", data.data.token);
      alert("Inicio de sesión exitoso");
    } catch {
      setErrors({ form: "Error de conexión con el servidor" });
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
