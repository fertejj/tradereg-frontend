import { useState } from "react";
import { tradeService } from "../../../services/tradeService"

export default function TradeForm() {
  //Estado que maneja el trade
  const [trade, setTrade] = useState({
    symbol: "BTC/USD",
    side: "",
    entryPrice: 0,
    closePrice: 0,
    operatedVolume: 0,
    pnl: 0,
    fees: 0,
    status: "",
    result: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setTrade({ ...trade, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    tradeService.createTrade(trade)
  };

  return (
    <div className="mx-auto overflow-y-scroll max-h-[70vh] pr-3 text-gray-400 ">
      <h2 className="text-2xl text-center font-bold mb-4">Registrar Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Simbolo</label>
          <input
            type="text"
            name="symbol"
            value={trade.symbol}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Lado</label>
          <select
            name="side"
            value={trade.side}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
        </div>

        {[
          { field: "entryPrice", label: "Precio de entrada" },
          { field: "closePrice", label: "Precio de cierre" },
          { field: "operatedVolume", label: "Volumen operado" },
          { field: "pnl", label: "PnL" },
          { field: "fees", label: "Comision" },
        ].map((item) => (
          <div key={item.field}>
            <label className="block text-sm font-medium">{item.label}</label>
            <input
              type="number"
              name={item.field}
              value={trade[item.field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}


        <div>
          <label className="block text-sm font-medium">Result</label>
          <select
            name="result"
            value={trade.result}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="GANADORA">GANADORA</option>
            <option value="PERDEDORA">PERDEDORA</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Registrar Trade
        </button>
      </form>
    </div>
  );
}
