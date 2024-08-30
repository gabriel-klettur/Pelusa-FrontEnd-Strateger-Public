// Path: strateger-react/src/App.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab, selectSelectedTab } from './redux/slices/tabSlice';
import { loadSlicesInOrder } from './thunks/loadSlices';
import Alarms from './components/Alarms/Alarms';
import Orders from './components/Orders/Orders';
import MainCharts from './components/Charts/MainCharts';
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

  const handleButtonClick = (index) => {
    dispatch(setSelectedTab(index));
  };

  const buttonsMap = [
    'Alarmas',
    'Órdenes',
    'Estrategias',
    'Diario',
    'Account',
    'Positions',
    'Backtesting',
    'Config'
  ];

  return (
    <div className="min-h-screen bg-african_violet-200 text-african_violet-100">
      <div className="w-full flex"> {/* Flex para organizar los botones en una fila */}
        {buttonsMap.map((buttonLabel, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`w-full h-14 text-sm font-medium transition-colors duration-200 ${
              selectedTab === index
                ? 'bg-african_violet-400 shadow text-african_violet-900'
                : 'text-african_violet-700 hover:bg-african_violet-200 hover:text-african_violet-900'
            }`}
          >
            {buttonLabel}
          </button>
        ))}
      </div>

      <div>
        <MainCharts
          initialTemporalidad={initialTemporalidad}
          initialStartDate={formattedStartDate}
          initialEndDate={formattedCurrentDate}
        />
      </div>

      <div className="pt-1 bg-african_violet-600">
        {selectedTab === 0 && <Alarms />}
        {selectedTab === 1 && <Orders />}
        {selectedTab === 2 && <StrategyCard />}
        {selectedTab === 3 && <Diary />}
        {selectedTab === 4 && <Account />}
        {selectedTab === 5 && <Position />}
        {selectedTab === 6 && <Backtesting />}
        {selectedTab === 7 && <div>Configuración</div>}
      </div>
      
      <div className="fixed bottom-4 right-20">
        <Reloj direction="up" />
      </div>
    </div>
  );
};

export default App;
