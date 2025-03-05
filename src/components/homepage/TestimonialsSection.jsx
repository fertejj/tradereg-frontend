import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ quote, author, role, rating = 5 }) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300 relative">
    {/* Ícono de comillas */}
    <div className="absolute -top-4 -left-2">
      <div className="bg-blue-500 p-2 rounded-full">
        <Quote size={20} className="text-white" />
      </div>
    </div>
    
    {/* Rating en estrellas */}
    <div className="flex mb-6">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={`${i < rating ? 'text-yellow-400' : 'text-gray-600'} mr-1`} 
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
    
    {/* Texto del testimonio */}
    <p className="text-gray-300 text-lg mb-6">"{quote}"</p>
    
    {/* Información del autor */}
    <div className="flex items-center mt-6">
      <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-12 w-12 rounded-full flex items-center justify-center font-bold text-white text-lg">
        {author.charAt(0)}
      </div>
      <div className="ml-4">
        <p className="font-bold text-white">{author}</p>
        {role && <p className="text-gray-400 text-sm">{role}</p>}
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "TradeReg transformó por completo mi trading. Ahora puedo ver claramente mis patrones de éxito y evitar errores repetitivos. Mi rentabilidad ha aumentado un 18% desde que comencé a usarlo.",
      author: "Juan Pérez",
      role: "Trader Profesional",
      rating: 5
    },
    {
      quote: "Como trader principiante, TradeReg me ha proporcionado la estructura que necesitaba. La visualización de datos es increíble y el soporte siempre está disponible cuando lo necesito.",
      author: "María Rodríguez",
      role: "Trader Independiente",
      rating: 5
    },
    {
      quote: "Después de probar varias plataformas, TradeReg es sin duda la más intuitiva y completa. La función de análisis de estrategias me ha ayudado a optimizar mis operaciones de manera significativa.",
      author: "Pedro López",
      role: "Analista Financiero",
      rating: 4
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
            TESTIMONIOS
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg">
            Descubre cómo TradeReg está ayudando a traders de todos los niveles a mejorar 
            sus resultados y tomar decisiones más informadas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;