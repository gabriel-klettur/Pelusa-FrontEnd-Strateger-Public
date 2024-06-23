import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTradingViewChartData,
  setTradingViewChartParameters,
  selectTradingViewChartData,
  selectTradingViewChartLoading,
  selectTradingViewChartStartDate,
  selectTradingViewChartEndDate,
  selectTradingViewChartInterval
} from '../../slices/tradingViewChartSlice';
import Toolbar from './Toolbar';
import { initializeChart } from './chartConfig';
import { initializeSeries, setSeriesData } from './seriesConfig';
import { mapAlarmsToMarkers, sortAndFilterMarkers } from './Alarms';

const LightweightChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectTradingViewChartData);
  const loading = useSelector(selectTradingViewChartLoading);
  const chartStartDate = useSelector(selectTradingViewChartStartDate);
  const chartEndDate = useSelector(selectTradingViewChartEndDate);
  const chartInterval = useSelector(selectTradingViewChartInterval);
  const allSelectedAlarms = useSelector(state => state.alarms.allSelectedAlarms || []);  // Asegurar que esté definido

  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();
  const ema10SeriesRef = useRef();
  const ema55SeriesRef = useRef();
  const ema200SeriesRef = useRef();
  const alarmMarkersRef = useRef([]);
  
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
      if (allSelectedAlarms.length > 0) {  // Utiliza todas las alarmas seleccionadas
        alarmMarkersRef.current = mapAlarmsToMarkers(allSelectedAlarms, chartInterval);
        const sortedMarkers = sortAndFilterMarkers(alarmMarkersRef.current);
        candlestickSeriesRef.current.setMarkers(sortedMarkers);
      } else {
        candlestickSeriesRef.current.setMarkers([]);
      }
    }
  }, [allSelectedAlarms, chartInterval]);

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
    <div className="p-4">
      <Toolbar
        activeInterval={interval}
        onIntervalChange={handleIntervalChange}
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />
      <div ref={chartContainerRef} className="w-full h-96 border-4 border-black mt-1"></div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LightweightChart;
