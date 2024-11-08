// src/components/CandlestickChart/hooks/useSetCandlestickSeriesData.js
import { useEffect } from 'react';
import { formatChartData, sortAndRemoveDuplicates } from '../utils/chartData';
import { setCandlestickSeriesData } from '../components/series/candlestickSeries';

const useSetCandlestickSeriesData = (data, candlestickSeriesRef) => {
  useEffect(() => {
    if (data && candlestickSeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setCandlestickSeriesData(candlestickSeriesRef.current, sortedData);
    }
  }, [data, candlestickSeriesRef]);
};

export default useSetCandlestickSeriesData;
