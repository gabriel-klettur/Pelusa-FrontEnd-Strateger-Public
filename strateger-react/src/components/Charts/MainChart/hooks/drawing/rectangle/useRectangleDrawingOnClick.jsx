import useRectangleCreationOnClick from './useRectangleCreationOnClick';
import useRectangleUpdate from './useRectangleUpdate';

const useRectangleDrawingOnClick = (
  chartRef,
  candlestickSeriesRef,
  selectedTool,  
  rectangles,
  setRectangles
) => {
  const handleNewRectangle = (newRect) => {
    setRectangles((prev) => [...prev, newRect]);
  };

  useRectangleCreationOnClick(
    chartRef,
    candlestickSeriesRef,
    selectedTool,    
    handleNewRectangle
  );

  useRectangleUpdate(chartRef, rectangles);

  return rectangles;
};

export default useRectangleDrawingOnClick;
