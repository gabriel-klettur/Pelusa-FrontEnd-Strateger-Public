// Path: strateger-react/src/hooks/drawing/useCircleDrawingOnClick.js
import { useEffect, useRef } from 'react';
import { CircleDrawingTool } from '../../components/CircleDrawingTool';

const useCircleDrawingOnClick = (
  chartRef,
  candlestickSeriesRef,
  data,
  selectedTool,
  setSelectedTool
) => {
  // Ref para almacenar todas las instancias de círculos creados
  const circlesRef = useRef([]);
  // Ref para llevar un contador de IDs
  const idCounterRef = useRef(0);

  useEffect(() => {
    if (
      !chartRef.current ||
      !candlestickSeriesRef.current ||
      selectedTool !== 'circle'
    )
      return;

    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;

    const handleChartClick = (param) => {
      const clickX = param.point.x; // Coordenada X del click
      const clickY = param.point.y; // Coordenada Y del click

      // Convertir la posición del click a time y price
      const clickedTime = chart.timeScale().coordinateToTime(clickX);
      const clickedPrice = series.coordinateToPrice(clickY);

      // Buscar la vela más cercana en "data"
      let closestCandle = data[0];
      let minDiff = Infinity;
      data.forEach((candle) => {
        const candleTime =
          candle[0] > 1e10 ? Math.floor(candle[0] / 1000) : candle[0];
        const diff = Math.abs(candleTime - clickedTime);
        if (diff < minDiff) {
          minDiff = diff;
          closestCandle = candle;
        }
      });

      console.log("Click in Chart - Time:", clickedTime, "Price:", clickedPrice);
      console.log("Closest Candle:", closestCandle);

      // Para el anclaje horizontal usamos el time de la vela más cercana
      const candleTime =
        closestCandle[0] > 1e10
          ? Math.floor(closestCandle[0] / 1000)
          : closestCandle[0];

      // Usamos el time de la vela y el price del click
      const originalPoint = { time: candleTime, price: clickedPrice };

      // Incrementar y asignar un ID único al círculo
      const circleId = idCounterRef.current++;
      
      // Crear la instancia del círculo y almacenar el punto original
      const circleTool = new CircleDrawingTool(
        chart,
        series,
        originalPoint,
        'green', // Color verde para indicar que se ha dibujado
        15,      // Radio
        0.5      // Opacidad
      );
      circleTool.originalPoint = originalPoint;
      circleTool.id = circleId;  // Asignamos el ID

      // Actualización inicial para calcular la posición
      circleTool.updateCircle(originalPoint);

      // Adjuntar el círculo al gráfico
      if (typeof series.attachPrimitive === 'function') {
        series.attachPrimitive(circleTool);
        console.log(`Círculo ${circleId} adjuntado a la serie de velas.`);
      } else if (typeof chart.addPrimitive === 'function') {
        chart.addPrimitive(circleTool);
        console.log(`Círculo ${circleId} adjuntado al gráfico.`);
      } else {
        console.warn("No se encontró método para adjuntar primitivas.");
      }

      // Agregar la nueva instancia al array de círculos
      circlesRef.current.push(circleTool);

      // Reiniciamos la herramienta para que el botón vuelva a su estado original
      setSelectedTool(null);
    };

    chart.subscribeClick(handleChartClick);

    return () => {
      chart.unsubscribeClick(handleChartClick);
    };
  }, [chartRef, candlestickSeriesRef, data, selectedTool, setSelectedTool]);

  // Suscribirse a cambios en el timeScale para actualizar TODOS los círculos
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const updateAllCircles = () => {
      circlesRef.current.forEach((circle) => {
        if (circle.originalPoint) {
          circle.updateCircle(circle.originalPoint);
          console.log(`Círculo ${circle.id} actualizado con:`, circle.originalPoint);
        }
      });
    };

    chart.timeScale().subscribeVisibleTimeRangeChange(updateAllCircles);
    return () => {
      chart.timeScale().unsubscribeVisibleTimeRangeChange(updateAllCircles);
    };
  }, [chartRef]);
};

export default useCircleDrawingOnClick;
