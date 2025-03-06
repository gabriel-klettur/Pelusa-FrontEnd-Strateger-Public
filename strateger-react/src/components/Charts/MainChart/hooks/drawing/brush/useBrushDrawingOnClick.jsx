// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useBrushDrawingOnClick.jsx

import useBrushCreationOnClick from './useBrushCreationOnClick';
import useBrushUpdate from './useBrushUpdate';

const useBrushDrawingOnClick = (
  containerRef,
  chartRef,
  candlestickSeriesRef,
  selectedTool,  
  brushStrokes,
  setBrushStrokes
) => {
  // Callback que se ejecuta al terminar un trazo de brocha
  const handleNewBrush = (newBrush) => {
    setBrushStrokes((prev) => [...prev, newBrush]);
  };

  useBrushCreationOnClick(
    containerRef,
    chartRef,
    candlestickSeriesRef,
    selectedTool,    
    handleNewBrush
  );

  useBrushUpdate(chartRef, brushStrokes);

  return brushStrokes;
};

export default useBrushDrawingOnClick;
