import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Iconos minimalistas

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Botón para abrir/cerrar Sidebar */}
      <button
        className="p-2 text-white bg-gray-800 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed z-50 top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <button
          className="absolute top-4 right-4 text-gray-300 "
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>

        <ul className="mt-16 space-y-4 text-lg px-4">
          <li><Link to="/" onClick={() => setIsOpen(false)} className="block hover:bg-gray-700 p-2 rounded">Inicio</Link></li>
          <li><Link to="/dashboard" onClick={() => setIsOpen(false)} className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link></li>
          <li><Link to="/login" onClick={() => setIsOpen(false)} className="block hover:bg-gray-700 p-2 rounded">Iniciar Sesion</Link></li>
          <li><Link to="/register" onClick={() => setIsOpen(false)} className="block hover:bg-gray-700 p-2 rounded">Registrarse</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
