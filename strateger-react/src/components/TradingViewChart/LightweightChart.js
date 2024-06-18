import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
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
import { selectSelectedAlarms } from '../../slices/alarmSlice'; // Importar las alarmas seleccionadas

const LightweightChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectTradingViewChartData);
  const loading = useSelector(selectTradingViewChartLoading);
  const chartStartDate = useSelector(selectTradingViewChartStartDate);
  const chartEndDate = useSelector(selectTradingViewChartEndDate);
  const chartInterval = useSelector(selectTradingViewChartInterval);
  const selectedAlarms = useSelector(selectSelectedAlarms); // Obtener las alarmas seleccionadas

  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();
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
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#000',
      },
      grid: {
        vertLines: {
          color: '#e1e1e1',
        },
        horzLines: {
          color: '#e1e1e1',
        },
      },
    });

    candlestickSeriesRef.current = chartRef.current.addCandlestickSeries();

    return () => chartRef.current.remove();
  }, []);

  useEffect(() => {
    console.log("Data for chart:", data);
    if (data && candlestickSeriesRef.current) {
      const formattedData = data.map(item => ({
        time: Math.floor(item[0] / 1000), // Convertir el tiempo al formato Unix timestamp en segundos
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4]
      }));

      // Ordenar los datos por el campo 'time' y eliminar duplicados
      const sortedData = formattedData
        .sort((a, b) => a.time - b.time)
        .filter((item, index, array) => index === 0 || item.time !== array[index - 1].time);
      
      console.log("Formatted data for chart:", sortedData);
      candlestickSeriesRef.current.setData(sortedData);
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current && selectedAlarms.length > 0) {
      alarmMarkersRef.current = selectedAlarms.map(alarm => ({
        time: Math.floor(new Date(alarm.Time_Alert).getTime() / 1000), // Convertir el tiempo al formato Unix timestamp en segundos
        position: 'aboveBar',
        color: alarm.Entry_Price_Alert ? 'blue' : 'red',
        shape: 'arrowDown',
        text: alarm.Entry_Price_Alert ? 'Entry' : 'Exit'
      }));

      // Ordenar los marcadores por el campo 'time'
      const sortedMarkers = alarmMarkersRef.current.sort((a, b) => a.time - b.time);

      candlestickSeriesRef.current.setMarkers(sortedMarkers);
    }
  }, [selectedAlarms]);

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
      <div ref={chartContainerRef} className="w-full h-96"></div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LightweightChart;
