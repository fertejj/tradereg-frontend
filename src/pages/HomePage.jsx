import FeaturesSection from "../components/homepage/FeaturesSection";
import HeaderSection from "../components/homepage/HeaderSection";
import TestimonialsSection from "../components/homepage/TestimonialsSection";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col text-white-100 bg-bg">
      <HeaderSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
