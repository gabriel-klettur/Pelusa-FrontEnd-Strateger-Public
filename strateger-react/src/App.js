// Path: strateger-react/src/App.js

import React from 'react';
import AlarmList from './components/AlarmList';
import CandleChart from './components/CandleChart';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <AlarmList />          
        </div>
        <div>
          <CandleChart width={600} height={400} />          
        </div>
      </div>
    </div>
  );
};

export default App;
