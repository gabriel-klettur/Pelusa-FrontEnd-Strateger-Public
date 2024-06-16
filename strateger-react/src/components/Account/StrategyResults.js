// Path: strateger-react/src/components/Account/StrategyResults.js

import React from 'react';

const StrategyResults = ({ results }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Strategy Results</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Strategy</th>
            <th className="py-2 px-4 border-b">PNL</th>
            <th className="py-2 px-4 border-b">Success Rate</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.strategy}>
              <td className="py-2 px-4 border-b">{result.strategy}</td>
              <td className={`py-2 px-4 border-b ${result.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>{result.pnl}</td>
              <td className="py-2 px-4 border-b">{result.successRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StrategyResults;
