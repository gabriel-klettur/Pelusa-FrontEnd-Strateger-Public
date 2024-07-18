// src/components/TradingViewChart/LightweightChart.js
import React from 'react';
import useDateRange from './hooks/useDateRange';
import ChartContainer from './ChartContainer';

const LightweightChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const { startDate, endDate, handleDateChange } = useDateRange(initialStartDate, initialEndDate);

  return (
    <ChartContainer
      initialTemporalidad={initialTemporalidad}
      startDate={startDate}
      endDate={endDate}
      onDateChange={handleDateChange}
    />
  );
};

export default LightweightChart;
