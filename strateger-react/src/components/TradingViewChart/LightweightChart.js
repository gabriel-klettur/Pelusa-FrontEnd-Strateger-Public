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
      alarmMarkersRef.current = selectedAlarms.map(alarm => {
        let color, text;

        switch (alarm.Order) {
          case 'order open long':
            color = 'green';
            text = 'Entry Long';
            break;
          case 'order close long':
            color = 'green';
            text = 'Close Long';
            break;
          case 'order open short':
            color = 'red';
            text = 'Entry Short';
            break;
          case 'order close short':
            color = 'red';
            text = 'Close Short';
            break;
          case 'indicator open long':
              color = 'blue';
              text = 'Indicator Open Long';
              break;
          case 'indicator close long':
            color = 'orange';
            text = 'Indicator Close Long';
            break;
          default:
            color = 'black';
            text = '?????';
        }

        return {
          time: Math.floor(new Date(alarm.Time_Alert).getTime() / 1000), // Convertir el tiempo al formato Unix timestamp en segundos
          position: 'aboveBar',
          color: color,
          shape: 'arrowDown',
          text: text
        };
      });

      // Ordenar los marcadores por el campo 'time'
      const sortedMarkers = alarmMarkersRef.current
        .sort((a, b) => a.time - b.time)
        .filter((item, index, array) => {
          if (index === 0 || item.time !== array[index - 1].time) {
            return true;
          } else {
            console.warn("Duplicate time found and removed:", item);
            return false;
          }
        });

      console.log("Sorted markers for chart:", sortedMarkers);
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
