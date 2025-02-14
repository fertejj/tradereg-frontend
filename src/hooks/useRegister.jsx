import { useState } from "react";
import registerSchema from "../validation/registerSchema";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validación con Zod
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
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ form: data.message || "Error al registrar usuario" });
        setLoading(false);
        return;
      }

      alert("Registro exitoso. Ahora puedes iniciar sesión.");
    } catch (error) {
      setErrors({ form: "Error de conexión con el servidor", error: error });
    }

    setLoading(false);
  };

  return { formData, errors, loading, handleChange, handleSubmit };
};

export default useRegister;
