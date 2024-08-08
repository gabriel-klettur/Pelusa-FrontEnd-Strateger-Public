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
import alarmImage from './alarma_v1.webp';

const ChartContainer = ({ initialTemporalidad, startDate, endDate, onDateChange }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectSelectedTab);
  const { data, loading, chartInterval } = useChartData(
    initialTemporalidad,
    new Date(startDate).toISOString(),
    new Date(endDate).toISOString()
  );
  const { chartContainerRef, candlestickSeriesRef, stochasticChartContainerRef } = useChart(data);
  useMarkers(candlestickSeriesRef, chartInterval);

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

  const handleDateChange = (newStartDate, newEndDate) => {
    onDateChange(newStartDate, newEndDate);
    dispatch(
      setTradingViewChartParameters({
        interval,
        startDate: newStartDate.toISOString(),
        endDate: newEndDate.toISOString(),
      })
    );
  };

  const simulatedResults = [
    { date: '2024-07-01', pnl: 100 },
    { date: '2024-07-02', pnl: -50 },
    { date: '2024-07-03', pnl: 200 },
    { date: '2024-07-04', pnl: -30 },
    { date: '2024-07-05', pnl: 150 },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <ToolAlarmBar />;
      case 1:
        return <ToolOrderBar />;
      case 2:
        return 'Lista de estrategias activas + Lista de estrategias No activas';
      case 3:
        return <DiaryCalendar results={simulatedResults} />;
      case 4:
        return <SummaryChart />;
      case 5:
        return 'GRAFICO';
      case 6:
        return <BacktestingForm />;
      case 7:
        return '';
      default:
        return 'Estrategias Activas';
    }
  };

  return (
    <div className="relative bg-african_violet-900">
      <LoadingOverlay isLoading={loading} />
      <Toolbar
        activeInterval={interval}
        onIntervalChange={handleIntervalChange}
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        onDateChange={handleDateChange}
      />
      <div className="grid grid-cols-10 gap-1">
        <div className="grid grid-cols-1 col-span-6 bg-white p-2 rounded-br-lg border-2 border-t border-african_violet-700 mt-1">
          <div
            ref={chartContainerRef}
            className="col-span-10 h-64 rounded-t-lg overflow-hidden border-b-2 border-african_violet-700"
          ></div>
          <div
            ref={stochasticChartContainerRef}
            className="col-span-10 h-32 mt-2 rounded-b-lg overflow-hidden border-t-2 border-african_violet-700"
          ></div>
        </div>

        <div className="col-span-4">
          <div id="box-cambiadora" className="flex h-50 flex-col pt-1">
            <img src={alarmImage} alt="Alarm Banner" className="w-full max-h-60 object-cover" />
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
