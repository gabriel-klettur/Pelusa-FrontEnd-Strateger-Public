// Path: strateger-react/src/components/Account/AccountInformation/AccountTable.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAccountsData, selectAllAccountsData, selectCoinMTimeData, selectUSDTMTimeData, selectSpotTimeData } from '../../../slices/accountSlice';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'


const AccountTable = () => {
  const dispatch = useDispatch();
  const {loading, error } = useSelector(selectAllAccountsData);
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
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
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

      <TabGroup>
        <TabList className="flex p-1 space-x-1 bg-gray-200 rounded-xl">
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'hover:bg-white/[0.12] hover:text-gray-900'}`
            }
          >
            Perp USDT-M Accounts
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'hover:bg-white/[0.12] hover:text-gray-900'}`
            }
          >
            Perp COIN-M Accounts
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'hover:bg-white/[0.12] hover:text-gray-900'}`
            }
          >
            Spot Accounts
          </Tab>
        </TabList>
        <TabPanels className="mt-2">
          <TabPanel className="p-4 bg-white rounded-xl shadow">
            {renderTable(usdtmTimeData, 'Perp USDT-M Accounts')}
          </TabPanel>
          <TabPanel className="p-4 bg-white rounded-xl shadow">
            {renderTable(coinMTimeData, 'Perp COIN-M Accounts')}
          </TabPanel>
          <TabPanel className="p-4 bg-white rounded-xl shadow">
            {renderTable(spotTimeData, 'Spot Accounts')}
          </TabPanel>
        </TabPanels>
      </TabGroup>        
    </div>
  );
};

export default AccountTable;
