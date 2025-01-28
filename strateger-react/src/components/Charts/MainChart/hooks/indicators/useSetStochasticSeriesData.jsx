// src/components/CandlestickChart/hooks/useSetStochasticSeriesData.js
import { useEffect } from 'react';
import { setStochastickSeriesData } from '../../components/series/stochastickSeries';
import { formatChartData, sortAndRemoveDuplicates } from '../../utils/chartData';

const useSetStochasticSeriesData = (showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef) => {
  useEffect(() => {

    if (!stochasticKSeriesRef.current || !stochasticDSeriesRef.current) {
      console.error("⚠️ useSetStochasticSeriesData: Alguna de las series Stochastic no está definida.");
      return;
    }     

    if (showStochasticSerie && data && stochasticKSeriesRef.current && stochasticDSeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setStochastickSeriesData(stochasticKSeriesRef.current, stochasticDSeriesRef.current, sortedData);
    } else if(stochasticKSeriesRef.current && stochasticDSeriesRef.current) {
      stochasticKSeriesRef.current.setData([]);
      stochasticDSeriesRef.current.setData([]);
    }
  }, [data, stochasticKSeriesRef, stochasticDSeriesRef, showStochasticSerie]);
};

export default useSetStochasticSeriesData;