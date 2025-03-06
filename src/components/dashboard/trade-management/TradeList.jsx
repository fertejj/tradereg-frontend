import { Edit, Trash2 } from "lucide-react";

const TradeList = ({trades}) => {

  return (
    <div className="bg-gray-800 rounded border border-gray-700 overflow-x-auto">
      <table className="w-full min-w-max">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3 text-left">Fecha</th>
            <th className="p-3 text-left">Par</th>
            <th className="p-3 text-right">P&L</th>
            <th className="p-3 text-right">Cantidad</th>
            <th className="p-3 text-center w-24">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr
              key={index}
              className="border-t border-gray-700 hover:bg-gray-750"
            >
              <td className="p-3 text-sm sm:text-base">{trade.date}</td>
              <td className="p-3 text-sm sm:text-base">{trade.pair}</td>
              <td
                className={`p-3 text-right text-sm sm:text-base ${
                  trade.pnl >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {trade.pnl.toFixed(2)} USDT
              </td>
              <td className="p-3 text-right text-sm sm:text-base">
                {trade.amount} USDT
              </td>
              <td className="p-3">
                <div className="flex justify-center gap-2">
                  <button
                    className="p-1 hover:bg-gray-600 rounded"
                    aria-label="Editar"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-600 rounded"
                    aria-label="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeList;
