//Path: strateger-react/src/components/Charts/MainChart/hooks/indicators/useInitializeSQZSeries.jsx

import { useRef, useEffect } from 'react';
import { initializeSQZSeries } from '../../components/series/sqzSeries';

const useInitializeSQZSeries = (chartRef) => {
  const positiveIncreasingRef = useRef();
  const positiveDecreasingRef = useRef();
  const negativeDecreasingRef = useRef();
  const negativeIncreasingRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      const { positiveSeries, negativeSeries } = initializeSQZSeries(chartRef.current);
      positiveIncreasingRef.current = positiveSeries[0];
      positiveDecreasingRef.current = positiveSeries[1];
      negativeDecreasingRef.current = negativeSeries[0];
      negativeIncreasingRef.current = negativeSeries[1];
    }
  }, [chartRef]);

  return { positiveIncreasingRef, positiveDecreasingRef, negativeDecreasingRef, negativeIncreasingRef };
};

export default useInitializeSQZSeries;
