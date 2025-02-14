import { Link } from "react-router-dom";
import Button from "../common/Button";

const HeaderSection = () => (
  <div className="relative h-[60vh] w-full flex items-center justify-center before:content-[''] before:absolute before:inset-0 before:bg-[url('assets/bg-hero.jpg')] before:bg-cover before:bg-center before:opacity-40">
    <div className="relative z-10 max-w-6xl text-center px-4">
      <h1
        data-aos="fade-right"
        data-aos-delay="100"
        className="text-5xl font-bold mb-4"
      >
        Bienvenido a TradeReg
      </h1>
      <p
        data-aos="fade-up"
        data-aos-delay="500"
        className="text-lg text-gray-200"
      >
        Gestiona y analiza tus operaciones de trading con facilidad. Regístrate
        o inicia sesión para comenzar.
      </p>
      <div
        data-aos="fade-up"
        data-aos-delay="900"
        className="mt-6 flex gap-4 justify-center"
      >
        <Link to="/login">
          <Button className="bg-gray-200 text-black hover:bg-transparent border border-white hover:text-white ">
            Iniciar Sesión
          </Button>
        </Link>
        <Link to="/register">
          <Button className="bg-white text-black border-white hover:bg-transparent border border-white hover:text-white ">
            Registrarse
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default HeaderSection;
