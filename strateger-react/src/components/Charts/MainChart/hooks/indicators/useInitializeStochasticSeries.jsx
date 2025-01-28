//Path: strateger-react/src/components/Charts/MainChart/hooks/indicators/useInitializeStochasticSeries.jsx
import { useEffect, useRef } from 'react';
import { initializeStochastickSeries } from '../../components/series/stochastickSeries';

const useInitializeStochasticSeries = (chartRef) => {    
  const stochasticKSeriesRef = useRef();
  const stochasticDSeriesRef = useRef();

  useEffect(() => {
    if (chartRef.current) {      
      const { stochasticKSeries, stochasticDSeries } = initializeStochastickSeries(chartRef.current);
      stochasticKSeriesRef.current = stochasticKSeries;
      stochasticDSeriesRef.current = stochasticDSeries;
    }
  
  }, [chartRef]);

  return { stochasticKSeriesRef, stochasticDSeriesRef };
};

export default useInitializeStochasticSeries;
