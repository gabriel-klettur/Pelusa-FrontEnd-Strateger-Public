// LightweightChart.js
import React from 'react';
import useDateRange from './hooks/useDateRange';
import ChartContainer from './containers/MainChartsContainer';

const LightweightChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const { startDate, endDate, handleDateChange } = useDateRange(new Date(initialStartDate), new Date(initialEndDate));

  return (
    <ChartContainer
      initialTemporalidad={initialTemporalidad}
      startDate={startDate.toISOString()}
      endDate={endDate.toISOString()}
      onDateChange={handleDateChange}
    />
  );
};

export default LightweightChart;
