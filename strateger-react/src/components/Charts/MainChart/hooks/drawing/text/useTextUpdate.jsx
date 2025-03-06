// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useTextUpdate.jsx

import { useEffect } from 'react';

const useTextUpdate = (chartRef, textTools) => {
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const updateAllTexts = () => {
      if (!chartRef.current) return; // ⚠️ Evita errores si el gráfico fue eliminado
      textTools.forEach((textTool) => {
        textTool.paneViews().forEach(view => view.update());
      });
    };

    chart.timeScale().subscribeVisibleTimeRangeChange(updateAllTexts);
    return () => {
      chart.timeScale().unsubscribeVisibleTimeRangeChange(updateAllTexts);
    };
  }, [chartRef, textTools]);
};

export default useTextUpdate;
