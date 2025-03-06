import React, { useState } from 'react';
import { Plus, Edit, Trash2, Download, Filter, ChevronDown, BarChart2, Settings } from 'lucide-react';

const TradeRegApp = () => {
  // Estados de ejemplo
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('operations');
  
  // Datos de ejemplo
  const trades = [
    { date: '2024-02-28', pair: 'BTC/USDT', pnl: 120.32, amount: 1820 },
    { date: '2024-02-27', pair: 'ETH/USDT', pnl: 119.38, amount: 2054 },
    { date: '2024-02-26', pair: 'SOL/USDT', pnl: -49.34, amount: 1923 },
    { date: '2024-02-25', pair: 'BNB/USDT', pnl: 65.12, amount: 1500 },
    { date: '2024-02-24', pair: 'ADA/USDT', pnl: -18.72, amount: 1100 }
  ];
  
  const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const successRate = (trades.filter(trade => trade.pnl > 0).length / trades.length * 100).toFixed(1);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">


      {/* Main content */}
      <main className="flex-1 p-4">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded border border-gray-700">
            <h3 className="text-gray-400 text-sm">Total P&L</h3>
            <p className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPnl.toFixed(2)} USDT
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded border border-gray-700">
            <h3 className="text-gray-400 text-sm">Operaciones</h3>
            <p className="text-2xl font-bold">{trades.length}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded border border-gray-700">
            <h3 className="text-gray-400 text-sm">Tasa de éxito</h3>
            <p className="text-2xl font-bold">{successRate}%</p>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex border-b border-gray-700 mb-4">
          <button 
            className={`py-2 px-4 ${activeTab === 'operations' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('operations')}
          >
            Operaciones
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'statistics' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('statistics')}
          >
            Estadísticas
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'accounts' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('accounts')}
          >
            Cuentas
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              <Plus size={16} />
              <span>Nuevo Trade</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600">
              <Filter size={16} />
              <span>Filtrar</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600">
              <Download size={16} />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Filter panel (collapsed by default) */}
        {showFilters && (
          <div className="bg-gray-800 p-4 rounded mb-4 border border-gray-700">
            {/* Filtros aquí */}
          </div>
        )}

        {/* Trades table */}
        <div className="bg-gray-800 rounded border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Par</th>
                <th className="p-3 text-right">P&L</th>
                <th className="p-3 text-right">Cantidad</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-gray-750">
                  <td className="p-3">{trade.date}</td>
                  <td className="p-3">{trade.pair}</td>
                  <td className={`p-3 text-right ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.pnl.toFixed(2)} USDT
                  </td>
                  <td className="p-3 text-right">{trade.amount} USDT</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button className="p-1 hover:bg-gray-600 rounded">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 hover:bg-gray-600 rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TradeRegApp;