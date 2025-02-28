import { useContext, useState } from "react";
import loginSchema from "../validation/loginSchema";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {


  const { login } = useContext(AuthContext)
  const navigate = useNavigate();
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
    setErrors({}); // Evita `null`

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
    navigate("/dashboard");
    setLoading(false);
  };

  return { formData, errors, loading, handleChange, handleSubmit };
};

export default useLogin;
