// Path: strateger-react/src/App.js

import React from 'react';
import AlarmList from './components/AlarmList';
import CandleStickChart from './components/CandleChart/CandleChart';

const App = () => {
  const initialInterval = '1h';  // Define el intervalo inicial

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-10">
        <div className="border-4 border-blue-500 pl-4 pt-4 pb-4">
          <div>
            <h1>Highcharts Candlestick Chart with Annotations</h1>
            <CandleStickChart initialInterval={initialInterval} />
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
