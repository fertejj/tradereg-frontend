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
    <ToolBar/>
  </div>;
};

export default DashboardPage;
