import PropTypes from "prop-types";

const ToolBar = ({ buttons }) => {
  return (
    <nav className="flex justify-between p-3 bg-secondary">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
            {button.label}
        </button>
      ))}
    </nav>
  );
};

ToolBar.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // label debe ser un string obligatorio
      onClick: PropTypes.func.isRequired, // onClick debe ser una función obligatoria
    })
  ),
};

ToolBar.defaultProps = {
  buttons: [],
};

export default ToolBar;
