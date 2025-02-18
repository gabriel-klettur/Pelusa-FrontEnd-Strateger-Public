// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useLineUpdate.jsx

import { useEffect } from 'react';

const useLineUpdate = (chartRef, lines) => {
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const updateAllLines = () => {
      lines.forEach((line) => {
        // Se asume que la instancia de LineDrawingTool tiene el método updateLine
        // y que almacena sus puntos de inicio y fin en line.start y line.end
        if (line.start && line.end) {
          line.updateLine(line.start, line.end);
        }
      });
    };

    chart.timeScale().subscribeVisibleTimeRangeChange(updateAllLines);
    return () => {
      chart.timeScale().unsubscribeVisibleTimeRangeChange(updateAllLines);
    };
  }, [chartRef, lines]);
};

export default useLineUpdate;
