// Path: src/hooks/useDrawInChart.js
import { useEffect } from 'react';
import { PointDrawingTool } from '../../components/PointDrawingTool';

const useExampleDrawInChart = (chartRef, candlestickSeriesRef, data, isChartReady) => {
    useEffect(() => {

        //! 1. Verificamos las condiciones iniciales
        if (!isChartReady || data.length === 0) return;
    
        //! 2. Seleccionamos el punto de refencia (vela)
        const selectedData = data[10];
        if (!selectedData) {
          console.error("There is not enough data to select the reference candle.");
          return;
        }    

        //! 3.Convertir el timestamp a segundos (si es necesario)
        const timeInSeconds = selectedData[0] > 1e10 ? Math.floor(selectedData[0] / 1000) : selectedData[0];
        const pointCoordinates = { time: timeInSeconds, price: selectedData[4] };
    
        //! 4. Formatear el timestamp
        const formatTimestamp = (timestamp) => {
          const date = new Date(timestamp * 1000);
          return date.toLocaleString("es-ES", { 
            day: "2-digit", month: "2-digit", year: "numeric", 
            hour: "2-digit", minute: "2-digit", second: "2-digit" 
          });
        };
        console.log(`refence candle: ${formatTimestamp(pointCoordinates.time)} | Price: ${pointCoordinates.price}`);
          
        //! 5. Crear y adjuntar un marcador al grafico
        const chart = chartRef.current;
        const pointTool = new PointDrawingTool(chart, candlestickSeriesRef.current, pointCoordinates, 'red', 15, 0.5);
        
        //! 6. Adjuntar el marcador al gráfico y chequear el método disponible
        if (typeof candlestickSeriesRef.current.attachPrimitive === 'function') {
          candlestickSeriesRef.current.attachPrimitive(pointTool);  //* attachPrimitive agrega una primitiva especificamente a la serie de velas
        } else if (typeof chart.addPrimitive === 'function') {
          chart.addPrimitive(pointTool);                            //* addPrimitive agrega una primitiva al gráfico globalmente al grafico
        } else {
          console.warn("No method found to attach primitives. Check the version of lightweight-charts.");
        }
            
        //!7.  Suscribirse a cambios en el rango visible para actualizar la posición (anclaje dinámico)
        const updateOnRangeChange = () => {
          pointTool.updatePoint(pointCoordinates);
        };
        chart.timeScale().subscribeVisibleTimeRangeChange(updateOnRangeChange);

        return () => {
            chart.timeScale().unsubscribeVisibleTimeRangeChange(updateOnRangeChange);
        };
    }, [isChartReady, data, chartRef, candlestickSeriesRef]);
};

export default useExampleDrawInChart;
