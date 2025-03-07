const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default NavigationTabs;
