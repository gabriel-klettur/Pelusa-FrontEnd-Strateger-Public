// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useBrushUpdate.jsx

import { useEffect } from 'react';

const useBrushUpdate = (chartRef, brushStrokes) => {
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const updateAllBrushStrokes = () => {
      brushStrokes.forEach((brush) => {
        if (typeof brush.updateBrush === 'function') {
          brush.updateBrush();
        } else {
          brush.paneViews().forEach((view) => view.update());
        }
      });
    };

    chart.timeScale().subscribeVisibleTimeRangeChange(updateAllBrushStrokes);
    return () => {
      chart.timeScale().unsubscribeVisibleTimeRangeChange(updateAllBrushStrokes);
    };
  }, [chartRef, brushStrokes]);
};

export default useBrushUpdate;
