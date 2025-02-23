import { useEffect } from 'react';

const useLineUpdate = (chartRef, lines) => {
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const updateAllLines = () => {
      if (!chartRef.current) return; // ⚠️ Evita errores si el gráfico fue eliminado
      lines.forEach((line) => {
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
