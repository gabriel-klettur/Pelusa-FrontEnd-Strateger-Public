// src/components/TradingViewChart/ChartContainer.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useChartData from './hooks/useChartData';
import useChart from './hooks/useChart';
import useMarkers from './hooks/useMarkers';
import { setTradingViewChartParameters } from '../../slices/tradingViewChartSlice';
import Toolbar from './Toolbar';

const ChartContainer = ({ initialTemporalidad, startDate, endDate, onDateChange }) => {
  const dispatch = useDispatch();
  const { data, loading, chartInterval } = useChartData(initialTemporalidad, startDate, endDate);
  const { chartContainerRef, candlestickSeriesRef } = useChart(data);
  useMarkers(candlestickSeriesRef, chartInterval);

  const [interval, setInterval] = useState(initialTemporalidad);

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    dispatch(setTradingViewChartParameters({
      interval: newInterval,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }));
  };

  const handleDateChange = (newStartDate, newEndDate) => {
    onDateChange(newStartDate, newEndDate);
    dispatch(setTradingViewChartParameters({
      interval: interval,
      startDate: newStartDate.toISOString(),
      endDate: newEndDate.toISOString(),
    }));
  };

  return (
    <div className="p-2">
      <Toolbar
        activeInterval={interval}
        onIntervalChange={handleIntervalChange}
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-6 p-1">          
          <div ref={chartContainerRef} className="w-full h-96 border-4 border-black mt-1"></div>
        </div>
        <div className="col-span-4 mt-2">
          <div id="box-cambiadora" className="flex flex-col border-4 border-black p-2">
            RESUME ALL with Tabs:<br></br>
            - Estrategias Activas <br></br>
            - Situacion de cuenta <br></br>
            - Ultimas operaciones <br></br>
            - Ultimas entradas de Diario <br></br>
            - Noticias
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ChartContainer;
