import { useState } from "react";
import registerSchema from "../validation/registerSchema";
import apiClient from "../utils/apiClient";

const useRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.format();
      setErrors({
        name: fieldErrors.name?._errors?.[0] || "",
        lastname: fieldErrors.lastname?._errors?.[0] || "",
        email: fieldErrors.email?._errors?.[0] || "",
        password: fieldErrors.password?._errors?.[0] || "",
        confirmPassword: fieldErrors.confirmPassword?._errors?.[0] || "",
      });
      return false;
    }
    return true;
  };

  const sendRegisterRequest = async () => {
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
      setErrors({ form: error.message || "Error al registrar usuario" });
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

    await sendRegisterRequest();
    setLoading(false);
  };

  return { formData, errors, loading, handleChange, handleSubmit };
};

export default useRegister;
