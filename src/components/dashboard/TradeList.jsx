import React from 'react';

const TradeList = () => {
  const trades = [
    { id: 1, pair: 'BTC/USDT', type: 'Compra', pnl: 120.32, amount: 1820, date: '2024-02-28' },
    { id: 2, pair: 'ETH/USDT', type: 'Venta', pnl: 119.38, amount: 2054, date: '2024-02-27' },
    { id: 3, pair: 'SOL/USDT', type: 'Compra', pnl: -49.34, amount: 1923, date: '2024-02-26' },
  ];

  return (
<div className="p-4 m-1 bg-gray-600 rounded-lg  text-bg shadow-md">
  <h2 className="text-lg font-semibold mb-2">Operaciones Registradas:</h2>
  <div className="bg-gray-500 p-2 rounded-md shadow">
    <div className="grid grid-cols-4 xl:grid-cols-5 font-semibold border-b p-2 text-center ">
      <span>Fecha</span>
      <span>Par</span>
      <span className='hidden xl:inline' >Tipo</span>
      <span>PnL</span>
      <span>Cantidad</span>
    </div>
    <ul>
      {trades.map((trade) => (
        <li
          key={trade.id}
          className="grid grid-cols-4 xl:grid-cols-5 p-2 border-b last:border-b-0 text-center "
        >
          <span>{trade.date}</span>
          <span className="font-bold">{trade.pair}</span>
          <span className={`hidden xl:inline font-medium ${trade.type === "Compra" ? "text-green-600" : "text-red-400"}`}>
            {trade.type}
          </span>
          <span className={`${trade.pnl > 0 ? "text-green-600" : "text-red-400"}`} >{trade.pnl} USDT</span>
          <span>{trade.amount} USDT</span>
        </li>
      ))}
    </ul>
  </div>
</div>

  );
};

export default TradeList;
