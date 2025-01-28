//Path: strateger-react/src/components/Charts/MainChart/hooks/indicators/useSetSQZSeriesData.jsx

import { useEffect } from 'react';
import { setSQZSeriesData } from '../../components/series/sqzSeries';
import { formatChartData, sortAndRemoveDuplicates } from '../../utils/chartData';

const useSetSQZSeriesData = (showSeries, data, positiveIncreasingRef, positiveDecreasingRef, negativeDecreasingRef, negativeIncreasingRef, period = 20) => {
  useEffect(() => {
    if (showSeries && positiveIncreasingRef.current && positiveDecreasingRef.current && negativeDecreasingRef.current && negativeIncreasingRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);
      setSQZSeriesData(
        [positiveIncreasingRef.current, positiveDecreasingRef.current],
        [negativeDecreasingRef.current, negativeIncreasingRef.current],
        sortedData,
        period
      );
    } else if (positiveIncreasingRef.current && positiveDecreasingRef.current && negativeDecreasingRef.current && negativeIncreasingRef.current) {
      positiveIncreasingRef.current.setData([]);
      positiveDecreasingRef.current.setData([]);
      negativeDecreasingRef.current.setData([]);
      negativeIncreasingRef.current.setData([]);
    }
  }, [showSeries, data, positiveIncreasingRef, positiveDecreasingRef, negativeDecreasingRef, negativeIncreasingRef, period]);
};

export default useSetSQZSeriesData;