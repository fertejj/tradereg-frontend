import { useState } from "react";
import loginSchema from "../validation/loginSchema";

const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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

    console.log("🟡 Formulario enviado con:", formData);

    // Validación con Zod
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.format();
      console.warn("⚠️ Errores de validación detectados:", fieldErrors);
      setErrors({
        email: fieldErrors.email?._errors?.[0] || "",
        password: fieldErrors.password?._errors?.[0] || "",
      });
      setLoading(false);
      return;
    }

    console.log("✅ Validación exitosa. Enviando datos al backend...");

    try {
      console.log("🔵 Enviando solicitud POST a: http://localhost:5000/api/users/login");
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("⏳ Esperando respuesta del backend...");
      const data = await res.json();
      console.log("🔵 Respuesta recibida del backend:", data);

      if (!res.ok) {
        console.error("❌ Error en la respuesta del servidor:", data.message);
        setErrors({ form: data.message || "Error en el inicio de sesión" });
        setLoading(false);
        return;
      }

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);
      console.log("✅ Inicio de sesión exitoso. Token guardado en localStorage.");
      alert("Inicio de sesión exitoso");
    } catch (error) {
      console.error("❌ Error de conexión con el servidor:", error);
      setErrors({ form: "Error de conexión con el servidor" });
    }

    setLoading(false);
  };

  return { formData, errors, loading, handleChange, handleSubmit };
};

export default useLogin;
