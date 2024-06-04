//Path: strateger-react/src/components/CandleChart/Toolbar.js

import React from 'react';

const Toolbar = ({ activeInterval, onIntervalChange }) => {
  const buttonClasses = (interval) =>
    `py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 ${
      activeInterval === interval ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'
    }`;

  const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {intervals.map(interval => (
        <button
          key={interval}
          className={buttonClasses(interval)}
          onClick={() => onIntervalChange(interval)}
        >
          {interval}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
