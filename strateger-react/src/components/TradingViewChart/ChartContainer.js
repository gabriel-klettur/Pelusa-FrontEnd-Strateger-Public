// ChartContainer.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useChartData from './hooks/useChartData';
import useChart from './hooks/useChart';
import useMarkers from './hooks/useMarkers';
import { setTradingViewChartParameters } from '../../slices/tradingViewChartSlice';
import Toolbar from './Toolbar';
import { selectSelectedTab } from '../../slices/tabSlice';

const ChartContainer = ({ initialTemporalidad, startDate, endDate, onDateChange }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectSelectedTab);
  const { data, loading, chartInterval } = useChartData(initialTemporalidad, new Date(startDate).toISOString(), new Date(endDate).toISOString());
  const { chartContainerRef, candlestickSeriesRef } = useChart(data);
  useMarkers(candlestickSeriesRef, chartInterval);

  const [interval, setInterval] = useState(initialTemporalidad);

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    dispatch(setTradingViewChartParameters({
      interval: newInterval,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    }));
  };

  const handleDateChange = (newStartDate, newEndDate) => {
    onDateChange(newStartDate, newEndDate);
    dispatch(setTradingViewChartParameters({
      interval,
      startDate: newStartDate.toISOString(),
      endDate: newEndDate.toISOString(),
    }));
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return 'Estrategias Activas';
      case 1:
        return 'Situacion de cuenta';
      case 2:
        return 'Ultimas operaciones';
      case 3:
        return 'Ultimas entradas de Diario';
      case 4:
        return 'Noticias';
      default:
        return 'Estrategias Activas';
    }
  };

  return (
    <div className="p-2">
      <Toolbar
        activeInterval={interval}
        onIntervalChange={handleIntervalChange}
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        onDateChange={handleDateChange}
      />
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-6 p-1">          
          <div ref={chartContainerRef} className="w-full h-96 border-4 border-black mt-1"></div>
        </div>
        <div className="col-span-4 mt-2">
          <div id="box-cambiadora" className="flex flex-col border-4 border-black p-2">
            {renderTabContent()}
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ChartContainer;
