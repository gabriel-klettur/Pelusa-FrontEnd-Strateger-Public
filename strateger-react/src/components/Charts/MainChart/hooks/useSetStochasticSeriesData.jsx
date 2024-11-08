// src/components/CandlestickChart/hooks/useSetStochasticSeriesData.js
import { useEffect } from 'react';
import { setStochastickSeriesData } from '../components/series/stochastickSeries';
import { formatChartData, sortAndRemoveDuplicates } from '../utils/chartData';

const useSetStochasticSeriesData = (showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef) => {
  useEffect(() => {
    if (showStochasticSerie && data && stochasticKSeriesRef.current && stochasticDSeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setStochastickSeriesData(stochasticKSeriesRef.current, stochasticDSeriesRef.current, sortedData);
    }
  }, [data, stochasticKSeriesRef, stochasticDSeriesRef, showStochasticSerie]);
};

export default useSetStochasticSeriesData;
