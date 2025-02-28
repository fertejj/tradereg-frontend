import PropTypes from "prop-types";

const Button = ({ text, onClick, variant = "primary", type = "submit" }) => {
  const styles =
    variant === "primary"
      ? "bg-blue-500 text-white-100 hover:bg-blue-600"
      : "bg-gray-300 text-black hover:bg-gray-400";

  return (
    <button type={type} onClick={onClick} className={`px-4 py-2 rounded-md ${styles}`}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  type: PropTypes.string, // Agregar validación de tipo
};

export default Button;
