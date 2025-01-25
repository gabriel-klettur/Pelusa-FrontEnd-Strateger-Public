// src/components/CandlestickChart/hooks/useSetCandlestickSeriesData.js
import { useEffect } from 'react';
import { formatChartData, sortAndRemoveDuplicates } from '../../utils/chartData';
import { setCandlestickSeriesData } from '../../components/series/candlestickSeries';

const useSetCandlestickSeriesData = (showCandlestickSerie, data, candlestickSeriesRef) => {
  useEffect(() => {
    if (showCandlestickSerie && data && candlestickSeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setCandlestickSeriesData(candlestickSeriesRef.current, sortedData);
    } else if (candlestickSeriesRef.current) {
      candlestickSeriesRef.current.setData([]);
    }
  }, [data, candlestickSeriesRef, showCandlestickSerie]);
};

export default useSetCandlestickSeriesData;
