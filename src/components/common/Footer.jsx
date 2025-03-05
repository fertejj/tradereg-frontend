import React from 'react';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Sección principal del footer */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">TradeReg</h2>
            <p className="mb-4 text-gray-400 max-w-md">
              Plataforma integral para el registro y análisis de operaciones de trading.
              Optimiza tus estrategias con datos precisos y visualizaciones avanzadas.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="/analytics" className="text-gray-400 hover:text-blue-400 transition-colors">Análisis</a>
              </li>
              <li>
                <a href="/reports" className="text-gray-400 hover:text-blue-400 transition-colors">Reportes</a>
              </li>
              <li>
                <a href="/settings" className="text-gray-400 hover:text-blue-400 transition-colors">Configuración</a>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">Sobre Nosotros</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contacto</a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Política de Privacidad</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Términos de Servicio</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Línea divisora */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-t border-gray-800"></div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 TradeReg. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-500">Diseñado con ♥ para traders profesionales</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;