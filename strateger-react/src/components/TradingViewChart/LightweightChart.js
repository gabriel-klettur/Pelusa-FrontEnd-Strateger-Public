// Path: strateger-react/src/components/TradingViewChart/LightweightChart.js

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
  selectTradingViewChartInterval,
} from '../../slices/tradingViewChartSlice';
import Toolbar from './Toolbar';
import { selectSelectedAlarms } from '../../slices/alarmSlice';
import { startCandleUpdateService } from './candleService';

const LightweightChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectTradingViewChartData);
  const loading = useSelector(selectTradingViewChartLoading);
  const chartStartDate = useSelector(selectTradingViewChartStartDate);
  const chartEndDate = useSelector(selectTradingViewChartEndDate);
  const chartInterval = useSelector(selectTradingViewChartInterval);
  const selectedAlarms = useSelector(selectSelectedAlarms);

  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();
  const ema10SeriesRef = useRef();
  const ema55SeriesRef = useRef();
  const ema200SeriesRef = useRef();
  const alarmMarkersRef = useRef([]);
  const [interval, setInterval] = useState(initialTemporalidad);
  const [startDate, setStartDate] = useState(new Date(initialStartDate).getTime());
  const [endDate, setEndDate] = useState(new Date(initialEndDate).getTime());

  useEffect(() => {
    if (!chartStartDate || !chartEndDate) {
      dispatch(setTradingViewChartParameters({
        interval: initialTemporalidad,
        startDate: startDate,
        endDate: endDate,
      }));
    }
  }, [dispatch, initialTemporalidad, startDate, endDate, chartStartDate, chartEndDate]);

  useEffect(() => {
    if (chartStartDate && chartEndDate) {
      if (!data[chartInterval]) {
        dispatch(fetchTradingViewChartData({
          interval: chartInterval,
          startDate: chartStartDate,
          endDate: chartEndDate
        }));
      }
    }
  }, [chartStartDate, chartEndDate, chartInterval, dispatch, data]);

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
    ema10SeriesRef.current = chartRef.current.addLineSeries({
      color: 'blue',      
      lineWidth: 2,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false
    });
    ema55SeriesRef.current = chartRef.current.addLineSeries({
      color: 'orange',
      lineWidth: 2,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false
    });
    ema200SeriesRef.current = chartRef.current.addLineSeries({
      color: 'red',
      lineWidth: 2,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false
    });

    return () => chartRef.current.remove();
  }, []);

  useEffect(() => {
    if (data[chartInterval] && candlestickSeriesRef.current) {
      const formattedData = data[chartInterval].map(item => ({
        time: Math.floor(item[0] / 1000),
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4]
      })).filter(item => item.close !== undefined);

      const sortedData = formattedData
        .sort((a, b) => a.time - b.time)
        .filter((item, index, array) => index === 0 || item.time !== array[index - 1].time);

      console.log("Formatted data for chart:", sortedData);
      candlestickSeriesRef.current.setData(sortedData);

      const ema10Data = calculateEMA(sortedData, 10);
      const ema55Data = calculateEMA(sortedData, 55);
      const ema200Data = calculateEMA(sortedData, 200);

      ema10SeriesRef.current.setData(ema10Data);
      ema55SeriesRef.current.setData(ema55Data);
      ema200SeriesRef.current.setData(ema200Data);
    }
  }, [data, chartInterval]);

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
          time: Math.floor(new Date(alarm.Time_Alert).getTime() / 1000),
          position: 'aboveBar',
          color: color,
          shape: 'arrowDown',
          text: text
        };
      });

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

  useEffect(() => {
    startCandleUpdateService();
  }, []);

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    dispatch(setTradingViewChartParameters({
      interval: newInterval,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    }));
  };

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate.getTime());
    setEndDate(newEndDate.getTime());
    dispatch(setTradingViewChartParameters({
      interval: interval,
      startDate: new Date(newStartDate).toISOString(),
      endDate: new Date(newEndDate).toISOString(),
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

const calculateEMA = (data, period) => {
  const k = 2 / (period + 1);
  let emaArray = [];
  if (data.length > 0) {
    let ema = data[0].close;

    data.forEach((item, index) => {
      if (index === 0) {
        emaArray.push({ time: item.time, value: ema });
      } else {
        ema = item.close * k + ema * (1 - k);
        emaArray.push({ time: item.time, value: ema });
      }
    });
  }
  return emaArray;
};

export default LightweightChart;
