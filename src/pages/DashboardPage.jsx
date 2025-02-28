import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import ToolBar from "../components/trade-management/ToolBar";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return <div className="bg-bg h-[75vh] text-white-100">
    <ToolBar
      buttons={[
        { label: "Nuevo Trade", onClick: () => console.log("Nuevo Trade") },
        { label: "Editar Trade", onClick: () => console.log("Editar Trade") },
        { label: "Eliminar Trade", onClick: () => console.log("Eliminar Trade") },
        { label: "Exportar", onClick: () => console.log("Exportar") }
      ]}
    />
  </div>;
};

export default DashboardPage;
