import useRectangleCreationOnClick from './useRectangleCreationOnClick';
import useRectangleUpdate from './useRectangleUpdate';

const useRectangleDrawingOnClick = (
  chartRef,
  candlestickSeriesRef,
  selectedTool,
  setSelectedTool,
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
    setSelectedTool,
    handleNewRectangle
  );

  useRectangleUpdate(chartRef, rectangles);

  return rectangles;
};

export default useRectangleDrawingOnClick;
