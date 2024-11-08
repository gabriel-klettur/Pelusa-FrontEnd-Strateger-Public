// src/components/CandlestickChart/hooks/useInitializeChart.js
import { useRef, useEffect } from 'react';
import { initializeChart } from '../config/initializeChart';

const useInitializeChart = (chartContainerRef) => {
  const chartRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = initializeChart(chartContainerRef.current);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [chartContainerRef]);

  return chartRef;
};

export default useInitializeChart;
