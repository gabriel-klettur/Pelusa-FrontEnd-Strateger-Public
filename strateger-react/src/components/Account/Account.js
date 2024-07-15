// Path: strateger-react/src/components/Account/Account.js

import React from 'react';
import DailyResults from './DailyResults';
import AccountSummary from './AccountSummary/AccountSummary';
import simulatedData from './simulatedData';

const Account = () => {
  const { dailyResults} = simulatedData;

  return (
    <div className="p-4 border-4 border-blue-500 grid grid-cols-1 gap-2">
      <div className="border-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
      </div>

      <AccountSummary />

      <div className="border-4 border-yellow-500">
        <DailyResults results={dailyResults} />
      </div>
      
    </div>
  );
};

export default Account;
