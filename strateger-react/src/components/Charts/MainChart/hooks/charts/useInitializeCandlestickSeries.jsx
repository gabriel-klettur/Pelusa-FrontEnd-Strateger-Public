// src/components/CandlestickChart/hooks/useCandlestickSeries.js
import { useRef, useEffect } from 'react';
import { initialCandlestickSeries } from '../../components/series/candlestickSeries';

const useInitializeCandlestickSeries = (chartRef) => {
  const candlestickSeriesRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      const { candlestickSeries } = initialCandlestickSeries(chartRef.current);
      candlestickSeriesRef.current = candlestickSeries;
    }
  }, [chartRef]);

  return candlestickSeriesRef;
};

export default useInitializeCandlestickSeries;
