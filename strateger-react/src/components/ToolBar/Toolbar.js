// Path: strateger-react/src/components/TradingViewChart/Toolbar.js

import { useState, useEffect } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import IntervalBarContainer from './containers/IntervalBarContainer';
import RelojContainer from './containers/RelojContainer';

const Toolbar = ({ initialTemporalidad, startDate, endDate, onDateChange }) => {
  const [currentInterval, setCurrentInterval] = useState(initialTemporalidad); 
  const [localDate, setLocalDate] = useState(startDate);

  useEffect(() => {
    setLocalDate(startDate);
  }, [startDate]);

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

      <IntervalBarContainer
        currentInterval={currentInterval}
        setCurrentInterval={setCurrentInterval}
        startDate={startDate}
        endDate={endDate}
      />

      <div className="grid grid-cols-4 gap-4 h-12 bg-african_violet-300">

        <RelojContainer />
        
        <div className="col-span-2 flex justify-center items-center justify-self-end h-12 border-l-4 border-african_violet-500">
          <DatePicker
            selected={localDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="HH:mm dd-MM-yyyy" 
            className="px-4 h-12 font-semibold transition-colors duration-300 bg-african_violet-200 hover:bg-african_violet-600 text-white text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
