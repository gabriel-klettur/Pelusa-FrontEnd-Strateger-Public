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
  // Ref para guardar la instancia del círculo creado por el click
  const circleRef = useRef(null);

  // 1. useEffect para crear el círculo al hacer click
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

      // Buscar la vela más cercana en "data" (para anclar horizontalmente)
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

      // El punto original: time de la vela (para anclaje) y price del click (posición vertical)
      const originalPoint = { time: candleTime, price: clickedPrice };

      // Crear la instancia del círculo y almacenar el punto original en una propiedad
      const circleTool = new CircleDrawingTool(
        chart,
        series,
        originalPoint,
        'orange', // Color verde para indicar que se ha dibujado
        15,      // Radio
        0.5      // Opacidad
      );
      circleTool.originalPoint = originalPoint; // Guardamos el punto de anclaje

      // Actualización inicial para calcular la posición
      circleTool.updateCircle(originalPoint);

      // Adjuntar el círculo al gráfico
      if (typeof series.attachPrimitive === 'function') {
        series.attachPrimitive(circleTool);        
      } else if (typeof chart.addPrimitive === 'function') {
        chart.addPrimitive(circleTool);        
      } else {
        console.warn("No se encontró método para adjuntar primitivas.");
      }

      // Guardamos la instancia en el ref
      circleRef.current = circleTool;

      // Reiniciamos la herramienta para que el botón vuelva a su estado original
      setSelectedTool(null);
    };

    chart.subscribeClick(handleChartClick);

    return () => {
      chart.unsubscribeClick(handleChartClick);
    };
  }, [chartRef, candlestickSeriesRef, data, selectedTool, setSelectedTool]);

  // 2. useEffect para actualizar la posición del círculo cuando cambie el timeScale
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    // Función que se ejecuta cuando cambia el rango visible
    const updateCircleOnRangeChange = () => {
      if (circleRef.current && circleRef.current.originalPoint) {
        circleRef.current.updateCircle(circleRef.current.originalPoint);        
      }
    };

    chart.timeScale().subscribeVisibleTimeRangeChange(updateCircleOnRangeChange);
    return () => {
      chart.timeScale().unsubscribeVisibleTimeRangeChange(updateCircleOnRangeChange);
    };
  }, [chartRef]);

};

export default useCircleDrawingOnClick;
