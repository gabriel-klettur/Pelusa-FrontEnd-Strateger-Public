import { useEffect, useRef } from 'react';
import { initializeStochastickSeries } from '../components/series/stochastickSeries';

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

  if (chartRef.current) {
    chartRef.current.priceScale('stochastic').applyOptions({
      visible: true,       
      ticksVisible: true, // Mostrar ticks (equivalente a `drawTicks` de versiones previas)
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
    });
  }


  return { stochasticKSeriesRef, stochasticDSeriesRef };
};

export default useInitializeStochasticSeries;
