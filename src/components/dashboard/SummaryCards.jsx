import PropTypes from "prop-types";


const SummaryCards = ({ trades }) => {
  const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const successRate = (
    (trades.filter((trade) => trade.pnl > 0).length / trades.length) *
    100
  ).toFixed(1);
  return (
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
  );
};

SummaryCards.propTypes = {
    trades: PropTypes.array
}

export default SummaryCards;
