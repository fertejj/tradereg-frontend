import React from 'react';
import { Rocket, BarChart, Wrench } from 'lucide-react';

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] border border-gray-600">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-blue-500/10 rounded-full text-blue-400 mb-2">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

const FeaturesSection = () => {
  const cards = [
    {
      title: "Interfaz Intuitiva",
      description:
        "Registra y gestiona tus operaciones en segundos con nuestra plataforma diseñada para traders de todos los niveles.",
      icon: <Rocket size={52} strokeWidth={1.5} />,
    },
    {
      title: "Métricas Potentes",
      description:
        "Visualiza patrones, identifica oportunidades y optimiza tu estrategia con nuestros dashboards personalizables.",
      icon: <BarChart size={52} strokeWidth={1.5} />,
    },
    {
      title: "Soporte Premium",
      description:
        "Acceso 24/7 a nuestro equipo de expertos en trading y tecnología. Nunca estarás solo en tu camino al éxito.",
      icon: <Wrench size={52} strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4">
            ¿Por qué elegir TradeReg?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            La plataforma que transforma tus operaciones en decisiones estratégicas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <FeatureCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;