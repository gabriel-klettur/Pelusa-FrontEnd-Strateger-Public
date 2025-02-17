import { useEffect } from 'react';
import { CircleDrawingTool } from '../../components/CircleDrawingTool';

const useExampleDrawInChart = (chartRef, candlestickSeriesRef, data, isChartReady) => {
    useEffect(() => {
        //! 1. Verificamos las condiciones iniciales
        if (!isChartReady || data.length === 0) return;

        //! 2. Seleccionamos los puntos de referencia (velas)
        const selectedCandles = [1400, 1404, 1420].map(index => data[index]).filter(Boolean);

        if (selectedCandles.length !== 3) {
            console.error("❌ Not enough data to select all reference candles.");
            return;
        }

        //! 3. Convertimos timestamps y creamos coordenadas de los círculos
        const circlesData = [
            { time: selectedCandles[0][0], price: selectedCandles[0][4], color: 'red' },    // Circulo rojo en la vela 4
            { time: selectedCandles[1][0], price: selectedCandles[1][4], color: 'blue' },   // Circulo azul en la vela 10
            { time: selectedCandles[2][0], price: selectedCandles[2][4], color: 'green' }   // Circulo verde en la vela 20
        ].map(circle => ({
            time: circle.time > 1e10 ? Math.floor(circle.time / 1000) : circle.time,  // Convertir a segundos si es necesario
            price: circle.price,
            color: circle.color
        }));

        //! 4. Crear y adjuntar los círculos al gráfico
        const chart = chartRef.current;
        const series = candlestickSeriesRef.current;

        // Crear los círculos originales
        const circles = circlesData.map(({ time, price, color }) =>           
          new CircleDrawingTool(chart, series, { time, price }, color, 15, 0.5)                     
        );

        // Crear los círculos desplazados
        const offsetCircles = circlesData.map(({ time, price, color }) => 
            new CircleDrawingTool(chart, series, { time: time - 1000, price: price + 10000 }, color, 10, 0.5)
        );

        //! 5. Adjuntar los círculos originales y desplazados al gráfico
        [...circles, ...offsetCircles].forEach(circle => {
            if (typeof series.attachPrimitive === 'function') {
                series.attachPrimitive(circle);
                console.log(`Primitive attached to candlestick series: ${circle.color}`);
            } else if (typeof chart.addPrimitive === 'function') {
                chart.addPrimitive(circle);
                console.log(`Primitive attached to chart: ${circle.color}`);
            } else {
                console.warn("No method found to attach primitives. Check the version of lightweight-charts.");
            }
        });

        //! 6. Suscribirse a cambios en el rango visible para actualizar la posición de los círculos
        const updateOnRangeChange = () => {
            [...circles, ...offsetCircles].forEach((circle, index) => {
                circle.updateCircle({ time: circlesData[index % 3].time, price: circlesData[index % 3].price });
            });
        };
        chart.timeScale().subscribeVisibleTimeRangeChange(updateOnRangeChange);

        return () => {
            chart.timeScale().unsubscribeVisibleTimeRangeChange(updateOnRangeChange);
        };
    }, [isChartReady, data, chartRef, candlestickSeriesRef]);
};

export default useExampleDrawInChart;
