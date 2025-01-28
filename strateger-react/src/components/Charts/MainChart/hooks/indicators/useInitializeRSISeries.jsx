//Path: strateger-react/src/components/Charts/MainChart/hooks/indicators/useInitializeRSISeries.jsx

import { useRef, useEffect } from 'react';
import { initializeRSISeries } from '../../components/series/rsiSeries';

const useInitializeRSISeries = (chartRef) => {  
  const rsiSeriesRef = useRef();

  useEffect(() => {    
    if (chartRef.current) {      
      const { rsiSeries } = initializeRSISeries(chartRef.current);
      rsiSeriesRef.current = rsiSeries;
    }
  }, [chartRef]);

  return { rsiSeriesRef };
};

export default useInitializeRSISeries;
