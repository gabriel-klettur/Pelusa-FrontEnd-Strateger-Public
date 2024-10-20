// BarChart.js

import CandlestickChartContainer from './containers/CandlestickChartContainer';

const CandlestickChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {  
  return (
    <>
      <CandlestickChartContainer
        initialTemporalidad={initialTemporalidad}
        startDate={initialStartDate}
        endDate={initialEndDate}        
      />
    </>
  );
};

export default CandlestickChart;
