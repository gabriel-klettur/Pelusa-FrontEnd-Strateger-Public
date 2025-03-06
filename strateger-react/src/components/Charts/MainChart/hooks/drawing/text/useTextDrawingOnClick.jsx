// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useTextDrawingOnClick.jsx

import useTextCreationOnClick from './useTextCreationOnClick';
import useTextEditingOnDblClick from './useTextEditingOnDblClick';
import useTextUpdate from './useTextUpdate';

const useTextDrawingOnClick = (
  containerRef,
  chartRef,
  candlestickSeriesRef,
  selectedTool,  
  textTools,
  setTextTools
) => {
  const handleNewText = (newTextTool) => {
    setTextTools((prev) => [...prev, newTextTool]);
  };

  useTextCreationOnClick(
    containerRef,
    chartRef,
    candlestickSeriesRef,
    selectedTool,    
    handleNewText
  );

  useTextEditingOnDblClick(
    containerRef,
    chartRef,
    candlestickSeriesRef,
    textTools,
    setTextTools
  );

  useTextUpdate(chartRef, textTools);

  return textTools;
};

export default useTextDrawingOnClick;
