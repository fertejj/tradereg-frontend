import { useContext } from "react";
import FeaturesSection from "../components/homepage/FeaturesSection";
import HeaderSection from "../components/homepage/HeaderSection";
import TestimonialsSection from "../components/homepage/TestimonialsSection";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  if(user){
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col text-white-100 bg-bg">
      <HeaderSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
