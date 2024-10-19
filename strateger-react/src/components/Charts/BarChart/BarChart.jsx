// BarChart.js

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import useDateRange from './hooks/useDateRange';
import BarChartContainer from './containers/BarChartContainer';

import { setTradingViewChartParameters } from '../../../redux/tradingViewChart/tradingViewChartSlice';

import Toolbar from './components/Toolbar';

const BarChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {

  const dispatch = useDispatch();
  
  const { startDate, endDate, handleDateChange } = useDateRange(new Date(initialStartDate), new Date(initialEndDate));

  const [interval, setInterval] = useState(initialTemporalidad);

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    dispatch(
      setTradingViewChartParameters({
        interval: newInterval,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      })
    );
  };

  return (
    <>
      <div className="bg-african_violet-600 pt-1">
        <Toolbar
          activeInterval={interval}
          onIntervalChange={handleIntervalChange}
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          onDateChange={handleDateChange}
        />
      </div>  
      <BarChartContainer
        initialTemporalidad={initialTemporalidad}
        startDate={startDate.toISOString()}
        endDate={endDate.toISOString()}        
      />
    </>
  );
};

export default BarChart;
