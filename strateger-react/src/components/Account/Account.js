// Path: strateger-react/src/components/Account/Account.js

import React from 'react';
import DailyResults from './DailyResults';
import StrategyResults from './StrategyResults';
import PerpUSDTMSummary from './AccountSummary/PerpUSDTMSummary';
import SpotSummary from './AccountSummary/SpotSummary';
import PerpCOINMSummary from './AccountSummary/PerpCOINMSummary';
import simulatedData from './simulatedData';

const Account = () => {
  const { dailyResults, strategyResults } = simulatedData;

  return (
    <div className="p-4 border-4 border-blue-500 grid grid-cols-1 gap-2">
      <div className="border-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border-4 border-red-500">
          <PerpUSDTMSummary />
        </div>

        <div className="border-4 border-red-500">
          <SpotSummary />
        </div>
        <div className="border-4 border-red-500">
          <PerpCOINMSummary />
        </div>
      </div>

      <div className="border-4 border-yellow-500">
        <DailyResults results={dailyResults} />
      </div>
      <div className='border-4 border-purple-500'>
        <StrategyResults results={strategyResults} />
      </div>
    </div>
  );
};

export default Account;
