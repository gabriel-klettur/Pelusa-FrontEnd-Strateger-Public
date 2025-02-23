// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useBrushCreationOnClick.jsx

import { useEffect, useRef } from 'react';
import { BrushDrawingTool } from '../../components/DrawingTools/BrushDrawingTool';
import { setSelectedChartTool } from '../../../../../redux/interaction';

import { useDispatch } from 'react-redux';

const useBrushCreationOnClick = (
  containerRef,  // Nuevo parámetro: ref del contenedor del gráfico
  chartRef,
  candlestickSeriesRef,
  selectedTool,
  onNewBrushCreated // Callback para notificar la creación de un nuevo trazo de brocha
) => {

  const dispatch = useDispatch();

  const isDrawingRef = useRef(false);
  const currentBrushRef = useRef(null);
  const lastPointRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !candlestickSeriesRef.current || selectedTool !== 'brush') {
      return;
    }

    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;
    // Usamos el ref del contenedor pasado desde el contenedor principal
    const container = containerRef.current;

    const handleMouseDown = (event) => {
      if (!chartRef.current || !candlestickSeriesRef.current) return; // ⚠️ Validación extra

      isDrawingRef.current = true;
      const rect = container.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      
      const startTime = chart.timeScale().coordinateToTime(clickX);
      const startPrice = series.coordinateToPrice(clickY);

      if (startTime === null || startPrice === null) {
        console.warn("⚠️ [useBrushCreationOnClick] Coordenadas inválidas, ignorando clic.");
        return;
      }

      const startPoint = { time: startTime, price: startPrice };

      lastPointRef.current = startPoint;
      // Creamos una nueva instancia de BrushDrawingTool
      const newBrush = new BrushDrawingTool(chart, series, startPoint, startPoint, 'red', 3, 1.0);
      
      // Adjuntamos la primitiva al gráfico desde el hook
      if (typeof series.attachPrimitive === 'function') {
        series.attachPrimitive(newBrush);
        //console.log("useBrushCreationOnClick: attached brush using series.attachPrimitive");
      } else if (typeof chart.addPrimitive === 'function') {
        chart.addPrimitive(newBrush);
        //console.log("useBrushCreationOnClick: attached brush using chart.addPrimitive");
      } else {
        console.warn("useBrushCreationOnClick: no method found to attach brush primitive");
      }

      currentBrushRef.current = newBrush;
    };

    const handleMouseMove = (event) => {
        event.preventDefault();
        event.stopPropagation();
      if (!isDrawingRef.current || !currentBrushRef.current || !lastPointRef.current) return;

      const rect = container.getBoundingClientRect();
      const moveX = event.clientX - rect.left;
      const moveY = event.clientY - rect.top;
      
      const moveTime = chart.timeScale().coordinateToTime(moveX);
      const movePrice = series.coordinateToPrice(moveY);

      if (moveTime === null || movePrice === null) return;
      
      const newPoint = { time: moveTime, price: movePrice };

      // Agregamos un segmento al trazo
      currentBrushRef.current.addSegment(lastPointRef.current, newPoint);
      lastPointRef.current = newPoint;
    };

    const handleMouseUp = () => {
      isDrawingRef.current = false;
      if (currentBrushRef.current) {
        if (onNewBrushCreated) onNewBrushCreated(currentBrushRef.current);
      }
      currentBrushRef.current = null;
      lastPointRef.current = null;
      // Opcional: desactivar la herramienta automáticamente
      dispatch(setSelectedChartTool(null));          
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [containerRef, chartRef, candlestickSeriesRef, selectedTool, dispatch, onNewBrushCreated]);
};

export default useBrushCreationOnClick;
