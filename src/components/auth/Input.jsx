import PropTypes from "prop-types";

const Input = ({ label, name, type = "text", value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name} // <- Aquí agregamos el name para que handleChange pueda identificarlo
        type={type}
        value={value}
        onChange={onChange}
        className={`p-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, // <- Agregar name como requerido
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Input;
