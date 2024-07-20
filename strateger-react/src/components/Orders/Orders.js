import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import OrderList from './OrderList/OrderList';

const Orders = () => {
  return (
    <div className="border-4 border-red-500">      
      <TabGroup>
        <TabList className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Orders Perp USDT-M
          </Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Orders Perp COIN-M
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="bg-white rounded-xl pt-3">
            <OrderList />
          </TabPanel>
          <TabPanel className="bg-white rounded-xl pt-3">            
            <div>
              Waiting for BINGXAPI endpoint implementation
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Orders;
