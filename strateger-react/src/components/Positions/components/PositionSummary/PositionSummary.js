// Path: strateger-react/src/components/Account/PositionSummary/PositionSummary.js

import React from 'react';
import PerpUSDTposSummary from './PerpUSDTposSummary';
import PerpCOINMposSummary from './PerpCOINMposSummary';

const PositionSummary = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border-4 border-red-500">
        <PerpUSDTposSummary />
      </div>
        
      <div className="border-4 border-red-500">
        <PerpCOINMposSummary />
      </div>
    </div>
  );
};

export default PositionSummary;
