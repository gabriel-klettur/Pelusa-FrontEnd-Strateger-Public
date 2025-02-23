import { useRef, useEffect } from 'react';
import { initializeChart } from '../../config/initializeChart';

const useInitializeChart = (chartContainerRef) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 💥 Eliminar gráfico anterior antes de crear uno nuevo
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    chartRef.current = initializeChart(chartContainerRef.current);

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [chartContainerRef]); // ⚠️ Agrega `chartContainerRef` a las dependencias

  return chartRef;
};

export default useInitializeChart;
