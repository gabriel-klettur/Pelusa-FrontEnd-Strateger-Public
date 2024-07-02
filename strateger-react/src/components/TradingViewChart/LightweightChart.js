// src/components/TradingViewChart/LightweightChart.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTradingViewChartData,
  setTradingViewChartParameters,
  selectTradingViewChartData,
  selectTradingViewChartLoading,
  selectTradingViewChartStartDate,
  selectTradingViewChartEndDate,
  selectTradingViewChartInterval,
} from '../../slices/tradingViewChartSlice';
import Toolbar from './Toolbar';
import { initializeChart } from './config/chartConfig';
import { initializeSeries, setSeriesData } from './series/seriesConfig';
import { mapAlarmsToMarkers, sortAndFilterMarkers as sortAndFilterAlarmMarkers } from './markers/Alarms';
import { mapOrdersToMarkers, sortAndFilterMarkers as sortAndFilterOrderMarkers } from './markers/OrdersChart';
import { selectStrategyFilteredAlarms, selectAllSelectedAlarms } from '../../slices/alarmSlice';
import { selectFilteredOrders } from '../../slices/orderSlice';

const LightweightChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectTradingViewChartData);
  const loading = useSelector(selectTradingViewChartLoading);
  const chartStartDate = useSelector(selectTradingViewChartStartDate);
  const chartEndDate = useSelector(selectTradingViewChartEndDate);
  const chartInterval = useSelector(selectTradingViewChartInterval);
  const strategyFilteredAlarms = useSelector(selectStrategyFilteredAlarms);
  const allSelectedAlarms = useSelector(selectAllSelectedAlarms);
  const filteredOrders = useSelector(selectFilteredOrders);

  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();
  const ema10SeriesRef = useRef();
  const ema55SeriesRef = useRef();
  const ema200SeriesRef = useRef();

  const [interval, setInterval] = useState(initialTemporalidad);
  const [startDate, setStartDate] = useState(new Date(initialStartDate));
  const [endDate, setEndDate] = useState(new Date(initialEndDate));

  useEffect(() => {
    if (!chartStartDate || !chartEndDate) {
      dispatch(setTradingViewChartParameters({
        interval: initialTemporalidad,
        startDate: initialStartDate,
        endDate: initialEndDate,
      }));
    }
  }, [dispatch, initialTemporalidad, initialStartDate, initialEndDate, chartStartDate, chartEndDate]);

  useEffect(() => {
    if (chartStartDate && chartEndDate) {
      dispatch(fetchTradingViewChartData({
        interval: chartInterval,
        startDate: chartStartDate,
        endDate: chartEndDate
      }));
    }
  }, [chartStartDate, chartEndDate, chartInterval, dispatch]);

  useEffect(() => {
    chartRef.current = initializeChart(chartContainerRef.current);

    const { candlestickSeries, ema10Series, ema55Series, ema200Series } = initializeSeries(chartRef.current);

    candlestickSeriesRef.current = candlestickSeries;
    ema10SeriesRef.current = ema10Series;
    ema55SeriesRef.current = ema55Series;
    ema200SeriesRef.current = ema200Series;

    return () => chartRef.current.remove();
  }, []);

  useEffect(() => {
    if (data && candlestickSeriesRef.current) {
      setSeriesData(candlestickSeriesRef.current, ema10SeriesRef.current, ema55SeriesRef.current, ema200SeriesRef.current, data);
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current) {
      let alarmMarkers = [];
      if (strategyFilteredAlarms.length > 0) {
        alarmMarkers = mapAlarmsToMarkers(strategyFilteredAlarms, chartInterval);
      } else if (allSelectedAlarms.length > 0) {
        alarmMarkers = mapAlarmsToMarkers(allSelectedAlarms, chartInterval);
      }
      const sortedAlarmMarkers = sortAndFilterAlarmMarkers(alarmMarkers);

      let orderMarkers = [];
      if (filteredOrders.length > 0) {
        orderMarkers = mapOrdersToMarkers(filteredOrders, chartInterval);
      }
      const sortedOrderMarkers = sortAndFilterOrderMarkers(orderMarkers);

      candlestickSeriesRef.current.setMarkers([...sortedAlarmMarkers, ...sortedOrderMarkers]);
    }
  }, [strategyFilteredAlarms, allSelectedAlarms, filteredOrders, chartInterval]);

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    dispatch(setTradingViewChartParameters({
      interval: newInterval,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }));
  };

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
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
          <div className="flex flex-col border-4 border-black p-2">
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

export default LightweightChart;
