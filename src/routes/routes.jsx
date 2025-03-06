import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import PrivateRoute from "./privateRoutes";

const AppRouter = () => {
  return (
    <Router>
      {/* Envolvemos todo en un div con flex-col y min-h-screen */}
      <div className="flex flex-col min-h-screen bg-gray-900">
        <NavBar />
        {/* El main con flex-grow para que empuje el footer hacia abajo */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* RUTA PRIVADA */}
            <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
            {/* Redirigir rutas desconocidas a la página de inicio */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {/* Footer ahora estará al final gracias a la estructura flex */}
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;