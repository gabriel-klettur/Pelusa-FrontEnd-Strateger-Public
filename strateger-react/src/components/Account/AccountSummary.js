// Path: strateger-react/src/components/Account/AccountSummary.js

import React from 'react';

const AccountSummary = ({ pnl, successRate }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Vision Global</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">PNL</h4>
          <p className={`text-2xl ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>{pnl}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Success Rate</h4>
          <p className="text-2xl">{successRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
