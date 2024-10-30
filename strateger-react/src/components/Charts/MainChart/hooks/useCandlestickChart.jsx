import { useEffect, useRef } from 'react';
import { initializeChart } from '../config/chartConfig';

import { initialCandlestickSeries } from '../components/series/candlestickSeries';
import { initializeEmasSeries } from '../components/series/emasSeries';

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

      const { candlestickSeries } = initialCandlestickSeries(chartRef.current);
      const { ema10Series, ema55Series, ema200Series } = initializeEmasSeries(chartRef.current);

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
