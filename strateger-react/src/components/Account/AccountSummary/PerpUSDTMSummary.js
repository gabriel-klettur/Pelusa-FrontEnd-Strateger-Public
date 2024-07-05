// Path: strateger-react/src/components/Account/AccountSummary/PerpUSDTMSummary.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerpUSDTMBalance, selectPerpUSDTM } from '../../../slices/accountSlice';
import { selectLastPrice } from '../../../slices/tradingViewChartSlice';
import { Switch } from '@headlessui/react';

const PerpUSDTMSummary = () => {
  const dispatch = useDispatch();
  const { balance, loading, error } = useSelector(selectPerpUSDTM);
  const lastPrice = useSelector(selectLastPrice);
  const [showInUSD, setShowInUSD] = useState(true);

  useEffect(() => {
    dispatch(fetchPerpUSDTMBalance());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!balance) {
    return <div>No balance available</div>;
  }

  const displayValue = (value) => showInUSD ? parseFloat(value).toFixed(2) : (lastPrice ? (parseFloat(value) / lastPrice).toFixed(6) : 'N/A');
  const currencyLabel = showInUSD ? 'USD' : 'BTC';

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">USDT-M Summary</h3>
      <div className="flex items-center mb-4">
        <span className="mr-2">{currencyLabel}</span>
        <Switch
          checked={showInUSD}
          onChange={setShowInUSD}
          className={`${showInUSD ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
        >
          <span className={`${showInUSD ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`} />
        </Switch>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Asset</h4>
          <p className="text-2xl">{showInUSD ? 'USD' : 'BTC'}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Balance</h4>
          <p className="text-2xl">{displayValue(balance.balance)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Equity</h4>
          <p className="text-2xl">{displayValue(balance.equity)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Unrealized Profit</h4>
          <p className="text-2xl">{displayValue(balance.unrealizedProfit)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Realised Profit</h4>
          <p className="text-2xl">{displayValue(balance.realisedProfit)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Available Margin</h4>
          <p className="text-2xl">{displayValue(balance.availableMargin)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Used Margin</h4>
          <p className="text-2xl">{displayValue(balance.usedMargin)}</p>
        </div>
      </div>
    </div>
  );
};

export default PerpUSDTMSummary;
