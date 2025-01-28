//Path: strateger-react/src/components/Charts/MainChart/hooks/indicators/useInitializeSQZSeries.jsx

import { useRef, useEffect } from 'react';
import { initializeSQZSeries } from '../../components/series/sqzSeries';

const useInitializeSQZSeries = (chartRef) => {
  const positiveSeriesRef = useRef();
  const negativeSeriesRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      const { positiveSeries, negativeSeries } = initializeSQZSeries(chartRef.current);
      positiveSeriesRef.current = positiveSeries;
      negativeSeriesRef.current = negativeSeries;
    }
  }, [chartRef]);

  return { positiveSeriesRef, negativeSeriesRef };
};

export default useInitializeSQZSeries;
