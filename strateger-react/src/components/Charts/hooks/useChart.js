// Path: strateger-react/src/components/TradingViewChart/hooks/useChart.js
import { useEffect, useRef } from 'react';
import { initializeChart } from '../config/chartConfig';
import { initializeSeries, setSeriesData } from '../utils/series/seriesConfig';

const useChart = (data) => {
  const chartContainerRef = useRef();
  const stochasticChartContainerRef = useRef(); // Añadir nuevo ref para el gráfico Stochastic
  const chartRef = useRef();
  const stochasticChartRef = useRef(); // Nuevo chartRef para el gráfico Stochastic
  const candlestickSeriesRef = useRef();
  const ema10SeriesRef = useRef();
  const ema55SeriesRef = useRef();
  const ema200SeriesRef = useRef();
  const stochasticKSeriesRef = useRef();
  const stochasticDSeriesRef = useRef();

  useEffect(() => {
    chartRef.current = initializeChart(chartContainerRef.current);
    stochasticChartRef.current = initializeChart(stochasticChartContainerRef.current); // Inicializar gráfico Stochastic

    const { candlestickSeries, ema10Series, ema55Series, ema200Series } = initializeSeries(chartRef.current);
    const { stochasticKSeries, stochasticDSeries } = initializeSeries(stochasticChartRef.current); // Series para gráfico Stochastic

    candlestickSeriesRef.current = candlestickSeries;
    ema10SeriesRef.current = ema10Series;
    ema55SeriesRef.current = ema55Series;
    ema200SeriesRef.current = ema200Series;
    stochasticKSeriesRef.current = stochasticKSeries;
    stochasticDSeriesRef.current = stochasticDSeries;

    return () => {
      chartRef.current.remove();
      stochasticChartRef.current.remove(); // Remover el gráfico Stochastic
    };
  }, []);

  useEffect(() => {
    if (data && candlestickSeriesRef.current) {
      setSeriesData(
        candlestickSeriesRef.current,
        ema10SeriesRef.current,
        ema55SeriesRef.current,
        ema200SeriesRef.current,
        stochasticKSeriesRef.current,
        stochasticDSeriesRef.current,
        data
      );
    }
  }, [data]);

  return { chartContainerRef, candlestickSeriesRef, stochasticChartContainerRef };
};

export default useChart;
