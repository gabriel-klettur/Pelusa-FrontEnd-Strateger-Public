// Path: strateger-react/src/hooks/useDeltaToolTip.jsx
import { useEffect, useRef } from 'react';
import { DeltaTooltipPrimitive } from '../../plugins/delta-tooltip/delta-tooltip';

const useDeltaToolTip = (selectedTool, chartRef, candlestickSeriesRef) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && candlestickSeriesRef.current) {
      if (selectedTool === 'ruler') {
        // Solo creamos el tooltip si aún no existe
        if (!tooltipRef.current) {
          console.log('📏 Herramienta de regla seleccionada');
          const deltaTooltip = new DeltaTooltipPrimitive({
            lineColor: 'rgba(0, 0, 0, 0.2)',
            // Puedes agregar otras opciones aquí
          });
          candlestickSeriesRef.current.attachPrimitive(deltaTooltip);
          tooltipRef.current = deltaTooltip;
        }
      } else {
        // Si la herramienta ya no es "ruler", desmontamos el tooltip (si existe)
        if (tooltipRef.current && typeof tooltipRef.current.detached === 'function') {
          tooltipRef.current.detached();
          tooltipRef.current = null;
        }
      }
    }
  }, [selectedTool, chartRef, candlestickSeriesRef]);

  return tooltipRef;
};

export default useDeltaToolTip;
