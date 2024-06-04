import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Toolbar = ({ activeInterval, onIntervalChange, startDate, endDate, onDateChange }) => {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  }, [startDate, endDate]);

  const buttonClasses = (interval) =>
    `py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 ${
      activeInterval === interval ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'
    }`;

  const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

  const handleStartDateChange = (date) => {
    setLocalStartDate(date);
    onDateChange(date, localEndDate); // Notify parent about the change
  };

  const handleEndDateChange = (date) => {
    setLocalEndDate(date);
    onDateChange(localStartDate, date); // Notify parent about the change
  };

  return (
    <div className='grid grid-cols-2 gap-2'>
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

      <div className="grid grid-cols-9 mb-4">
        <div className='col-span-1'></div>
        <div className="col-span-4">
          <div>
            <DatePicker
              selected={localStartDate}
              onChange={handleStartDateChange}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              className="py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 bg-orange-500 hover:bg-orange-700 text-white text-center"
            />
          </div>
        </div>
        <div className="col-span-4">
          <div>
            <DatePicker
              selected={localEndDate}
              onChange={handleEndDateChange}
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
