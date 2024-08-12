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

// Importa las imágenes que quieres usar para cada tab
import alarmImage from './images/alarm.webp';
import ordersImage from './images/orders.webp';
import strategiesImage from './images/strategies.webp';
import diaryImage from './images/diary.webp';
import accountImage from './images/account.webp';
import positionsImage from './images/positions.webp';
import backtestingImage from './images/backtesting.webp';
import settingsImage from './images/settings.webp';

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

  // Mapeo de cada tab a su contenido y atributos específicos de imagen
  const tabContentMap = {
    0: { component: <ToolAlarmBar />, image: alarmImage, maxHeight: 'max-h-30', colLeft: '7', colRight: '3' },
    1: { component: <ToolOrderBar />, image: ordersImage, maxHeight: 'max-h-full', colLeft: '7', colRight: '3' },
    2: { component: null, image: null, maxHeight: 'max-h-30', colLeft: '10', colRight: '0' },
    3: { component: <DiaryCalendar results={simulatedResults} />, image: diaryImage, maxHeight: 'max-h-30', colLeft: '7', colRight: '3' },
    4: { component: <SummaryChart />, image: accountImage, maxHeight: 'max-h-30', colLeft: '7', colRight: '3' },
    5: { component: 'GRAFICO', image: positionsImage, maxHeight: 'max-h-30', colLeft: '7', colRight: '3' },
    6: { component: <BacktestingForm />, image: backtestingImage, maxHeight: 'max-h-30', colLeft: '7', colRight: '3' },
    7: { component: null, image: settingsImage, maxHeight: 'max-h-full', colLeft: '7', colRight: '3' },
  };

  // Extraer los valores correspondientes al tab seleccionado
  const { component, image, maxHeight, colLeft, colRight } = tabContentMap[selectedTab] || {};

  return (
    <div className="relative bg-african_violet-900">
      <LoadingOverlay isLoading={loading} />
      <div className="bg-african_violet-600 pt-1">
        <Toolbar
          activeInterval={interval}
          onIntervalChange={handleIntervalChange}
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="grid grid-cols-10 gap-1 h-30">

        <div className={`col-span-${colLeft} flex flex-col bg-white p-2 rounded-br-lg border-2 border-t border-african_violet-700 mt-1 h-30`}>
          <div
            ref={chartContainerRef}
            className="h-80 flex-grow rounded-t-lg overflow-hidden border-b-2 border-african_violet-700"
          ></div>
          <div
            ref={stochasticChartContainerRef}
            className="h-40 flex-grow mt-2 rounded-b-lg overflow-hidden border-t-2 border-african_violet-700"
          ></div>
        </div>
    
        <div className={`col-span-${colRight} bg-african_violet-300 rounded-bl-lg border-2 border-t border-african_violet-700 mt-1`}>
          <div id="box-cambiadora" className="flex pt-1 flex-col justify-center h-30 bg-african_violet-300">
            {image && (
              <img
                src={image}
                alt={`Banner for tab ${selectedTab}`}
                className={`w-full ${maxHeight} object-cover`}
              />
            )}
            <div className="p-3 flex-grow bg-african_violet-300 rounded-lg">
              {component}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChartContainer;
