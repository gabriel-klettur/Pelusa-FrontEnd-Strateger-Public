// Path: strateger-react/src/components/Account/AccountInformation/AccountTable.js

import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Tablita from '../../common/Tablita';

const AccountTable = ({ loading, error, coinMTimeData, usdtmTimeData, spotTimeData, LoadingOverlay }) => {

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderTable = (accounts, title) => {
    // Definir las columnas para Tablita
    const columns = [
      { label: 'Account Name', key: 'accountName' },
      { label: 'Account Type', key: 'accountType' },
      { label: 'Asset', key: 'asset' },
      { label: 'Balance', key: 'balance' },
      { label: 'Equity', key: 'equity' },
      { label: 'Unrealized Profit', key: 'unrealizedProfit' },
      { label: 'Realized Profit', key: 'realizedProfit' },
      { label: 'Available Margin', key: 'availableMargin' },
      { label: 'Used Margin', key: 'usedMargin' },
      { label: 'Date Time', key: 'dateTime' },
    ];

    // Formatear los datos para Tablita
    const data = accounts.map((account) => ({
      ...account,
      dateTime: new Date(account.dateTime).toLocaleString(),
    }));

    return (
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <Tablita columns={columns} data={data} />
      </div>
    );
  };

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} /> {/* Mostrar overlay de carga */}
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
