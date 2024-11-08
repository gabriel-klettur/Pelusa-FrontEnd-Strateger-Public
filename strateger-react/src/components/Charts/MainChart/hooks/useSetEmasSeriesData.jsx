// src/components/CandlestickChart/hooks/useSetEmasSeriesData.js
import { useEffect } from 'react';
import { setEmasSeriesData } from '../components/series/emasSeries';
import { formatChartData, sortAndRemoveDuplicates } from '../utils/chartData';

const useSetEmasSeriesData = (showEmasSerie, data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef) => {
  useEffect(() => {
    if (showEmasSerie && data && ema10SeriesRef.current && ema55SeriesRef.current && ema200SeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setEmasSeriesData(ema10SeriesRef.current, ema55SeriesRef.current, ema200SeriesRef.current, sortedData);
    } else if (ema10SeriesRef.current && ema55SeriesRef.current && ema200SeriesRef.current) {
      ema10SeriesRef.current.setData([]);
      ema55SeriesRef.current.setData([]);
      ema200SeriesRef.current.setData([]);
    }
  }, [data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef, showEmasSerie]);
};

export default useSetEmasSeriesData;
