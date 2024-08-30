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
import Reloj from './components/common/utils/Reloj';
import ToolbarCharts from './components/Charts/components/ToolbarCharts/ToolbarCharts';
import useDateRange from './components/Charts/hooks/useDateRange';

import alarmImage from './components/Charts/images/alarm.webp';
import ordersImage from './components/Charts/images/orders.webp';
import positionsImage from './components/Charts/images/positions.webp';
import backtestingImage from './components/Charts/images/backtesting.webp';

import ToolAlarmBar from './components/Alarms/components/AlarmToolPanel/AlarmToolPanel';
import ToolOrderBar from './components/Orders/components/ToolOrderBar/ToolOrderBar';
import DiaryCalendar from './components/Diary/components/DiaryCalendar/DiaryCalendar';
import SummaryChart from './components/Account/components/AccountSummary/AccountSummary';
import BacktestingForm from './components/Backtesting/components/BacktestingForm/BacktestingForm';

const App = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectSelectedTab);
  const initialTemporalidad = '1d'; // Define el intervalo inicial como '1d'

  // Obtener la fecha actual y formatearla
  const currentDate = new Date();
  
  // Calcular la fecha de inicio (1000 días antes de la fecha actual)
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 1000);

  // Hook de rango de fechas
  const { startDate: selectedStartDate, endDate: selectedEndDate, handleDateChange } = useDateRange(startDate, currentDate);

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

  // Mapeo de cada tab a su contenido y atributos específicos de imagen
  const tabContentMap = {
    0: { component: <ToolAlarmBar />, image: alarmImage, ImageHeight: 'h-64', componentHeight: 'h-32', leftContainerSpan: 'col-span-8', rightContainerSpan: 'col-span-2' },
    1: { component: <ToolOrderBar />, image: ordersImage, ImageHeight: 'h-96', componentHeight: 'h-32', leftContainerSpan: 'col-span-8', rightContainerSpan: 'col-span-2' },
    2: { component: null, image: null, ImageHeight: 'h-0', componentHeight: 'h-0', leftContainerSpan: 'col-span-10', rightContainerSpan: 'col-span-0' },
    3: { component: <DiaryCalendar results={[]} />, image: null, ImageHeight: 'h-0', componentHeight: 'h-32', leftContainerSpan: 'col-span-8', rightContainerSpan: 'col-span-2' },
    4: { component: <SummaryChart />, image: null, ImageHeight: 'max-h-64', componentHeight: 'h-64', leftContainerSpan: 'col-span-7', rightContainerSpan: 'col-span-3' },
    5: { component: 'GRAFICO', image: positionsImage, ImageHeight: 'max-h-64', componentHeight: 'h-64', leftContainerSpan: 'col-span-7', rightContainerSpan: 'col-span-3' },
    6: { component: <BacktestingForm />, image: backtestingImage, ImageHeight: 'h-32', componentHeight: 'h-64', leftContainerSpan: 'col-span-7', rightContainerSpan: 'col-span-3' },
    7: { component: null, image: null, ImageHeight: 'max-h-full', componentHeight: 'h-64', leftContainerSpan: 'col-span-7', rightContainerSpan: 'col-span-3' },
  };

  // Extraer los valores correspondientes al tab seleccionado
  const { component, image, ImageHeight, componentHeight, leftContainerSpan, rightContainerSpan } = tabContentMap[selectedTab];

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

      <div className="pt-1 bg-african_violet-600">
        <ToolbarCharts
          initialTemporalidad={initialTemporalidad}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          onDateChange={handleDateChange}
        />
      </div>

      <div className="grid grid-cols-10 gap-1">
        
        {/* LEFT - Contenedor del gráfico y el indicador estocástico*/}
        <div className={`" ${leftContainerSpan} flex flex-col bg-white p-2 rounded-br-lg mt-1 "`}>
          <MainCharts
            initialTemporalidad={initialTemporalidad}
            initialStartDate={selectedStartDate.toISOString()}
            initialEndDate={selectedEndDate.toISOString()}
          />
        </div>

        {/* RIGHT - Contenedor del tab seleccionado */}
        <div className={`" ${rightContainerSpan} flex flex-col bg-african_violet-600 rounded-bl-lg mt-1 "`}> 
          <div id="box-cambiadora" className="flex flex-col justify-center flex-grow min-h-full">
            
            {/* Muestra la imagen correspondiente al tab seleccionado */}            
            <div className={`" flex justify-center w-full ${ImageHeight} "`}>
              {image && (
                <img
                  src={image}
                  alt={` Banner for tab ${selectedTab} `}
                  className="object-cover"  // Utiliza ImageHeight definido para controlar la altura
                />
              )}
            </div>

            {/* Muestra el contenido correspondiente al tab seleccionado */}
            <div className={`" flex-auto ${componentHeight} bg-african_violet-300 rounded-lg "`}>
              {component}
            </div>
          </div>
        </div>
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
