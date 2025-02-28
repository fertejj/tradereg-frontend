import { useContext, useState } from "react";
import registerSchema from "../validation/registerSchema";
import apiClient from "../utils/apiClient";
import { AuthContext } from "../context/AuthContext";

const useRegister = () => {
  const { register } = useContext(AuthContext)
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

  const handleRegister = async () => {
    setLoading(true);
    setErrors(null);

    const res = await register(formData)
    setLoading(false);
    console.log(res)
    if (!res?.success) {
      setErrors(res?.message);
  }

  return res;

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    await handleRegister();
    setLoading(false);
  };

  return { formData, errors, loading, handleChange, handleSubmit };
};

export default useRegister;
