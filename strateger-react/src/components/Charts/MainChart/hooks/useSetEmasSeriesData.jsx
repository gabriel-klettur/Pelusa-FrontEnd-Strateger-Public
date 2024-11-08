// src/components/CandlestickChart/hooks/useSetEmasSeriesData.js
import { useEffect } from 'react';
import { setEmasSeriesData } from '../components/series/emasSeries';
import { formatChartData, sortAndRemoveDuplicates } from '../utils/chartData';

const useSetEmasSeriesData = (data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef) => {
  useEffect(() => {
    if (data && ema10SeriesRef.current && ema55SeriesRef.current && ema200SeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setEmasSeriesData(ema10SeriesRef.current, ema55SeriesRef.current, ema200SeriesRef.current, sortedData);
    }
  }, [data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef]);
};

export default useSetEmasSeriesData;
