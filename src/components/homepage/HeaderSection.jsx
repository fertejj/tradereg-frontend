import React from 'react';

const Button = ({ children, className }) => (
  <button className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${className}`}>
    {children}
  </button>
);

const HeaderSection = () => (
  <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">

    {/* <div className="absolute inset-0 bg-black">

      <img 
        src="/api/placeholder/1920/1080" 
        alt="Trading background" 
        className="w-full h-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
    </div> */}
    
    {/* Elementos decorativos */}
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
    </div>
    
    {/* Contenido principal */}
    <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
      <div className="inline-block mb-3 px-4 py-1 bg-blue-500/20 backdrop-blur-md rounded-full">
        <span className="text-blue-300 font-medium text-sm">Plataforma de trading #1 para traders serios</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">
        Bienvenido a <span className="text-blue-400">TradeReg</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
        Registra, analiza y optimiza tus operaciones con nuestra plataforma diseñada por traders para traders.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30">
          Iniciar Sesión
        </Button>
        <Button className="bg-transparent text-white border-2 border-white/20 hover:bg-white/10 backdrop-blur-sm">
          Registrarse Gratis
        </Button>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">

      </div>
    </div>
  </div>
);

export default HeaderSection;