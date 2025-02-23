// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useTextEditingOnDblClick.jsx

import { useEffect } from 'react';

const useTextEditingOnDblClick = (
  containerRef,
  chartRef,
  candlestickSeriesRef,
  textTools,    // Array de instancias de TextDrawingTool
  setTextTools  // Setter para actualizar el array, si es necesario
) => {
  useEffect(() => {
    if (!chartRef.current || !candlestickSeriesRef.current) return;
    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;
    const container = containerRef.current;

    

    const handleDblClick = (event) => {
      const rect = container.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      let textToEdit = null;
      // Buscamos el texto cuyo área se encuentre cerca del click.
      for (const textTool of textTools) {
        const textX = chart.timeScale().timeToCoordinate(textTool.point.time);
        const textY = series.priceToCoordinate(textTool.point.price);
        // Suponemos un área de 100x30 píxeles; ajusta según sea necesario.
        if (
          clickX >= textX &&
          clickX <= textX + 100 &&
          clickY >= textY - 30 &&
          clickY <= textY
        ) {
          textToEdit = textTool;
          break;
        }
      }

      if (textToEdit) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = textToEdit.text;
        input.style.position = 'absolute';
        input.style.left = `${clickX}px`;
        input.style.top = `${clickY - 30}px`;
        input.style.zIndex = '1000';
        input.style.font = textToEdit.font;
        container.appendChild(input);
        input.focus();

        const handleKeyDown = (e) => {
          if (e.key === 'Enter') {
            const newText = input.value;
            textToEdit.updateText(newText);
            container.removeChild(input);
          }
        };

        input.addEventListener('keydown', handleKeyDown);
        input.addEventListener('blur', () => {
          if (container.contains(input)) {
            container.removeChild(input);
          }
        });
      }
    };

    container.addEventListener('dblclick', handleDblClick);
    return () => {
      container.removeEventListener('dblclick', handleDblClick);
    };
  }, [containerRef, chartRef, candlestickSeriesRef, textTools, setTextTools]);
};

export default useTextEditingOnDblClick;
