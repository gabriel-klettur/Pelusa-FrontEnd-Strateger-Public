// LightweightChart.js
import React from 'react';
import useDateRange from './hooks/useDateRange';
import MainChartsContainer from './containers/MainChartsContainer';
import ToolbarCharts from './components/ToolbarCharts/ToolbarCharts';

const MainCharts = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const { startDate, endDate, handleDateChange } = useDateRange(new Date(initialStartDate), new Date(initialEndDate));

  return (
    <div>
      <ToolbarCharts
        initialTemporalidad={initialTemporalidad}
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />


      <MainChartsContainer
        initialTemporalidad={initialTemporalidad}
        startDate={startDate.toISOString()}
        endDate={endDate.toISOString()}        
      />
    </div>
  );
};

export default MainCharts;
