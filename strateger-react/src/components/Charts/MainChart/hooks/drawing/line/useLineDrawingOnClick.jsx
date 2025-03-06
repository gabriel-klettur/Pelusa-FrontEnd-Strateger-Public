// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useLineDrawingOnClick.jsx

import useLineCreationOnClick from './useLineCreationOnClick';
import useLineUpdate from './useLineUpdate';

const useLineDrawingOnClick = (
  chartRef,
  candlestickSeriesRef,
  selectedTool,  
  lines,
  setLines
) => {
  // Callback que se ejecuta al crear una nueva línea
  const handleNewLine = (newLine) => {
    setLines((prev) => [...prev, newLine]);
  };

  // Hook para crear la línea a partir de dos clicks
  useLineCreationOnClick(
    chartRef,
    candlestickSeriesRef,
    selectedTool,    
    handleNewLine
  );

  // Hook para actualizar la posición de las líneas al cambiar el rango visible
  useLineUpdate(chartRef, lines);

  return lines;
};

export default useLineDrawingOnClick;
