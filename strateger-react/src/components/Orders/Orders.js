import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import OrderList from './OrderList/OrderList';
import ToolOrderBar from './ToolOrderBar/ToolOrderBar';

const Orders = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Order Management</h1>
      <ToolOrderBar />
      <TabGroup>
        <TabList className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Order List
          </Tab>
          <Tab className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
            ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Future Component
          </Tab>
        </TabList>
        <TabPanels className="mt-2">
          <TabPanel className="bg-white rounded-xl p-3">
            <OrderList />
          </TabPanel>
          <TabPanel className="bg-white rounded-xl p-3">
            {/* Aquí puedes añadir otros componentes de tablas */}
            <div>Contenido del futuro componente</div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Orders;
