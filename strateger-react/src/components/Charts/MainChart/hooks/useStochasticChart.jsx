import { useEffect, useRef } from 'react';
import { initializeChart } from '../config/chartConfig';
import { initializeSeries } from '../components/series/seriesConfig';

const useStochasticChart = () => {
  const stochasticChartContainerRef = useRef();
  const stochasticChartRef = useRef();
  const stochasticKSeriesRef = useRef();
  const stochasticDSeriesRef = useRef();

  useEffect(() => {
    if (stochasticChartContainerRef.current) {
      stochasticChartRef.current = initializeChart(stochasticChartContainerRef.current);

      const { stochasticKSeries, stochasticDSeries } = initializeSeries(stochasticChartRef.current);
      stochasticKSeriesRef.current = stochasticKSeries;
      stochasticDSeriesRef.current = stochasticDSeries;
    }

    return () => {
      if (stochasticChartRef.current) {
        stochasticChartRef.current.remove();
      }
    };
  }, []);

  return {
    stochasticChartContainerRef,
    stochasticChartRef,
    stochasticKSeriesRef,
    stochasticDSeriesRef,
  };
};

export default useStochasticChart;
