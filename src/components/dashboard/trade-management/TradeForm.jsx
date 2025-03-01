import { useState } from "react";

export default function TradeForm() {
  const [trade, setTrade] = useState({
    symbol: "BTC/USD",
    side: "LONG",
    entryPrice: 96500,
    closePrice: 98500,
    operatedVolume: 300,
    pnl: 25,
    fees: 0,
    status: "CERRADA",
    result: "GANADORA",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setTrade({ ...trade, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formulario llenado:", trade);
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
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={trade.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="ABIERTA">ABIERTA</option>
            <option value="CERRADA">CERRADA</option>
          </select>
        </div>

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
