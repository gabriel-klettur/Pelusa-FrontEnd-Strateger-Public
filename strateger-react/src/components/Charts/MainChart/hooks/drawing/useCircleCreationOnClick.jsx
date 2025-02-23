//Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useCircleCreationOnClick.jsx
import { useDispatch } from 'react-redux';
import { setSelectedChartTool } from '../../../../../redux/interaction';

import { useEffect } from 'react';
import { CircleDrawingTool } from '../../components/DrawingTools/CircleDrawingTool';
import { getClosestCandle } from '../../utils/getClosestCandle';

//TODO Hook encargado de crear un círculo al hacer click en el gráfico
const useCircleCreationOnClick = (
  chartRef,
  candlestickSeriesRef,
  data,
  selectedTool,  
  onNewCircleCreated // Callback para notificar la creación de un nuevo círculo
) => {

  const dispatch = useDispatch();  

  useEffect(() => {        
    if (!chartRef.current || !candlestickSeriesRef.current || selectedTool !== 'circle') return;

    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;

    if (!chart || !series) return;

    const handleChartClick = (param) => {
      const clickX = param.point.x;
      const clickY = param.point.y;

      // Convertir la posición del click a time y price
      const clickedTime = chart.timeScale().coordinateToTime(clickX);
      const clickedPrice = series.coordinateToPrice(clickY);

      // Obtener la vela más cercana usando el helper
      const closestCandle = getClosestCandle(data, clickedTime);
      const candleTime =
        closestCandle[0] > 1e10
          ? Math.floor(closestCandle[0] / 1000)
          : closestCandle[0];

      // Usamos el time de la vela para anclar horizontalmente y el price del click para la posición vertical
      const originalPoint = { time: candleTime, price: clickedPrice };

      // Crear la instancia del círculo
      const newCircle = new CircleDrawingTool(
        chart,
        series,
        originalPoint,
        'green', // Color para indicar que se ha dibujado
        15,      // Radio
        0.5      // Opacidad
      );
      // Guardamos el punto original dentro del objeto para su actualización futura
      newCircle.originalPoint = originalPoint;

      // Actualización inicial para calcular la posición
      newCircle.updateCircle(originalPoint);

      // Adjuntar el círculo al gráfico
      if (typeof series.attachPrimitive === 'function') {
        series.attachPrimitive(newCircle);
      } else if (typeof chart.addPrimitive === 'function') {
        chart.addPrimitive(newCircle);
      } else {
        console.warn("No se encontró método para adjuntar primitivas.");
      }

      // Notificar la creación del nuevo círculo para que el hook principal lo almacene
      if (onNewCircleCreated) onNewCircleCreated(newCircle);

      // Reiniciar la herramienta para volver al estado original
      dispatch(setSelectedChartTool(null));
    };

    chart.subscribeClick(handleChartClick);
    return () => {
      chart.unsubscribeClick(handleChartClick);
    };
  }, [chartRef, candlestickSeriesRef, data, selectedTool, onNewCircleCreated, dispatch]);
};

export default useCircleCreationOnClick;
