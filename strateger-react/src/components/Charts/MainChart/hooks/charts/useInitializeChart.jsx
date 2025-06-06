import { useRef, useEffect } from 'react';
import { initializeChart } from '../../config/initializeChart';

const useInitializeChart = (chartContainerRef) => {
  const chartRef = useRef(null); // Inicializar con `null`

  useEffect(() => {
    if (!chartContainerRef.current) return;

    console.log("[DEBUG] Creando nuevo gráfico...");

    // ✅ Si ya hay un gráfico, eliminarlo antes de crear uno nuevo
    if (chartRef.current) {
      console.log("[DEBUG] Eliminando gráfico anterior...");
      chartRef.current.remove();
      chartRef.current = null;
    }

    // ✅ Crear el nuevo gráfico
    chartRef.current = initializeChart(chartContainerRef.current);

    return () => {
      console.log("[DEBUG] Desmontando gráfico...");
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        console.log("[DEBUG] Gráfico eliminado correctamente.");
      }
    };
  }, [chartContainerRef]); 

  return chartRef;
};

export default useInitializeChart;
