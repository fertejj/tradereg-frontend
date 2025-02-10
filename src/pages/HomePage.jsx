import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ButtonComponent = ({ children, className }) => (
  <button className={`px-6 py-3 text-lg rounded-md shadow ${className}`}>
    {children}
  </button>
);

ButtonComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100  ">
      {/* Header Section */}

<div className="relative bg-black h-[50vh] w-full flex items-center justify-center text-white before:content-[''] before:absolute before:inset-0 before:bg-[url('assets/bg-hero.jpg')] before:bg-cover before:bg-center before:opacity-50">
  
  {/* Contenido centrado */}
  <div className="relative z-10 max-w-6xl text-center px-4">
    <h1 className="text-5xl font-bold mb-4">Bienvenido a TradeReg</h1>
    <p className="text-lg text-gray-200">
      Gestiona y analiza tus operaciones de trading con facilidad.
      Regístrate o inicia sesión para comenzar.
    </p>

    {/* Botones */}
    <div className="mt-6 flex gap-4 justify-center">
      <Link to="/login">
        <ButtonComponent className="bg-gray-200 text-black">
          Iniciar Sesión
        </ButtonComponent>
      </Link>
      <Link to="/register">
        <ButtonComponent className="bg-white text-black border-white">
          Registrarse
        </ButtonComponent>
      </Link>
    </div>
  </div>
</div>


      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          ¿Por qué elegir TradeReg?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Fácil de Usar</h3>
            <p className="text-gray-600">
              Una interfaz intuitiva que te permite registrar y analizar tus
              operaciones sin complicaciones.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Análisis Avanzado</h3>
            <p className="text-gray-600">
              Obtén estadísticas detalladas para tomar decisiones informadas en
              tus operaciones.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Soporte Técnico</h3>
            <p className="text-gray-600">
              Nuestro equipo está disponible para ayudarte con cualquier duda o
              problema que tengas.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic text-gray-600">
                "TradeReg me ha ayudado a mantener un mejor control de mis
                operaciones. Es una herramienta imprescindible."
              </p>
              <p className="mt-4 text-right font-bold">- Juan P.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic text-gray-600">
                "Gracias a TradeReg, ahora puedo analizar mis resultados con
                más confianza."
              </p>
              <p className="mt-4 text-right font-bold">- María R.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic text-gray-600">
                "¡Muy fácil de usar! Recomendaría TradeReg a todos los
                traders."
              </p>
              <p className="mt-4 text-right font-bold">- Pedro L.</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default HomePage;
