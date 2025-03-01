import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div  className="bg-bg text-white-100 py-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2025 TradeReg. Todos los derechos reservados.</p>
          <div className="flex justify-center mt-4 gap-4">
            <Link to="/about" className="text-gray-200 hover:text-white-100">
              Sobre Nosotros
            </Link>
            <Link to="/contact" className="text-gray-200 hover:text-white-100">
              Contacto
            </Link>
            <Link to="/privacy" className="text-gray-200 hover:text-white-100">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
