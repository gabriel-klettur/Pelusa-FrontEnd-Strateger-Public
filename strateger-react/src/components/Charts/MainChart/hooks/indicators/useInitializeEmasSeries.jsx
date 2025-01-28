//Path: strateger-react/src/components/Charts/MainChart/hooks/useInitializeEmasSeries.jsx
import { useRef, useEffect } from 'react';
import { initializeEmasSeries } from '../../components/series/emasSeries';

const useInitializeEmasSeries = (chartRef) => {
  const ema10SeriesRef = useRef();
  const ema55SeriesRef = useRef();
  const ema200SeriesRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      const { ema10Series, ema55Series, ema200Series } = initializeEmasSeries(chartRef.current);
      ema10SeriesRef.current = ema10Series;
      ema55SeriesRef.current = ema55Series;
      ema200SeriesRef.current = ema200Series;
    }
  }, [chartRef]);

  return { ema10SeriesRef, ema55SeriesRef, ema200SeriesRef };
};

export default useInitializeEmasSeries;
