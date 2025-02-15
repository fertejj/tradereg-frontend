import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// Función que verifica si el usuario está autenticado
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Cambia esto según tu lógica de autenticación
};

// Componente de Ruta Privada
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
