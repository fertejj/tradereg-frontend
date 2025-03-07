import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Plus, Download } from "lucide-react";
import TradeList from "../components/dashboard/trade-management/TradeList";
import {
  FilterButton,
  FilterPanel,
} from "../components/dashboard/trade-management/FilterPanel";
import Modal from "../components/common/Modal";
import TradeForm from "../components/dashboard/trade-management/TradeForm";
import Pagination from "../components/common/Pagination";
import NavigationTabs from "../components/dashboard/trade-management/NavigationTabs";
import SummaryCards from "../components/dashboard/SummaryCards";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeTab, setActiveTab] = useState("operations");

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const trades = [
    { date: "2024-02-28", pair: "BTC/USDT", pnl: 120.32, amount: 1820 },
    { date: "2024-02-27", pair: "ETH/USDT", pnl: 119.38, amount: 2054 },
    { date: "2024-02-26", pair: "SOL/USDT", pnl: -49.34, amount: 1923 },
    { date: "2024-02-25", pair: "BNB/USDT", pnl: 65.12, amount: 1500 },
    { date: "2024-02-24", pair: "ADA/USDT", pnl: -18.72, amount: 1100 },
  ];



  if (!user) {
    return <Navigate to="/" />;
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex flex-col bg-gray-900 text-gray-200">
      {/* Main content */}
      <main className="p-4">
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Operando">
          {modalContent}
        </Modal>
        {/* Summary cards */}
        <SummaryCards trades={trades}/>

        {/* Navigation tabs - scrollable on mobile */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Action buttons - responsive layout */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => openModal(<TradeForm />)}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Nuevo Trade</span>
            <span className="sm:hidden">Nuevo</span>
          </button>
          <FilterButton
            toggleFilters={toggleFilters}
            showFilters={showFilters}
          />
          <button className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 ml-auto">
            <Download size={16} />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>

        <FilterPanel showFilters={showFilters} />
        <TradeList trades={trades} />

        {/* Paginación móvil simplificada */}
        <Pagination />
      </main>
    </div>
  );
};

export default DashboardPage;
