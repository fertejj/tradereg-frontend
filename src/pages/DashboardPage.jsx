import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Plus, Download } from "lucide-react";
import TradeList from "../components/dashboard/trade-management/TradeList";
import {
  FilterButton,
  FilterPanel,
} from "../components/dashboard/trade-management/FilterList";
import Modal from "../components/common/Modal";
import TradeForm from "../components/dashboard/trade-management/TradeForm";

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

  const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const successRate = (
    (trades.filter((trade) => trade.pnl > 0).length / trades.length) *
    100
  ).toFixed(1);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded border border-gray-700">
            <h3 className="text-gray-400 text-sm">Total P&L</h3>
            <p
              className={`text-xl sm:text-2xl font-bold ${
                totalPnl >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {totalPnl.toFixed(2)} USDT
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded border border-gray-700">
            <h3 className="text-gray-400 text-sm">Operaciones</h3>
            <p className="text-xl sm:text-2xl font-bold">{trades.length}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded border border-gray-700 sm:col-span-2 lg:col-span-1">
            <h3 className="text-gray-400 text-sm">Tasa de éxito</h3>
            <p className="text-xl sm:text-2xl font-bold">{successRate}%</p>
          </div>
        </div>

        {/* Navigation tabs - scrollable on mobile */}
        <div className="flex overflow-x-auto border-b border-gray-700 mb-4 pb-1 hide-scrollbar">
          <button
            className={`py-2 px-4 whitespace-nowrap ${
              activeTab === "operations"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("operations")}
          >
            Operaciones
          </button>
          <button
            className={`py-2 px-4 whitespace-nowrap ${
              activeTab === "statistics"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("statistics")}
          >
            Estadísticas
          </button>
        </div>

        {/* Action buttons - responsive layout */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => openModal(<TradeForm />)} className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
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
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-400">Mostrando 1-5 de 5</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              disabled
            >
              &lt;
            </button>
            <button
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              disabled
            >
              &gt;
            </button>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
