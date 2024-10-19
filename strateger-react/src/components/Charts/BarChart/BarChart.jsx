// BarChart.js

import BarChartContainer from './containers/BarChartContainer';

const BarChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {  
  return (
    <>
      <BarChartContainer
        initialTemporalidad={initialTemporalidad}
        startDate={initialStartDate}
        endDate={initialEndDate}        
      />
    </>
  );
};

export default BarChart;
