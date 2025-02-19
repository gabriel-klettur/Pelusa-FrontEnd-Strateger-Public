// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useDeleteOnClick.jsx

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setSelectedChartTool } from '../../../../../redux/interaction';

// Función auxiliar para calcular la distancia de un punto a un segmento (para líneas y brush)
const getDistancePointToSegment = (px, py, x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
  }
  const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  let closestX, closestY;
  if (t < 0) {
    closestX = x1;
    closestY = y1;
  } else if (t > 1) {
    closestX = x2;
    closestY = y2;
  } else {
    closestX = x1 + t * dx;
    closestY = y1 + t * dy;
  }
  return Math.sqrt((px - closestX) ** 2 + (py - closestY) ** 2);
};

const useDeleteOnClick = (
  chartRef,
  candlestickSeriesRef,
  circles,
  setCircles,
  lines,
  setLines,
  rectangles,
  setRectangles,
  brushStrokes,
  setBrushStrokes,
  textTools,
  setTextTools,
  selectedTool,  
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !chartRef.current ||
      !candlestickSeriesRef.current ||
      selectedTool !== 'delete'
    ) {
      return;
    }

    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;

    const handleChartClick = (param) => {
      const clickX = param.point.x;
      const clickY = param.point.y;

      let primitiveToRemove = null;
      let primitiveType = null; // "circle", "line", "rectangle", "brush" o "text"

      // Buscar en círculos
      for (const circle of circles) {
        const centerX = chart.timeScale().timeToCoordinate(circle.originalPoint.time);
        const centerY = series.priceToCoordinate(circle.originalPoint.price);
        const dx = clickX - centerX;
        const dy = clickY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= circle.radius) {
          primitiveToRemove = circle;
          primitiveType = 'circle';
          break;
        }
      }

      // Buscar en líneas
      if (!primitiveToRemove) {
        for (const line of lines) {
          const startX = chart.timeScale().timeToCoordinate(line.start.time);
          const startY = series.priceToCoordinate(line.start.price);
          const endX = chart.timeScale().timeToCoordinate(line.end.time);
          const endY = series.priceToCoordinate(line.end.price);
          const distance = getDistancePointToSegment(clickX, clickY, startX, startY, endX, endY);
          if (distance <= 5) {
            primitiveToRemove = line;
            primitiveType = 'line';
            break;
          }
        }
      }

      // Buscar en rectángulos
      if (!primitiveToRemove) {
        for (const rect of rectangles) {
          const x1 = chart.timeScale().timeToCoordinate(rect.start.time);
          const y1 = series.priceToCoordinate(rect.start.price);
          const x2 = chart.timeScale().timeToCoordinate(rect.end.time);
          const y2 = series.priceToCoordinate(rect.end.price);
          const rectX = Math.min(x1, x2);
          const rectY = Math.min(y1, y2);
          const rectWidth = Math.abs(x2 - x1);
          const rectHeight = Math.abs(y2 - y1);
          if (
            clickX >= rectX &&
            clickX <= rectX + rectWidth &&
            clickY >= rectY &&
            clickY <= rectY + rectHeight
          ) {
            primitiveToRemove = rect;
            primitiveType = 'rectangle';
            break;
          }
        }
      }

      // Buscar en trazos de brocha
      if (!primitiveToRemove) {
        for (const brush of brushStrokes) {
          let found = false;
          for (const segment of brush.segments) {
            const startX = chart.timeScale().timeToCoordinate(segment.start.time);
            const startY = series.priceToCoordinate(segment.start.price);
            const endX = chart.timeScale().timeToCoordinate(segment.end.time);
            const endY = series.priceToCoordinate(segment.end.price);
            const distance = getDistancePointToSegment(clickX, clickY, startX, startY, endX, endY);
            if (distance <= 5) {
              primitiveToRemove = brush;
              primitiveType = 'brush';
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }

      // Buscar en textos
      if (!primitiveToRemove) {
        for (const textTool of textTools) {
          const textX = chart.timeScale().timeToCoordinate(textTool.point.time);
          const textY = series.priceToCoordinate(textTool.point.price);
          // Suponemos un área de 100x30 píxeles (puedes ajustar según el tamaño de la fuente)
          if (
            clickX >= textX &&
            clickX <= textX + 100 &&
            clickY >= textY - 30 &&
            clickY <= textY
          ) {
            primitiveToRemove = textTool;
            primitiveType = 'text';
            break;
          }
        }
      }

      if (primitiveToRemove) {
        // Eliminar la primitiva del gráfico
        if (typeof series.detachPrimitive === 'function') {
          series.detachPrimitive(primitiveToRemove);
        } else if (typeof chart.removePrimitive === 'function') {
          chart.removePrimitive(primitiveToRemove);
        } else if (typeof primitiveToRemove.dispose === 'function') {
          primitiveToRemove.dispose();
        }

        // Actualizar el estado según el tipo de primitiva
        if (primitiveType === 'circle') {
          setCircles((prev) => prev.filter((c) => c !== primitiveToRemove));
        } else if (primitiveType === 'line') {
          setLines((prev) => prev.filter((l) => l !== primitiveToRemove));
        } else if (primitiveType === 'rectangle') {
          setRectangles((prev) => prev.filter((r) => r !== primitiveToRemove));
        } else if (primitiveType === 'brush') {
          setBrushStrokes((prev) => prev.filter((b) => b !== primitiveToRemove));
        } else if (primitiveType === 'text') {
          setTextTools((prev) => prev.filter((t) => t !== primitiveToRemove));
        }
        dispatch(setSelectedChartTool(null));          
      }
    };

    chart.subscribeClick(handleChartClick);
    return () => {
      chart.unsubscribeClick(handleChartClick);
    };
  }, [
    chartRef,
    candlestickSeriesRef,
    circles,
    lines,
    rectangles,
    brushStrokes,
    textTools,
    selectedTool,
    setCircles,
    setLines,
    setRectangles,
    setBrushStrokes,
    setTextTools,
    dispatch,
  ]);
};

export default useDeleteOnClick;
