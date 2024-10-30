import { useEffect } from 'react';
import { setSeriesData } from '../components/series/seriesConfig';
import useStochasticChart from './useStochasticChart';
import useCandlestickChart from './useCandlestickChart';

const useChart = (data) => {
  // Hook for Candlestick chart
  const {
    chartContainerRef,
    candlestickSeriesRef,
    ema10SeriesRef,
    ema55SeriesRef,
    ema200SeriesRef,
  } = useCandlestickChart();

  // Hook for Stochastic chart
  const {
    stochasticChartContainerRef,
    stochasticKSeriesRef,
    stochasticDSeriesRef,
  } = useStochasticChart();

  // Hook to set series data whenever data is updated
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
  }, [
    data,
    candlestickSeriesRef,
    ema10SeriesRef,
    ema55SeriesRef,
    ema200SeriesRef,
    stochasticKSeriesRef,
    stochasticDSeriesRef,
  ]);

  return {
    chartContainerRef,
    stochasticChartContainerRef,
    candlestickSeriesRef,
  };
};

export default useChart;
