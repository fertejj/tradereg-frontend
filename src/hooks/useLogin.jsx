import { useContext, useState } from "react";
import loginSchema from "../validation/loginSchema";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext no está disponible. Asegúrate de envolver tu aplicación con <AuthContext.Provider>");
  }

  const { login } = authContext;

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

  const handleLogin = async () => {
    setLoading(true);
    setErrors({});  // Evita `null`

    if (!formData || typeof formData.email === "undefined") {
      console.error("formData no está definido correctamente");
      setLoading(false);
      return;
    }

    const res = await login(formData);
    setLoading(false);

    if (!res.success) {
      setErrors(res.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Asegurar que no es null

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    await handleLogin();
    setLoading(false);
  };

  return { formData, errors, loading, handleChange, handleSubmit };
};

export default useLogin;
