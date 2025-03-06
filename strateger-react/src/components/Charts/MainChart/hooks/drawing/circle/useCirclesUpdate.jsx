import { useEffect } from 'react';

const useCirclesUpdate = (chartRef, circles) => {
    useEffect(() => {
      let isMounted = true;
      const currentChart = chartRef.current;
      if (!currentChart) return; // 🔹 Prevenir suscripciones en gráficos eliminados

      const updateAllCircles = () => {
        if (!isMounted || !chartRef.current) return; // 💥 Verificar si el gráfico sigue montado
        circles.forEach((circle) => {          
          if (circle.originalPoint) {
            circle.updateCircle(circle.originalPoint);
          }
        });
      };
    
      if (currentChart) {
        currentChart.timeScale().subscribeVisibleTimeRangeChange(updateAllCircles);
      }

      return () => {
        isMounted = false;
        if (currentChart) {
          currentChart.timeScale().unsubscribeVisibleTimeRangeChange(updateAllCircles);
        }
      };
    }, [chartRef, circles]);
};

export default useCirclesUpdate;
