import { useEffect, useRef } from 'react';
import { initializeChart } from '../config/chartConfig';
import { initializeSeries } from '../components/series/seriesConfig';

const useCandlestickChart = () => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();
  const ema10SeriesRef = useRef();
  const ema55SeriesRef = useRef();
  const ema200SeriesRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = initializeChart(chartContainerRef.current);

      const { candlestickSeries, ema10Series, ema55Series, ema200Series } = initializeSeries(chartRef.current);

      candlestickSeriesRef.current = candlestickSeries;
      ema10SeriesRef.current = ema10Series;
      ema55SeriesRef.current = ema55Series;
      ema200SeriesRef.current = ema200Series;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  return {
    chartContainerRef,
    chartRef,
    candlestickSeriesRef,
    ema10SeriesRef,
    ema55SeriesRef,
    ema200SeriesRef,
  };
};

export default useCandlestickChart;
