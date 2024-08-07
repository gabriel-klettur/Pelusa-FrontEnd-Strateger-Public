// Path: strateger-react/src/components/TradingViewChart/Toolbar.js

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Reloj from '../Reloj';

const Toolbar = ({ activeInterval, onIntervalChange, startDate, endDate, onDateChange }) => {
  const [localDate, setLocalDate] = useState(startDate);

  useEffect(() => {
    setLocalDate(startDate);
  }, [startDate]);

  const buttonClasses = (interval) =>
    `py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 ${
      activeInterval === interval 
        ? 'bg-african_violet-500 text-white' 
        : 'bg-english_violet-500 hover:bg-english_violet-700 text-white'
    }`;

  const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

  const handleDateChange = (date) => {
    setLocalDate(date);
    const newStartDate = new Date(date);
    const newEndDate = new Date(date);

    // Adjust startDate and endDate based on the selected interval
    switch (activeInterval) {
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
    <div className='grid grid-cols-2 gap-2'>
      <div className="flex flex-wrap gap-2 p-2 rounded-md">
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

      <div className="grid grid-cols-3">
        <div className="col-span-1  flex justify-center items-center rounded-md">
          <Reloj direction="down" /> {/* Cambia a "down" si quieres que el Popover se despliegue hacia abajo */}
        </div>
        <div className="col-span-1">
        </div>
        <div className="col-span-1 mt-2">
          <div className="absolute h-full z-50 w-full">
          
            <DatePicker
              selected={localDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              className="py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 bg-night-500 hover:bg-night-700 text-white text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
