import FeatureCard from "./FeatureCard";

const FeaturesSection = () => (
  <div className="max-w-6xl mx-auto py-12">
    <h2 className="text-3xl font-bold text-center mb-8">
      ¿Por qué elegir TradeReg?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard
        title="Fácil de Usar"
        description="Una interfaz intuitiva que te permite registrar y analizar tus operaciones sin complicaciones."
      />
      <FeatureCard
        title="Análisis Avanzado"
        description="Obtén estadísticas detalladas para tomar decisiones informadas en tus operaciones."
      />
      <FeatureCard
        title="Soporte Técnico"
        description="Nuestro equipo está disponible para ayudarte con cualquier duda o problema que tengas."
      />
    </div>
  </div>
);

export default FeaturesSection;