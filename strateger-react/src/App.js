import React, { useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab, selectSelectedTab } from './slices/tabSlice';
import { loadSlicesInOrder } from './thunks/loadSlices';
import Alarms from './components/Alarms/Alarms';
import Orders from './components/Orders/Orders';
import LightweightChart from './components/TradingViewChart/LightweightChart';
import { StrategyList } from './components/Strategy';
import { Diary } from './components/Diary';
import { Account } from './components/Account';
import { Position } from './components/Positions';
import { Backtesting } from './components/Backtesting';
import Reloj from './components/Reloj';

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
    <div>
      <div className="border-4 border-african_violet-500">
        <TabGroup selectedIndex={selectedTab} onChange={handleTabChange}>
          <TabList className="flex bg-english_violet-500/20">
            {['Alarmas', 'Órdenes', 'Estrategias', 'Diario', 'Account', 'Positions', 'Backtesting', 'Configuracion'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium
                  ${selected ? 'bg-african_violet-500 text-white shadow' : 'text-african_violet-200 hover:bg-african_violet-400 hover:text-white'}`
                }
              >
                {tab}
              </Tab>
            ))}
          </TabList>
          <div className="">
            <div className="">
              <LightweightChart
                initialTemporalidad={initialTemporalidad}
                initialStartDate={formattedStartDate}
                initialEndDate={formattedCurrentDate}
              />
            </div>
          </div>
          <TabPanels>
            <TabPanel className="bg-african_violet-100 p-3 shadow-md">
              <Alarms />
            </TabPanel>
            <TabPanel className="bg-african_violet-100 p-3 shadow-md">
              <Orders />
            </TabPanel>
            <TabPanel className="bg-african_violet-100 p-3 shadow-md">
              <StrategyList />
            </TabPanel>
            <TabPanel className="bg-african_violet-100 p-3 shadow-md">
              <Diary />
            </TabPanel>
            <TabPanel className="bg-african_violet-100 p-3 shadow-md">
              <Account />
            </TabPanel>
            <TabPanel className="bg-african_violet-100 p-3 shadow-md">
              <Position />
            </TabPanel>
            <TabPanel className="bg-african_violet-100 p-3 shadow-md">
              <Backtesting />
            </TabPanel>
            <TabPanel className="bg-african_violet-100 p-3 shadow-md">
              Configuracion
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <div className="border-4 border-pomp_and_power-500">
        <Reloj direction="up" /> {/* Cambia a "down" si quieres que el Popover se despliegue hacia abajo */}
      </div>
    </div>
  );
};

export default App;
