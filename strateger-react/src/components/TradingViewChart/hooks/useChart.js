// src/components/TradingViewChart/hooks/useChart.js
import { useEffect, useRef } from 'react';
import { initializeChart } from '../config/chartConfig';
import { initializeSeries, setSeriesData } from '../series/seriesConfig';

const useChart = (data) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();
  const ema10SeriesRef = useRef();
  const ema55SeriesRef = useRef();
  const ema200SeriesRef = useRef();

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

  return { chartContainerRef, candlestickSeriesRef };
};

export default useChart;
