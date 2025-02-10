import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => (
  <div className="py-12">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Lo que dicen nuestros usuarios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          quote="TradeReg me ha ayudado a mantener un mejor control de mis operaciones. Es una herramienta imprescindible."
          author="Juan P."
        />
        <TestimonialCard
          quote="Gracias a TradeReg, ahora puedo analizar mis resultados con más confianza."
          author="María R."
        />
        <TestimonialCard
          quote="¡Muy fácil de usar! Recomendaría TradeReg a todos los traders."
          author="Pedro L."
        />
      </div>
    </div>
  </div>
);

export default TestimonialsSection;
