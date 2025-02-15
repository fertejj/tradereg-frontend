import useLogin from "../hooks/useLogin";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";

const LoginPage = () => {
  const { formData, errors, loading, handleChange, handleSubmit } = useLogin();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-3xl min-w-96 w-[30%]">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <Input label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
          {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
          <Button text={loading ? "Cargando..." : "Iniciar Sesión"} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
