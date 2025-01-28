//Path: strateger-react/src/components/Charts/MainChart/hooks/indicators/useSetSQZSeriesData.jsx

import { useEffect } from 'react';
import { setSQZSeriesData } from '../../components/series/sqzSeries';
import { formatChartData, sortAndRemoveDuplicates } from '../../utils/chartData';

const useSetSQZSeriesData = (showSeries, data, positiveSeriesRef, negativeSeriesRef, period = 20) => {
  useEffect(() => {
    
    if (showSeries && positiveSeriesRef.current && negativeSeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);
      setSQZSeriesData(positiveSeriesRef.current, negativeSeriesRef.current, sortedData, period);
    } else if (positiveSeriesRef.current && negativeSeriesRef.current) {
      positiveSeriesRef.current.setData([]);
      negativeSeriesRef.current.setData([]);
    }
  }, [showSeries, data, positiveSeriesRef, negativeSeriesRef, period]);
};

export default useSetSQZSeriesData;
