// Path: strateger-react/src/components/Account/AccountSummary/AccountSummary.js

import React from 'react';
import { useSelector } from 'react-redux';
import PerpUSDTMSummary from './PerpUSDTMSummary';
import SpotSummary from './SpotSummary';
import PerpCOINMSummary from './PerpCOINMSummary';
import { selectTotalBalanceInUSD } from '../../../slices/accountSlice';


const AccountSummary = () => {

  const totalBalanceInUSD = useSelector(selectTotalBalanceInUSD);


  return (
    <div>
      <div className="mb-4 flex justify-center border-4 border-yellow-500">
        <h2 className="text-2xl font-bold">Total Balance in USD: {totalBalanceInUSD !== null ? totalBalanceInUSD.toFixed(2) : 'Loading...'}</h2>
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
    </div>
  );
};

export default AccountSummary;
