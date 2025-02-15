import useRegister from "../hooks/useRegister"  ;
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";

const RegisterPage = () => {
  const { formData, errors, loading, handleChange, handleSubmit } =
     useRegister();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-3xl min-w-96 w-[30%]">
        <h2 className="text-2xl font-bold text-center mb-4">Crear Cuenta</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Nombre"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Apellido"
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={handleChange}
            error={errors.lastname}
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Input
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
          <Button
            text={loading ? "Registrando..." : "Registrarse"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
