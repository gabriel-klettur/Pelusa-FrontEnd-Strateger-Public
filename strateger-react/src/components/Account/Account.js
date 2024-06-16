// Path: strateger-react/src/components/Account/Account.js

import React from 'react';
import DailyResults from './DailyResults';
import StrategyResults from './StrategyResults';
import AccountSummary from './AccountSummary';

const simulatedData = {
  dailyResults: [
    { date: '2024-06-14', pnl: 100 },
    { date: '2024-06-15', pnl: -50 },
    { date: '2024-06-16', pnl: 200 },
  ],
  strategyResults: [
    { strategy: 'Strategy A', pnl: 150, successRate: 75 },
    { strategy: 'Strategy B', pnl: 100, successRate: 60 },
  ],
  pnl: 250,
  successRate: 67,
};

const Account = () => {
  const { dailyResults, strategyResults, pnl, successRate } = simulatedData;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
      <AccountSummary pnl={pnl} successRate={successRate} />
      <DailyResults results={dailyResults} />
      <StrategyResults results={strategyResults} />
    </div>
  );
};

export default Account;
