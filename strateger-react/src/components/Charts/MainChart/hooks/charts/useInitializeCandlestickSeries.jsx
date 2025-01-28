//Path: strateger-react/src/components/Charts/MainChart/hooks/charts/useInitializeCandlestickSeries.jsx
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
