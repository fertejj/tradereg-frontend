import PropTypes from "prop-types";

const Button = ({ children, className }) => (
  <button
    className={`px-6 py-3 text-lg rounded-md shadow ${className}`}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
