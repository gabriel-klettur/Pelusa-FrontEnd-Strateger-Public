// src/components/TradingViewChart/ToolbarCharts.js

import React, { useState } from 'react';
import IntervalPanelButtons from './IntervalPanelButtons';
import Reloj from './Reloj';
import DatePickerComponent from './DatePickerComponent';
import { useDispatch } from 'react-redux';
import { setTradingViewChartParameters } from '../../../../redux/slices/tradingViewChartSlice';

const ToolbarCharts = ({ initialTemporalidad, startDate, endDate, onDateChange }) => {
  const dispatch = useDispatch();
  const [interval, setInterval] = useState(initialTemporalidad);

  // Función que se ejecuta cuando se cambia el intervalo
  const handleIntervalChange = (newInterval) => {
    console.log('Cambio de intervalo', newInterval);
    setInterval(newInterval);
    dispatch(
      setTradingViewChartParameters({
        interval: newInterval,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      })
    );
  };

  // Función que se ejecuta cuando se cambia la fecha
  const handleDateChange = (newStartDate, newEndDate) => {
    onDateChange(newStartDate, newEndDate);
    dispatch(
      setTradingViewChartParameters({
        interval,
        startDate: new Date(newStartDate).toISOString(),
        endDate: new Date(newEndDate).toISOString(),
      })
    );
  };

  return (
    <div className="grid grid-cols-2 h-12 col-span-10 gap-2 bg-african_violet-300 ml-1 mr-1">
      <IntervalPanelButtons
        activeInterval={interval}
        onIntervalChange={handleIntervalChange}
      />
      <div className="grid grid-cols-4 gap-4 h-12 bg-african_violet-300">
        <Reloj direction="down" />
        <DatePickerComponent
          activeInterval={interval}
          startDate={startDate}
          onDateChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default ToolbarCharts;
