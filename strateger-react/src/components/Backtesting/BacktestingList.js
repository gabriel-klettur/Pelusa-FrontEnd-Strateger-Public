// Path: strateger-react/src/components/Backtesting/BacktestingList.js

import React from 'react';

const BacktestingList = ({ tests, onSelect }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Backtesting List</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Strategy</th>
            <th className="py-2 px-4 border-b">Result</th>
            <th className="py-2 px-4 border-b">PNL</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{test.name}</td>
              <td className="py-2 px-4 border-b">{test.strategy}</td>
              <td className="py-2 px-4 border-b">{test.result}</td>
              <td className={`py-2 px-4 border-b ${test.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>{test.pnl}</td>
              <td className="py-2 px-4 border-b">{test.date}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md"
                  onClick={() => onSelect(test)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BacktestingList;
