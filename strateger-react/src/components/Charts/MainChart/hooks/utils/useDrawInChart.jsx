// Path: src/hooks/useDrawInChart.js
import { useEffect } from 'react';
import { PointDrawingTool } from '../../components/PointDrawingTool';

const useDrawInChart = (chartRef, candlestickSeriesRef, data, isChartReady) => {
    useEffect(() => {
        if (!isChartReady || data.length === 0) return;
    
        // Seleccionamos el dato en el índice 5 para usarlo como referencia (la vela de interés)
        const selectedData = data[10];
        if (!selectedData) {
          console.error("There is not enough data to select the reference candle.");
          return;
        }
    
        // Convertir el timestamp a segundos (si es necesario)
        const timeInSeconds = selectedData[0] > 1e10 ? Math.floor(selectedData[0] / 1000) : selectedData[0];
        const pointCoordinates = { time: timeInSeconds, price: selectedData[4] };
    
        const formatTimestamp = (timestamp) => {
          const date = new Date(timestamp * 1000);
          return date.toLocaleString("es-ES", { 
            day: "2-digit", month: "2-digit", year: "numeric", 
            hour: "2-digit", minute: "2-digit", second: "2-digit" 
          });
        };
        console.log(`refence candle: ${formatTimestamp(pointCoordinates.time)} | Price: ${pointCoordinates.price}`);
          
        // Crear la instancia del plugin para anclar el círculo a esa vela
        const chart = chartRef.current;
        const pointTool = new PointDrawingTool(chart, candlestickSeriesRef.current, pointCoordinates, 'red', 15, 0.5);
        
    
        if (typeof candlestickSeriesRef.current.attachPrimitive === 'function') {
          candlestickSeriesRef.current.attachPrimitive(pointTool);
        } else if (typeof chart.addPrimitive === 'function') {
          chart.addPrimitive(pointTool);
        } else {
          console.warn("No method found to attach primitives. Check the version of lightweight-charts.");
        }
    
        // Suscribirse a cambios en el rango visible para actualizar la posición (anclaje dinámico)
        const updateOnRangeChange = () => {
          pointTool.updatePoint(pointCoordinates);
        };
        chart.timeScale().subscribeVisibleTimeRangeChange(updateOnRangeChange);
    
        // Forzar una actualización inicial
        setTimeout(() => {
          chart.applyOptions({});
          chart.timeScale().fitContent();
          pointTool.updatePoint(pointCoordinates);
        }, 1000);
    
        return () => {
            chart.timeScale().unsubscribeVisibleTimeRangeChange(updateOnRangeChange);
        };
    }, [isChartReady, data, chartRef, candlestickSeriesRef]);
};

export default useDrawInChart;
