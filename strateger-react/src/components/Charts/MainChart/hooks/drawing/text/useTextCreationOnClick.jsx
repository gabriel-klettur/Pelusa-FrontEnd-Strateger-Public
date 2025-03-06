// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useTextCreationOnClick.jsx

import { useEffect } from 'react';
import { TextDrawingTool } from '../../../components/DrawingTools/TextDrawingTool';
import { useDispatch } from 'react-redux';
import { setSelectedChartTool } from '../../../../../../redux/interaction';

const useTextCreationOnClick = (
  containerRef, // Ref del contenedor del gráfico
  chartRef,
  candlestickSeriesRef,
  selectedTool,  
  onNewTextCreated // Callback que recibe la nueva instancia de TextDrawingTool
) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (!chartRef.current || !candlestickSeriesRef.current || selectedTool !== 'text') {
      return;
    }
    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;
    const container = containerRef.current;

    const handleClick = (event) => {
      // Obtenemos la posición del click
      const rect = container.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const time = chart.timeScale().coordinateToTime(clickX);
      const price = series.coordinateToPrice(clickY);
      const point = { time, price };

      // Creamos un input superpuesto en la posición del click
      const input = document.createElement('input');
      input.type = 'text';
      input.style.position = 'absolute';
      input.style.left = `${clickX}px`;
      input.style.top = `${clickY}px`;
      input.style.zIndex = '1000';
      input.style.font = '16px Arial';
      container.appendChild(input);
      input.focus();

      // Función para remover el input de forma segura
      const removeInput = () => {
        input.removeEventListener('keydown', handleKeyDown);
        input.removeEventListener('blur', handleBlur);
        if (input.parentNode) {
          input.parentNode.removeChild(input);
        }
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          const text = input.value;
          if (text.trim() !== '') {
            const newTextTool = new TextDrawingTool(chart, series, point, text, 'black', '16px Arial');
            // Adjuntar la primitiva al gráfico
            if (typeof series.attachPrimitive === 'function') {
              series.attachPrimitive(newTextTool);
            } else if (typeof chart.addPrimitive === 'function') {
              chart.addPrimitive(newTextTool);
            }
            if (onNewTextCreated) {
              onNewTextCreated(newTextTool);
            }
          }
          removeInput();
          dispatch(setSelectedChartTool(null));          
        }
      };

      const handleBlur = () => {
        removeInput();
        dispatch(setSelectedChartTool(null));          
      };

      input.addEventListener('keydown', handleKeyDown);
      input.addEventListener('blur', handleBlur);
    };

    container.addEventListener('click', handleClick);
    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [containerRef, chartRef, candlestickSeriesRef, selectedTool, onNewTextCreated, dispatch]);
};

export default useTextCreationOnClick;
