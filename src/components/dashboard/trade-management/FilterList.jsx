import { ChevronDown, Filter } from "lucide-react";
import React from "react";
import PropTypes from "prop-types";

export const FilterButton = ({ toggleFilters, showFilters }) => {
  return (
    <button
      className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      onClick={toggleFilters}
    >
      <Filter size={16} />
      <span className="hidden sm:inline">Filtrar</span>
      <ChevronDown
        size={16}
        className={`transform transition-transform ${
          showFilters ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

FilterButton.propTypes = {
  toggleFilters: PropTypes.func.isRequired,
  showFilters: PropTypes.bool.isRequired,
};

export const FilterPanel = ({ showFilters }) => {
  return (
    <>
      {showFilters && (
        <div className="bg-gray-800 p-4 rounded mb-4 border border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Fecha desde
              </label>
              <input
                type="date"
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Fecha hasta
              </label>
              <input
                type="date"
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Par</label>
              <select className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600">
                <option value="">Todos</option>
                <option value="BTC/USDT">BTC/USDT</option>
                <option value="ETH/USDT">ETH/USDT</option>
                <option value="SOL/USDT">SOL/USDT</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 text-sm">
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </>
  );
};
FilterPanel.propTypes = {
    showFilters: PropTypes.bool.isRequired,
  };