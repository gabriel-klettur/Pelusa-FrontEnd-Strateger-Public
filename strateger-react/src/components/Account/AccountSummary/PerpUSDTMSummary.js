// Path: strateger-react/src/components/Account/PerpUSDTMSummary.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '../../../slices/accountSlice';

const PerpUSDTMSummary = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.account.balance);
  const loading = useSelector((state) => state.account.loading);
  const error = useSelector((state) => state.account.error);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">USDT-M Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">User ID</h4>
          <p className="text-2xl">{balance.userId}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Asset</h4>
          <p className="text-2xl">{balance.asset}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Balance</h4>
          <p className="text-2xl">{balance.balance}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Equity</h4>
          <p className="text-2xl">{balance.equity}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Unrealized Profit</h4>
          <p className="text-2xl">{balance.unrealizedProfit}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Realised Profit</h4>
          <p className="text-2xl">{balance.realisedProfit}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Available Margin</h4>
          <p className="text-2xl">{balance.availableMargin}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Used Margin</h4>
          <p className="text-2xl">{balance.usedMargin}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Freezed Margin</h4>
          <p className="text-2xl">{balance.freezedMargin}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Short UID</h4>
          <p className="text-2xl">{balance.shortUid}</p>
        </div>
      </div>
    </div>
  );
};

export default PerpUSDTMSummary;
