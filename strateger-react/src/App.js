import React, { useState } from 'react';
import AlarmList from './components/AlarmList';
import CandleStickChart from './components/CandleChart/CandleChart';

const App = () => {
  const initialTemporalidad = '1d';  // Define el intervalo inicial como '1d'
  const [startDate, setStartDate] = useState("2024-03-01 00:00:00");
  const [endDate, setEndDate] = useState("2024-06-04 23:59:59");

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-10">
        <div className="border-4 border-blue-500 pl-4 pt-4 pb-4">
          <div>
            <CandleStickChart 
              initialTemporalidad={initialTemporalidad}
              initialStartDate={startDate}
              initialEndDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>
      </div>
      <div className="border-4 border-orange-500 grid grid-cols-1 gap-4 mt-4">
        <div>
          <AlarmList />
        </div>
      </div>
    </div>
  );
};

export default App;
