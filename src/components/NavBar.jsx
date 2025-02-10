import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const NavBar = () => {
  return (
    <nav className="bg-green-950 text-white p-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">TradeReg</h1>
      <ul className="sm:flex space-x-4 hidden ">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-gray-300">
            Registro
          </Link>
        </li>
      </ul>
      <div className="flex sm:hidden">
        <SideBar />
      </div>
    </nav>
  );
};

export default NavBar;
