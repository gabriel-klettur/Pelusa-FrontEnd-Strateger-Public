import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedChartTool } from '../../../../../redux/interaction';

import { RectangleDrawingTool } from '../../components/DrawingTools/RectangleDrawingTool';

const useRectangleCreationOnClick = (
  chartRef,
  candlestickSeriesRef,
  selectedTool,  
  onNewRectangleCreated // Callback para notificar la creación del nuevo rectángulo
) => {

  const dispatch = useDispatch();
  // Almacena el primer click (punto de inicio)
  const pendingStartPointRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !candlestickSeriesRef.current || selectedTool !== 'rectangle') {
      return;
    }

    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;

    const handleChartClick = (param) => {

      if (!chartRef.current || !candlestickSeriesRef.current) return;   // 🔹 Previene errores si el gráfico ya no existe

      const clickX = param.point.x;
      const clickY = param.point.y;
      // Convertir la posición del click a time/price
      const clickedTime = chart.timeScale().coordinateToTime(clickX);
      const clickedPrice = series.coordinateToPrice(clickY);

      if (clickedTime === null || clickedPrice === null) {
        console.warn("⚠️ [useRectangleCreationOnClick] Coordenadas inválidas, ignorando clic.");
        return;
      }


      const point = { time: clickedTime, price: clickedPrice };

      if (pendingStartPointRef.current === null) {
        // Primer click: guardar el punto de inicio
        pendingStartPointRef.current = point;
      } else {
        // Segundo click: usar el primer punto y el nuevo punto para crear el rectángulo
        const startPoint = pendingStartPointRef.current;
        const endPoint = point;
        // Crear la instancia del rectángulo (puedes ajustar color, grosor, opacidad y relleno)
        const newRect = new RectangleDrawingTool(
          chart,
          series,
          startPoint,
          endPoint,
          'red',        // Color del borde
          2,            // Grosor
          1.0,          // Opacidad
          'rgba(255,0,0,0.2)' // Relleno (opcional)
        );

        // Adjuntar el rectángulo al gráfico
        if (typeof series.attachPrimitive === 'function') {
          series.attachPrimitive(newRect);
        } else if (typeof chart.addPrimitive === 'function') {
          chart.addPrimitive(newRect);
        } else {
          console.warn("No se encontró método para adjuntar primitivas.");
        }


        // Notificar la creación del nuevo rectángulo
        if (onNewRectangleCreated) onNewRectangleCreated(newRect);
        // Reiniciar el punto pendiente para permitir dibujar otro rectángulo
        pendingStartPointRef.current = null;
        dispatch(setSelectedChartTool(null));          
      }
    };

    chart.subscribeClick(handleChartClick);
    return () => {
      chart.unsubscribeClick(handleChartClick);
    };
  }, [chartRef, candlestickSeriesRef, selectedTool, dispatch, onNewRectangleCreated]);
};

export default useRectangleCreationOnClick;
