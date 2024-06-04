import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Toolbar component for selecting chart intervals.
 *
 * @param {Object} props - The component props.
 * @param {string} props.activeInterval - The currently active interval.
 * @param {Function} props.onIntervalChange - The callback function to handle interval change.
 * @param {Function} props.onStartDateChange - The callback function to handle start date change.
 * @param {Function} props.onEndDateChange - The callback function to handle end date change.
 * @returns {JSX.Element} The rendered Toolbar component.
 */
const Toolbar = ({ activeInterval, onIntervalChange, onStartDateChange, onEndDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const buttonClasses = (interval) =>
    `py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 ${
      activeInterval === interval ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'
    }`;

  const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onStartDateChange(date.toISOString().slice(0, 19).replace('T', ' '));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onEndDateChange(date.toISOString().slice(0, 19).replace('T', ' '));
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
        <div className='col-span-3'></div>
        <div className="col-span-3">
          <div>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              className="py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 bg-orange-500 hover:bg-orange-700 text-white"
            />
          </div>
        </div>
        <div className="col-span-3">
          <div>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              className="py-2 px-4 rounded-lg shadow-md font-bold transition duration-300 bg-orange-500 hover:bg-orange-700 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
