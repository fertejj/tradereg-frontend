import { useContext, useState } from 'react';
import { User, BarChart2, LogOut, Menu, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-500 w-8 h-8 rounded flex items-center justify-center text-white font-bold">T</div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">TradeReg</span>
            </Link>
          </div>
          
          {/* Navegación en desktop */}
          {user ? (
            <div className="hidden sm:flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center space-x-1 group">
                <BarChart2 size={16} />
                <span>Dashboard</span>
                <div className="h-0.5 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              
              <Link to="/profile" className="text-gray-300 hover:text-white flex items-center space-x-1 group">
                <User size={16} />
                <span>Perfil</span>
                <div className="h-0.5 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              
              <button 
                onClick={logout} 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg flex items-center space-x-1 transition-all duration-300"
              >
                <span>Cerrar sesión</span>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white flex items-center group">
                <span>Inicio</span>
                <div className="h-0.5 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              
              <Link to="/login" className="text-gray-300 hover:text-white border border-gray-700 px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300">
                Iniciar Sesión
              </Link>
              
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
                Registrarse
              </Link>
            </div>
          )}

          {/* Botón menú móvil */}
          <div className="sm:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-800 py-4 px-6">
          {user ? (
            <div className="flex flex-col space-y-4">
              <Link to="/dashboard" className="text-gray-300 hover:text-white py-2 flex items-center space-x-2">
                <BarChart2 size={18} />
                <span>Dashboard</span>
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white py-2 flex items-center space-x-2">
                <User size={18} />
                <span>Perfil</span>
              </Link>
              <button 
                onClick={logout} 
                className="text-gray-300 hover:text-white py-2 w-full text-left flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-300 hover:text-white py-2">Inicio</Link>
              <Link to="/login" className="text-gray-300 hover:text-white py-2">Iniciar Sesión</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center transition-colors duration-300">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
