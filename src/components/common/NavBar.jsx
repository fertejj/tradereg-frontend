import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav className="bg-bg text-white-100 p-4 flex justify-between items-center">
      <Link to={"/"} className="text-xl font-bold">
        TradeReg
      </Link>
      {user && (
        <ul className="sm:flex space-x-4 hidden ">
          <li data-aos="fade-down" data-aos-delay="100">
            <Link to="/profile" className="hover:text-gray-300">
              Perfil
            </Link>
          </li>
          <li data-aos="fade-down" data-aos-delay="200">
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li data-aos="fade-down" data-aos-delay="400">
            <p onClick={logout} className="hover:text-gray-300">
              Cerrar sesion
            </p>
          </li>
        </ul>
      )}
      {!user && (
        <ul className="sm:flex space-x-4 hidden ">
          <li data-aos="fade-down" data-aos-delay="100">
            <Link to="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </li>
          <li data-aos="fade-down" data-aos-delay="300">
            <Link to="/login" className="hover:text-gray-300">
              Iniciar Sesion
            </Link>
          </li>
          <li data-aos="fade-down" data-aos-delay="400">
            <Link to="/register" className="hover:text-gray-300">
              Registrarse
            </Link>
          </li>
        </ul>
      )}
      <div className="flex sm:hidden">
        <SideBar />
      </div>
    </nav>
  );
};

export default NavBar;
