// Path: strateger-react/src/hooks/utils/useDrawingTools.js
import { useEffect, useState } from 'react';
// Importamos las herramientas de dibujo previamente definidas
import {
  PointDrawingTool,
  LineDrawingTool,
  RectangleDrawingTool,
  CircleDrawingTool,
  BrushDrawingTool
} from '../../components/DrawingTools';

/**
 * Helper para convertir la coordenada Y en precio.
 */
const coordinateToPrice = (chart, y) => {
  const container = chart ? chart.containerElement : null;
  if (!container) return 0;
  const height = container.clientHeight;
  const visiblePriceRange = chart.priceScale().getVisibleRange();
  if (!visiblePriceRange) return 0;
  const { min, max } = visiblePriceRange;
  // Suponiendo que y=0 es la parte superior, se interpola linealmente:
  const price = max - (y / height) * (max - min);
  return price;
};

const useDrawingTools = (chartRef, seriesRef, containerRef, selectedTool) => {
  const [activeTool, setActiveTool] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!chartRef.current || !seriesRef.current || !containerRef.current) return;
    const chart = chartRef.current;
    const container = containerRef.current; // Usamos la ref del contenedor

    const getChartPointFromEvent = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Validación para asegurar que x es un número válido
      if (isNaN(x) || x === null || x === undefined) {
        console.warn("❌ Coordenada X inválida:", x);
        return null;
      }

      const time = chart.timeScale().coordinateToTime(x);
      const price = coordinateToPrice(chart, y);
      return { time, price };
    };

    const handleMouseDown = (e) => {
      if (!selectedTool) return;
      setIsDrawing(true);

      const point = getChartPointFromEvent(e);
      if (!point) return; // Evitar continuar si el punto es inválido

      let toolInstance = null;
      switch (selectedTool) {
        case 'point':
          toolInstance = new PointDrawingTool(chart, seriesRef.current, point, 'red', 15, 0.7);
          break;
        case 'line':
          toolInstance = new LineDrawingTool(chart, seriesRef.current, { start: point, end: point }, 'blue', 2, 1.0);
          break;
        case 'rectangle':
          toolInstance = new RectangleDrawingTool(chart, seriesRef.current, { start: point, end: point }, 'green', 2, 1.0, false);
          break;
        case 'circle':
          toolInstance = new CircleDrawingTool(chart, seriesRef.current, { center: point, edge: point }, 'purple', 2, 1.0, false);
          break;
        case 'brush':
          toolInstance = new BrushDrawingTool(chart, seriesRef.current, { points: [point] }, 'orange', 2, 1.0);
          break;
        default:
          break;
      }
      if (toolInstance) {
        setActiveTool(toolInstance);
        if (typeof seriesRef.current.attachPrimitive === 'function') {
          seriesRef.current.attachPrimitive(toolInstance);
        } else if (typeof chart.addPrimitive === 'function') {
          chart.addPrimitive(toolInstance);
        }
      }
    };

    const handleMouseMove = (e) => {
      if (!isDrawing || !activeTool) return;
      const point = getChartPointFromEvent(e);
      if (!point) return; // Evitar continuar si el punto es inválido

      switch (selectedTool) {
        case 'point':
          activeTool.updatePoint(point);
          break;
        case 'line':
          activeTool.updateLine({ start: activeTool.line.start, end: point });
          break;
        case 'rectangle':
          activeTool.updateRectangle({ start: activeTool.rect.start, end: point });
          break;
        case 'circle':
          activeTool.updateCircle({ center: activeTool.circle.center, edge: point });
          break;
        case 'brush':
          activeTool.addPoint(point);
          break;
        default:
          break;
      }
    };

    const handleMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false);
        setActiveTool(null);
      }
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
    };

  }, [chartRef, seriesRef, containerRef, selectedTool, isDrawing, activeTool]);
};

export default useDrawingTools;
