import React from 'react';
import MainChartsContainer from './containers/MainChartsContainer';

const MainCharts = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  return (
    <div>
      <MainChartsContainer
        initialTemporalidad={initialTemporalidad}
        startDate={initialStartDate}
        endDate={initialEndDate}        
      />
    </div>
  );
};

export default MainCharts;
