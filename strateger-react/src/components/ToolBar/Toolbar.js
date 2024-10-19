// Path: strateger-react/src/components/TradingViewChart/Toolbar.js

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Reloj from '../common/Reloj';

const Toolbar = ({ currentInterval, handleIntervalChange, startDate, endDate, onDateChange }) => {
  const [localDate, setLocalDate] = useState(startDate);

  useEffect(() => {
    setLocalDate(startDate);
  }, [startDate]);

  const buttonClasses = (interval) =>
    `px-6 font-semibold transition-colors duration-300 ${
      currentInterval === interval
        ? 'bg-african_violet-500 text-white'
        : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'
    }`;

  const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

  const handleDateChange = (date) => {
    setLocalDate(date);
    const newStartDate = new Date(date);
    const newEndDate = new Date(date);

    // Adjust startDate and endDate based on the selected interval
    switch (currentInterval) {
      case '1m':
        newStartDate.setMinutes(newStartDate.getMinutes() - 1000);
        newEndDate.setMinutes(newEndDate.getMinutes() + 1000);
        break;
      case '5m':
        newStartDate.setHours(newStartDate.getHours() - 1000);
        newEndDate.setHours(newEndDate.getHours() + 1000);
        break;
      case '15m':
        newStartDate.setHours(newStartDate.getHours() - 1000);
        newEndDate.setHours(newEndDate.getHours() + 1000);
        break;
      case '30m':
        newStartDate.setHours(newStartDate.getHours() - 1000);
        newEndDate.setHours(newEndDate.getHours() + 1000);
        break;
      case '1h':
        newStartDate.setHours(newStartDate.getHours() - 1000);
        newEndDate.setHours(newEndDate.getHours() + 1000);
        break;
      case '4h':
        newStartDate.setDate(newStartDate.getDate() - 1000);
        newEndDate.setDate(newEndDate.getDate() + 1000);
        break;
      case '1d':
        newStartDate.setDate(newStartDate.getDate() - 1000);
        newEndDate.setDate(newEndDate.getDate() + 1000);
        break;
      case '1w':
        newStartDate.setDate(newStartDate.getDate() - 1000);
        newEndDate.setDate(newEndDate.getDate() + 1000);
        break;
      case '1M':
        newStartDate.setMonth(newStartDate.getMonth() - 32);
        newEndDate.setMonth(newEndDate.getMonth() + 32);
        break;
      default:
        break;
    }

    onDateChange(newStartDate.toISOString(), newEndDate.toISOString());
  };

  return (
    <div className="grid grid-cols-2 h-12 col-span-10 gap-2 bg-african_violet-300 ml-1 mr-1">
      <div className="flex w-full bg-african_violet-300 border-r-4 border-african_violet-500">
        {intervals.map((interval) => (
          <button
            key={interval}
            className={`${buttonClasses(interval)} flex-grow flex-basis-0`} // Asegura que los botones crezcan y ocupen el mismo espacio
            onClick={() => handleIntervalChange(interval)}
          >
            {interval}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4 h-12 bg-african_violet-300">
        <div className="col-span-2 flex justify-center items-center justify-self-end h-12 border-r-4 border-l-4 border-african_violet-500">
          <Reloj direction="down" />
        </div>
        <div className="col-span-2 flex justify-center items-center justify-self-end h-12 border-l-4 border-african_violet-500">
          <DatePicker
            selected={localDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm:ss"
            className="px-4 h-12 font-semibold transition-colors duration-300 bg-african_violet-200 hover:bg-african_violet-600 text-white text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
