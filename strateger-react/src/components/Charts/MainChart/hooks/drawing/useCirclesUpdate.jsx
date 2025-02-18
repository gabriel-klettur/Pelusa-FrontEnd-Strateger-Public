//Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useCirclesUpdate.jsx
import { useEffect } from 'react';

//TODO Hook encargado de actualizar la posición de los círculos
const useCirclesUpdate = (chartRef, circles) => {
    useEffect(() => {
      let isMounted = true;
      const currentChart = chartRef.current;
      const updateAllCircles = () => {
        if (!isMounted || !currentChart) return;
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
