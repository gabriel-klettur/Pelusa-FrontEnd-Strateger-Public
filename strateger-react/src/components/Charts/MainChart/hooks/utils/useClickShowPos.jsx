// Path: src/hooks/useClickShowPos.js
import { useEffect } from 'react';

const useClickShowPos = (chartRef, candlestickSeriesRef) => {    
  useEffect(() => {
    if (!chartRef.current || !candlestickSeriesRef.current) return;
    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;
    const handleChartClick = (param) => {
      console.log("Click in Chart - Coords (pixels):", param.point);
      const clickedTime = chart.timeScale().coordinateToTime(param.point.x);
      const clickedPrice = series.coordinateToPrice(param.point.y);
      console.log("Click in Chart - Time:", clickedTime, "Price:", clickedPrice);
    };
    chart.subscribeClick(handleChartClick);         //! Event handler for click on the chart
    return () => {
      chart.unsubscribeClick(handleChartClick);     //! Remove the event handler, necessary for cleanup when the component is unmounted
    };
  }, [chartRef, candlestickSeriesRef]);    
};

export default useClickShowPos;
