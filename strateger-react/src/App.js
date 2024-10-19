// Path: strateger-react/src/App.js

import React, { useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab, selectSelectedTab } from './redux/tab/tabSlice';
import { loadSlicesInOrder } from './thunks/loadSlices';
import Alarms from './components/Alarms/Alarms';
import Orders from './components/Orders/Orders';
import LightweightChart from './components/TradingViewChart/LightweightChart';
import { StrategyCard } from './components/Strategy';
import { Diary } from './components/Diary';
import { Account } from './components/Account';
import { Position } from './components/Positions';
import { Backtesting } from './components/Backtesting';
import Reloj from './components/common/Reloj';

const App = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectSelectedTab);
  const initialTemporalidad = '1d'; // Define el intervalo inicial como '1d'

  // Obtener la fecha actual y formatearla
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString();

  // Calcular la fecha de inicio (1000 días antes de la fecha actual)
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 1000);
  const formattedStartDate = startDate.toISOString();

  useEffect(() => {
    dispatch(loadSlicesInOrder());
  }, [dispatch]);

  const handleTabChange = (index) => {
    dispatch(setSelectedTab(index));
  };

  return (
    <div className="min-h-screen bg-african_violet-200 text-african_violet-100">
      <div className="w-full"> {/* Usa todo el ancho de la pantalla */}
        <TabGroup selectedIndex={selectedTab} onChange={handleTabChange}>
          <TabList className="flex bg-african_violet-200">
            {[
              'Alarmas',
              'Órdenes',
              'Estrategias',
              'Diario',
              'Account',
              'Positions',
              'Backtesting',
              'Configuración',
            ].map((tabName, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `w-full h-14 text-sm font-medium transition-colors duration-200 ${
                    selected
                      ? 'bg-african_violet-400 shadow text-african_violet-900'
                      : 'text-african_violet-700 hover:bg-african_violet-200 hover:text-african_violet-900'
                  }`
                }
              >
                {tabName}
              </Tab>
            ))}
          </TabList>
          <div className="bg-african_violet-900">
              <LightweightChart
                initialTemporalidad={initialTemporalidad}
                initialStartDate={formattedStartDate}
                initialEndDate={formattedCurrentDate}
              />            
          </div>
          <TabPanels className="">
            <TabPanel className="pt-1 bg-african_violet-800">
              <Alarms />
            </TabPanel>
            <TabPanel className="pt-1  bg-african_violet-800">
              <Orders />
            </TabPanel>
            <TabPanel className="pt-1  bg-african_violet-800">
              <StrategyCard />
            </TabPanel>
            <TabPanel className="pt-1  bg-african_violet-800">
              <Diary />
            </TabPanel>
            <TabPanel className="pt-1  bg-african_violet-800">
              <Account />
            </TabPanel>
            <TabPanel className="pt-1  bg-african_violet-800">
              <Position />
            </TabPanel>
            <TabPanel className="pt-1  bg-african_violet-800">
              <Backtesting />
            </TabPanel>
            <TabPanel className="pt-1  bg-african_violet-800">
              Configuración
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <div className="fixed bottom-4 right-20">
        <Reloj direction="up" />
      </div>
    </div>
  );
};

export default App;
