// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useLineCreationOnClick.jsx

import { useEffect, useRef } from 'react';
import { LineDrawingTool } from '../../components/DrawingTools/LineDrawingTool';
import { useDispatch } from 'react-redux';
import { setSelectedChartTool } from '../../../../../redux/interaction';

const useLineCreationOnClick = (
  chartRef,
  candlestickSeriesRef,
  selectedTool,  
  onNewLineCreated
) => {

  const dispatch = useDispatch();

  // Ref para almacenar el punto de inicio pendiente (primer click)
  const pendingStartPointRef = useRef(null);

  useEffect(() => {
    // Solo se activa si el modo seleccionado es 'line'
    if (!chartRef.current || !candlestickSeriesRef.current || selectedTool !== 'line') {
      //console.log("1. 🚱 useLineCreationOnClick: No se cumple la condición para activar la herramienta de línea");
      return;
    }

    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;

    const handleChartClick = (param) => {
      //console.log("2. handleChartClick: Click detectado", param);

      const clickX = param.point.x;
      const clickY = param.point.y;
      //console.log("3. Coordenadas del click:", { clickX, clickY });

      // Convertir la posición del click a time y price
      const clickedTime = chart.timeScale().coordinateToTime(clickX);
      const clickedPrice = series.coordinateToPrice(clickY);
      //console.log("4. Coordenadas convertidas a time/price:", { clickedTime, clickedPrice });

      const point = { time: clickedTime, price: clickedPrice };

      if (pendingStartPointRef.current === null) {
        // Primer click: establecer el punto de inicio
        pendingStartPointRef.current = point;
        //console.log("5. Punto de inicio establecido:", point);
      } else {
        // Segundo click: se define el punto final y se crea la línea
        const startPoint = pendingStartPointRef.current;
        const endPoint = point;
        //console.log("6. Punto final establecido:", endPoint, "con punto de inicio:", startPoint);

        // Crear la instancia de la línea (puedes ajustar color, grosor y opacidad)
        const newLine = new LineDrawingTool(chart, series, startPoint, endPoint, 'blue', 2, 1.0);
        //console.log("7. Nueva línea creada:", newLine);

        // Adjuntar la línea al gráfico (igual que en el hook de círculos)
        if (typeof series.attachPrimitive === 'function') {
            series.attachPrimitive(newLine);
            //console.log("Linea adjuntada usando series.attachPrimitive");
        } else if (typeof chart.addPrimitive === 'function') {
            chart.addPrimitive(newLine);
            //console.log("Linea adjuntada usando chart.addPrimitive");
        } else {
            //console.warn("No se encontró método para adjuntar primitivas.");
        }


        // Notificar la creación de la nueva línea
        if (onNewLineCreated) {
          onNewLineCreated(newLine);
          //console.log("8. Callback onNewLineCreated ejecutado.");
        } else {
          //console.log("🚱 No se proporcionó callback onNewLineCreated.");
        }

        // Reiniciar el punto pendiente para permitir dibujar otra línea
        pendingStartPointRef.current = null;
        //console.log("9. Punto de inicio pendiente reiniciado.");
        // Reiniciar la herramienta para volver al estado original
        dispatch(setSelectedChartTool(null));          
      }
    };

    //console.log("10. Subscribiendo al evento click del gráfico para crear línea.");
    chart.subscribeClick(handleChartClick);
    return () => {
      //console.log("11. Desubscribiendo el evento click del gráfico para creación de línea.");
      chart.unsubscribeClick(handleChartClick);
    };
  }, [chartRef, candlestickSeriesRef, selectedTool, onNewLineCreated]);
};

export default useLineCreationOnClick;
