// Path: strateger-react/src/components/Account/AccountInformation/AccountTable.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAccountsData, selectAllAccountsData, selectCoinMTimeData, selectUSDTMTimeData, selectSpotTimeData } from '../../../slices/accountSlice';

const AccountTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(selectAllAccountsData);
  const coinMTimeData = useSelector(selectCoinMTimeData);
  const usdtmTimeData = useSelector(selectUSDTMTimeData);
  const spotTimeData = useSelector(selectSpotTimeData);

  useEffect(() => {
    dispatch(fetchAllAccountsData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  const renderTable = (accounts, title) => (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Account Name</th>
            <th className="border px-4 py-2">Account Type</th>
            <th className="border px-4 py-2">Asset</th>
            <th className="border px-4 py-2">Balance</th>
            <th className="border px-4 py-2">Equity</th>
            <th className="border px-4 py-2">Unrealized Profit</th>
            <th className="border px-4 py-2">Realized Profit</th>
            <th className="border px-4 py-2">Available Margin</th>
            <th className="border px-4 py-2">Used Margin</th>
            <th className="border px-4 py-2">Date Time</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="border px-4 py-2">{account.accountName}</td>
              <td className="border px-4 py-2">{account.accountType}</td>
              <td className="border px-4 py-2">{account.asset}</td>
              <td className="border px-4 py-2">{account.balance}</td>
              <td className="border px-4 py-2">{account.equity}</td>
              <td className="border px-4 py-2">{account.unrealizedProfit}</td>
              <td className="border px-4 py-2">{account.realizedProfit}</td>
              <td className="border px-4 py-2">{account.availableMargin}</td>
              <td className="border px-4 py-2">{account.usedMargin}</td>
              <td className="border px-4 py-2">{new Date(account.dateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {renderTable(data, 'All Accounts')}
      {renderTable(usdtmTimeData, 'Perp USDT-M Accounts')}
      {renderTable(coinMTimeData, 'Perp COIN-M Accounts')}
      {renderTable(spotTimeData, 'Spot Accounts')}
    </div>
  );
};

export default AccountTable;
