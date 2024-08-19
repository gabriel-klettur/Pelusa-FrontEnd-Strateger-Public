// Path: strateger-react/src/components/Orders/Orders.js

import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import OrderList from './components/OrderList/OrderList';

const Orders = () => {
  const [viewType, setViewType] = useState('Orders Perp USDT-M');

  return (
    <div className="bg-african_violet-400 text-sm"> {/* Set text-sm here for consistency */}
      <TabGroup>
        <TabList className="flex justify-start bg-african_violet-300">
          <Tab
            onClick={() => setViewType('Orders Perp USDT-M')}
            className={({ selected }) =>
              `px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${
                selected || viewType === 'Orders Perp USDT-M'
                  ? 'bg-african_violet-500 text-white'
                  : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'
              }`
            }
          >
            Orders Perp USDT-M
          </Tab>
          <Tab
            onClick={() => setViewType('Orders Perp COIN-M')}
            className={({ selected }) =>
              `px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${
                selected || viewType === 'Orders Perp COIN-M'
                  ? 'bg-african_violet-500 text-white'
                  : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'
              }`
            }
          >
            Orders Perp COIN-M
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>

            <OrderList />       {/* This is the component that will display Perpr USDT-M Orders */}
            
          </TabPanel>
          <TabPanel>

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
