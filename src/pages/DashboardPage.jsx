import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import ToolBar from "../components/dashboard/trade-management/ToolBar";
import TradeList from "../components/dashboard/trade-management/TradeList";
import ToolBarAcc from "../components/dashboard/account-management/ToolBarAcc";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="bg-bg h-[75vh] text-white-100">
      <ToolBar />
      <TradeList />
      <ToolBarAcc />

    </div>
  );
};

export default DashboardPage;
