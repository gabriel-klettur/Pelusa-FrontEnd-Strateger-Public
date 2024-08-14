// Path: strateger-react/src/components/Account/AccountSummary/AccountSummary.js

import React from 'react';
import { useSelector } from 'react-redux';

import PerpUSDTMSummary from './PerpUSDTMSummary';
import SpotSummary from './SpotSummary';
import PerpCOINMSummary from './PerpCOINMSummary';

import { selectTicker } from '../../../redux/slices/tickerSlice';

const AccountSummary = () => {

  const lastPrice = useSelector((state) => selectTicker(state)['BTC-USDT']);
  return (
    <div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="border-4 border-red-500">
          <PerpUSDTMSummary 
            lastPrice={lastPrice}
          />
        </div>
        <div className="border-4 border-red-500">
          <SpotSummary 
            lastPrice={lastPrice}
          />
        </div>
        <div className="border-4 border-red-500">
          <PerpCOINMSummary
            lastPrice={lastPrice}
           />
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
