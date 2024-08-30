// src/components/TradingViewChart/DatePickerComponent.js

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ activeInterval, startDate, onDateChange }) => {
  const [localDate, setLocalDate] = useState(startDate);

  useEffect(() => {
    setLocalDate(startDate);
  }, [startDate]);

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
    <div className="col-span-3 flex justify-right items-center justify-self-end h-12 border-l-4 border-african_violet-500">
      <DatePicker
        selected={localDate}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="yyyy-MM-dd HH:mm:ss"
        className="px-4 h-12 font-semibold transition-colors duration-300 bg-african_violet-200 hover:bg-african_violet-600 text-white text-center"
      />
    </div>
  );
};

export default DatePickerComponent;
