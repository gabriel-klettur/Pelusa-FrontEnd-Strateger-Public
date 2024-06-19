import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Toolbar = ({ activeInterval, onIntervalChange, startDate, endDate, onDateChange }) => {
  const [localDate, setLocalDate] = useState(startDate);

  useEffect(() => {
    setLocalDate(startDate);
  }, [startDate]);

  const buttonClasses = (interval) =>
    `py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 ${
      activeInterval === interval ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'
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

    onDateChange(newStartDate, newEndDate);
  };

  return (
    <div className='grid grid-cols-2 gap-2 border-4 border-yellow-200'>
      <div className="flex flex-wrap gap-2 border-4 border-red-400">
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
        <div className="col-span-1 border-4 border-blue-400">
        </div>
        <div className="col-span-1 border-4 border-blue-400">
        </div>
        <div className="col-span-1 border-4 border-blue-400">
          <div className="absolute z-50 w-full">
            <DatePicker
              selected={localDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              className="py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 bg-orange-500 hover:bg-orange-700 text-white text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
