import { useEffect } from 'react';

import { setEmasSeriesData } from '../components/series/emasSeries';
import { setStochastickSeriesData } from '../components/series/stochastickSeries';
import { setCandlestickSeriesData } from '../components/series/candlestickSeries';

import useStochasticChart from './useStochasticChart';
import useCandlestickChart from './useCandlestickChart';

import { formatChartData, sortAndRemoveDuplicates } from '../utils/chartData';

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

      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setCandlestickSeriesData(candlestickSeriesRef.current, sortedData);

      setEmasSeriesData(
        ema10SeriesRef.current,
        ema55SeriesRef.current,
        ema200SeriesRef.current,
        sortedData
      );

      setStochastickSeriesData(
        stochasticKSeriesRef.current,
        stochasticDSeriesRef.current,
        sortedData
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
