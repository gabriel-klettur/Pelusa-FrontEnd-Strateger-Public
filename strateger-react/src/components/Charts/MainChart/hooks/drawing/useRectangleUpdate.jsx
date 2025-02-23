import { useEffect } from 'react';

const useRectangleUpdate = (chartRef, rectangles) => {
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const updateAllRectangles = () => {
      if (!chartRef.current) return; // ⚠️ Evita errores si el gráfico fue eliminado
      rectangles.forEach((rect) => {
        if (rect.start && rect.end) {
          rect.updateRectangle(rect.start, rect.end);
        }
      });
    };

    chart.timeScale().subscribeVisibleTimeRangeChange(updateAllRectangles);
    return () => {
      chart.timeScale().unsubscribeVisibleTimeRangeChange(updateAllRectangles);
    };
  }, [chartRef, rectangles]);
};

export default useRectangleUpdate;
