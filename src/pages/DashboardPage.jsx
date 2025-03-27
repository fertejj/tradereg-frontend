import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { FilterPanel } from "../components/dashboard/trade-management/FilterPanel";
import TradeList from "../components/dashboard/trade-management/TradeList";
import Modal from "../components/common/Modal";
import Pagination from "../components/common/Pagination";
import NavigationTabs from "../components/dashboard/trade-management/NavigationTabs";
import SummaryCards from "../components/dashboard/SummaryCards";
import ActionButtons from "../components/dashboard/trade-management/ActionButtons";
import AccountSelector from "../components/dashboard/account-management/AccountSelector";
import { AccountProvider } from "../context/AccountContext";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTittle, setModalTittle] = useState("")
  const [activeTab, setActiveTab] = useState("operations");

  const handleModal = (content, tittle) => {
    if (modalContent == null) {
      setModalContent(content);
      setModalTittle(tittle);
      setIsModalOpen(true);
    } else {
      setModalContent(null);
      setModalTittle('Nothing')
      setIsModalOpen(false);
    }
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
      <main className="px-4">
        <AccountProvider>
        <AccountSelector/>



        <Modal isOpen={isModalOpen} onClose={handleModal} title={modalTittle}>
          {modalContent}
        </Modal>
        <SummaryCards trades={trades} />
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ActionButtons
          toggleFilters={toggleFilters}
          showFilters={showFilters}
          openModal={handleModal}
          />
        <FilterPanel showFilters={showFilters} />
        <TradeList trades={trades} />
        <Pagination />
          </AccountProvider>
      </main>
    </div>
  );
};

export default DashboardPage;
