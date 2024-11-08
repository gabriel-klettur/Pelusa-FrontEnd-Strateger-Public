// src/components/CandlestickChart/hooks/useSetStochasticSeriesData.js
import { useEffect } from 'react';
import { setStochastickSeriesData } from '../components/series/stochastickSeries';
import { formatChartData, sortAndRemoveDuplicates } from '../utils/chartData';

const useSetStochasticSeriesData = (data, stochasticKSeriesRef, stochasticDSeriesRef) => {
  useEffect(() => {
    if (data && stochasticKSeriesRef.current && stochasticDSeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setStochastickSeriesData(stochasticKSeriesRef.current, stochasticDSeriesRef.current, sortedData);
    }
  }, [data, stochasticKSeriesRef, stochasticDSeriesRef]);
};

export default useSetStochasticSeriesData;
