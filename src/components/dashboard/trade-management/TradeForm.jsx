import { useState } from "react";
import { tradeService } from "../../../services/tradeService";

export default function TradeForm({ onClose }) {
  // Estado que maneja el trade
  const [trade, setTrade] = useState({
    symbol: "BTC/USD",
    side: "LONG",
    leverage: 0,
    entryPrice: 0,
    exitPrice: 0,
    operatedVolume: 0,
    pnl: 0,
    fees: 0,
    status: "",
    result: "",
    openAt: new Date().toISOString(),
    closedAt: new Date().toISOString(),
  });

  // Calculamos el PnL automáticamente cuando cambian los precios, volumen o apalancamiento
  const calculatePnL = () => {
    if (!trade.entryPrice || !trade.exitPrice || !trade.operatedVolume)
      return 0;

    const multiplier = trade.side === "LONG" ? 1 : -1;
    // Aplicamos el apalancamiento al cálculo del PnL
    const priceChange = trade.exitPrice - trade.entryPrice;
    const percentChange = priceChange / trade.entryPrice;
    const leveragedPercentChange = percentChange * trade.leverage;
    const pnl = (
      trade.operatedVolume *
      leveragedPercentChange *
      multiplier
    ).toFixed(2);
    return pnl;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Para el campo de apalancamiento, aseguramos que esté dentro del rango válido
    if (name === "leverage") {
      let leverageValue = parseInt(value, 10);
      if (isNaN(leverageValue)) leverageValue = "";
      if (leverageValue < 1) leverageValue = "";
      if (leverageValue > 500) leverageValue = 500;

      setTrade({ ...trade, [name]: leverageValue });
    } else {
      setTrade({ ...trade, [name]: value });
    }

    // Actualizamos el PnL automáticamente cuando cambian los valores relevantes
    if (
      [
        "entryPrice",
        "exitPrice",
        "operatedVolume",
        "side",
        "leverage",
      ].includes(name)
    ) {
      setTimeout(() => {
        setTrade((prevTrade) => ({
          ...prevTrade,
          pnl: calculatePnL(),
        }));
      }, 100);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determinamos el resultado automáticamente basado en el PnL
    const result = parseFloat(trade.pnl) > 0 ? "GANADORA" : "PERDEDORA";
    const finalTrade = { ...trade, result };
    console.log(finalTrade)
    tradeService.createTrade(finalTrade);
    onClose && onClose();
  };

  return (
    <div className="overflow-y-auto max-h-[70vh] bg-gray-900 px-6 text-gray-300">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Registrar Trade</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Símbolo */}
          <div className="">
            <label className="block text-sm font-medium mb-1">Símbolo</label>
            <input
              type="text"
              name="symbol"
              value={trade.symbol}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Lado */}
          <div>
            <label className="block text-sm font-medium mb-1">Lado</label>
            <select
              name="side"
              value={trade.side}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>

          {/* Apalancamiento - Cambiado a input numérico */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Apalancamiento
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="leverage"
                value={trade.leverage}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="w-12 ml-2 text-center">x</span>
            </div>
          </div>

          {/* Volumen operado */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Volumen operado
            </label>
            <input
              type="number"
              step="0.01"
              name="operatedVolume"
              value={trade.operatedVolume}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Precio de entrada */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Precio de entrada
            </label>
            <input
              type="number"
              step="0.01"
              name="entryPrice"
              value={trade.entryPrice}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Precio de cierre */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Precio de cierre
            </label>
            <input
              type="number"
              step="0.01"
              name="exitPrice"
              value={trade.exitPrice}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* PnL (calculado automáticamente) */}
          <div>
            <label className="block text-sm font-medium mb-1">PnL</label>
            <input
              type="number"
              step="0.01"
              name="pnl"
              value={trade.pnl}
              readOnly
              className="w-full p-2 bg-gray-700 border border-gray-700 rounded cursor-not-allowed"
            />
          </div>

          {/* Comisión */}
          <div>
            <label className="block text-sm font-medium mb-1">Comisión</label>
            <input
              type="number"
              step="0.01"
              name="fees"
              value={trade.fees}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Resultado - ocultado porque será calculado automáticamente */}
          <div className="hidden">
            <label className="block text-sm font-medium mb-1">Resultado</label>
            <select
              name="result"
              value={trade.result}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="GANADORA">GANADORA</option>
              <option value="PERDEDORA">PERDEDORA</option>
            </select>
          </div>
        </div>

        {/* Resultado visual basado en el PnL calculado */}
        <div className="mt-4">
          <div className="flex items-center">
            <div className="mr-2 text-sm font-medium">Resultado esperado:</div>
            <div
              className={`py-1 px-3 rounded-full text-sm font-medium ${
                parseFloat(trade.pnl) > 0
                  ? "bg-green-900 text-green-300"
                  : parseFloat(trade.pnl) < 0
                  ? "bg-red-900 text-red-300"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {parseFloat(trade.pnl) > 0
                ? "GANADORA"
                : parseFloat(trade.pnl) < 0
                ? "PERDEDORA"
                : "NEUTRAL"}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition-colors duration-300"
          >
            Registrar Trade
          </button>
        </div>
      </form>
    </div>
  );
}
