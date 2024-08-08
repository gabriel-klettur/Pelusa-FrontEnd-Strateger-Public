// Path: strateger-react/src/components/TradingViewChart/ChartContainer.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useChartData from './hooks/useChartData';
import useChart from './hooks/useChart';
import useMarkers from './hooks/useMarkers';
import { setTradingViewChartParameters } from '../../slices/tradingViewChartSlice';
import Toolbar from './Toolbar';
import { selectSelectedTab } from '../../slices/tabSlice';
import ToolAlarmBar from '../Alarms/ToolAlarmBar/ToolAlarmBar';
import ToolOrderBar from '../Orders/ToolOrderBar/ToolOrderBar';
import DiaryCalendar from '../Diary/DiaryCalendar';
import SummaryChart from '../Account/AccountCharts/SummaryChart';
import BacktestingForm from '../Backtesting/BacktestingForm/BacktestingForm';
import LoadingOverlay from '../common/LoadingOverlay/LoadingOverlay';

const ChartContainer = ({ initialTemporalidad, startDate, endDate, onDateChange }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectSelectedTab);
  const { data, loading, chartInterval } = useChartData(initialTemporalidad, new Date(startDate).toISOString(), new Date(endDate).toISOString());
  const { chartContainerRef, candlestickSeriesRef, stochasticChartContainerRef } = useChart(data); // Añadido stochasticChartContainerRef
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

  const simulatedResults = [
    { date: '2024-07-01', pnl: 100 },
    { date: '2024-07-02', pnl: -50 },
    { date: '2024-07-03', pnl: 200 },
    { date: '2024-07-04', pnl: -30 },
    { date: '2024-07-05', pnl: 150 },
    // Añade más datos según sea necesario
  ];  

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <ToolAlarmBar />
        );
      case 1:
        return (
          <ToolOrderBar />
        );
      case 2:
        return (
          'Lista de estrategias activas + Lista de estrategias No activas'
        );
      case 3:
        return (
          <DiaryCalendar results={simulatedResults} />
        );
      case 4:
        return (
          <SummaryChart />
        );
      case 5:
        return 'GRAFICO';
      case 6:
        return (
          <BacktestingForm />
        );
      case 7:
        return '';      
      default:
        return 'Estrategias Activas';
    }
  };

  return (
    <div className="relative p-2">
      <LoadingOverlay isLoading={loading} />
      <Toolbar
        activeInterval={interval}
        onIntervalChange={handleIntervalChange}
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        onDateChange={handleDateChange}
      />
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-6">                    
          <div ref={chartContainerRef} className="w-full h-64 mt-1"></div> {/* Ajusta la altura según sea necesario */}
          <div ref={stochasticChartContainerRef} className="w-full h-32 mt-1"></div> {/* Nuevo contenedor para Stochastic */}
        </div>
        <div className="col-span-4">
          <div id="box-cambiadora" className="flex flex-col p-2">
            {renderTabContent()}
          </div>
        </div>
      </div>      
    </div>
  );
};

export default ChartContainer;
