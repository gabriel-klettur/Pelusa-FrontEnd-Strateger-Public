// Path: strateger-react/src/components/Backtesting/BacktestingResult.js

import React from 'react';

const BacktestingResult = ({ test }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">Backtest Result: {test.name}</h3>
      <p><strong>Strategy:</strong> {test.strategy}</p>
      <p><strong>Result:</strong> {test.result}</p>
      <p><strong>PNL:</strong> {test.pnl}</p>
      <p><strong>Date:</strong> {test.date}</p>
      {/* Puedes agregar más detalles específicos del backtest aquí */}
    </div>
  );
};

export default BacktestingResult;
