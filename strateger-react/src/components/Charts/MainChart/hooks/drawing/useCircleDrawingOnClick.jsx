//Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useCircleDrawingOnClick.jsx
import useCircleCreationOnClick from './useCircleCreationOnClick';
import useCirclesUpdate from './useCirclesUpdate';

//TODO Hook para dibujar círculos al hacer click
const useCircleDrawingOnClick = (
  chartRef,
  candlestickSeriesRef,
  data,
  selectedTool,
  setSelectedTool,
  circles,
  setCircles
) => {    

  // Callback que se ejecuta cuando se crea un nuevo círculo
  const handleNewCircle = (newCircle) => {
    setCircles((prev) => [...prev, newCircle]);
  };

  // Hook para crear círculos al hacer click
  useCircleCreationOnClick(
    chartRef,
    candlestickSeriesRef,
    data,
    selectedTool,
    setSelectedTool,
    handleNewCircle
  );

  // Hook para actualizar la posición de todos los círculos
  useCirclesUpdate(chartRef, circles);

  return circles; // Opcional: puedes retornar la lista de círculos si lo necesitas
};

export default useCircleDrawingOnClick;
