// Path: strateger-react/src/components/Account/AccountSummary/AccountSummary.js

import React from 'react';
import PerpUSDTMSummary from './PerpUSDTMSummary';
import SpotSummary from './SpotSummary';
import PerpCOINMSummary from './PerpCOINMSummary';

const AccountSummary = () => {
  return (
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
  );
};

export default AccountSummary;
