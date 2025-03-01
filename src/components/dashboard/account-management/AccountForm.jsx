import { useState } from "react";
import { tradeService } from "../../../services/tradeService";

export default function AccountForm() {
  //Estado que maneja el trade
  const [tradingAccount, setTradingAccount] = useState({
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
    setTradingAccount({ ...tradingAccount, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    tradingAccountService.createAccount(tradingAccount);
  };

  return (
    <div className="mx-auto overflow-y-scroll max-h-[70vh] pr-3 text-gray-400 ">
      <h2 className="text-2xl text-center font-bold mb-4">Crear cuenta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Balance inicial</label>
          <input
            type="number"
            name="balance"
            value={tradingAccount.balance}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Moneda</label>
          <select
            name="currency"
            value={tradingAccount.currency}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-whiste p-2 rounded"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
