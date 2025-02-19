import { useEffect, useRef } from 'react';
import { DeltaTooltipPrimitive } from '../../plugins/delta-tooltip/delta-tooltip';

/**
 * Hook para manejar el Delta Tooltip.
 *
 * @param {string} selectedTool - La herramienta seleccionada (por ejemplo, 'ruler').
 * @param {object} chartRef - Referencia al chart.
 * @param {object} candlestickSeriesRef - Referencia a la serie donde se adjunta el plugin.
 * @param {Function} resetToolCallback - Callback para resetear la herramienta (por ejemplo, dispatch(setSelectedChartTool(null))).
 */
const useDeltaToolTip = (selectedTool, chartRef, candlestickSeriesRef, resetToolCallback) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && candlestickSeriesRef.current) {
      if (selectedTool === 'ruler') {
        // Si aún no existe, creamos y adjuntamos el tooltip.
        if (!tooltipRef.current) {
          const deltaTooltip = new DeltaTooltipPrimitive({
            lineColor: 'rgba(0, 0, 0, 0.2)',
            // Otras opciones que desees configurar...
          });
          candlestickSeriesRef.current.attachPrimitive(deltaTooltip);
          tooltipRef.current = deltaTooltip;

          const chartElement = chartRef.current.chartElement();

          // Función que se ejecuta al soltar el click o terminar el toque.
          const handleEndInteraction = () => {
            // Limpia los datos del tooltip para eliminar toda traza visual.
            if (tooltipRef.current) {
              tooltipRef.current.setData([], { tooltips: [] });
              // Llama a detached para restaurar las opciones del chart (scroll/scale)
              if (typeof tooltipRef.current.detached === 'function') {
                tooltipRef.current.detached();
              }
              tooltipRef.current = null;
              if (resetToolCallback) {
                resetToolCallback();
              }
            }
            // Remueve los listeners para evitar llamadas múltiples.
            chartElement.removeEventListener('mouseup', handleEndInteraction);
            chartElement.removeEventListener('touchend', handleEndInteraction);
          };

          chartElement.addEventListener('mouseup', handleEndInteraction);
          chartElement.addEventListener('touchend', handleEndInteraction);
        }
      } else {
        // Si se cambia de herramienta, remueve el tooltip si existe.
        if (tooltipRef.current && typeof tooltipRef.current.detached === 'function') {
          tooltipRef.current.detached();
          tooltipRef.current = null;
        }
      }
    }
  }, [selectedTool, chartRef, candlestickSeriesRef, resetToolCallback]);

  return tooltipRef;
};

export default useDeltaToolTip;
