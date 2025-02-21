import { useRef } from 'react';

//!---- Chart ----!//
import useInitializeChart from './useInitializeChart';
import useInitializeCandlestickSeries from './useInitializeCandlestickSeries';
import useSetCandlestickSeriesData from './useSetCandlestickSeriesData';

const useChart = ({chartSettings, data}) => {
  // Ref del contenedor del gráfico
  const mainChartContainerRef = useRef();
  const chartRef = useInitializeChart(mainChartContainerRef);
  const candlestickSeriesRef = useInitializeCandlestickSeries(chartRef);

  //!----------------- Hooks de Datos -----------------//
  useSetCandlestickSeriesData(chartSettings.showCandlestickSerie, data, candlestickSeriesRef);

  return {
    mainChartContainerRef,
    chartRef,
    candlestickSeriesRef
  };

}

export default useChart;