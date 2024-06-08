//Path: strateger-react/src/App.js

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AlarmList from './components/AlarmList';
import OrderList from './components/OrderList';
import CandleStickChart from './components/CandleChart/CandleChart';

const App = () => {
  const initialTemporalidad = '1d';  // Define el intervalo inicial como '1d'
  
  // Obtener la fecha actual y formatearla
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  // Calcular la fecha de inicio (1440 días antes de la fecha actual)
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 1000);
  const formattedStartDate = startDate.toISOString().slice(0, 19).replace('T', ' ');

  const [startDateState, setStartDateState] = useState(formattedStartDate);
  const [endDate, setEndDate] = useState(formattedCurrentDate);
  const selectedAlarms = useSelector((state) => state.alarms.selectedAlarms);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-10">
        <div className="border-4 border-blue-500">
          <div>
            <CandleStickChart 
              initialTemporalidad={initialTemporalidad}
              initialStartDate={startDateState}
              initialEndDate={endDate}
              setStartDate={setStartDateState}
              setEndDate={setEndDate}
              selectedAlarms={selectedAlarms}
            />
          </div>
        </div>
      </div>
      <div className="border-4 border-orange-500 grid grid-cols-4">
        <div className='border-4 border-green-500 col-span-2'>
          <AlarmList />
        </div>
        <div className='border-4 border-green-500 col-span-2'>
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default App;
