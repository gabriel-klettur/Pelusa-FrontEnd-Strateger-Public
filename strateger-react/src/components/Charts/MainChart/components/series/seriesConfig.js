// Path: src/components/Charts/CandlestickChartChart/components/series/seriesConfig.js
import { formatChartData, sortAndRemoveDuplicates } from '../../utils/chartData';

import { initializeStochastickSeries , setStochastickSeriesData } from './stochastickSeries';
import { initializeEmasSeries, setEmasSeriesData } from './emasSeries';
import { initialCandlestickSeries, setCandlestickSeriesData } from './candlestickSeries';

export const initializeSeries = (chart) => {
  const { candlestickSeries } = initialCandlestickSeries(chart);
  
  const { ema10Series, ema55Series, ema200Series } = initializeEmasSeries(chart);
  
  const { stochasticKSeries, stochasticDSeries } = initializeStochastickSeries(chart);

  return { candlestickSeries, ema10Series, ema55Series, ema200Series, stochasticKSeries, stochasticDSeries };
};

export const setSeriesData = (candlestickSeries, ema10Series, ema55Series, ema200Series, stochasticKSeries, stochasticDSeries, data) => {
  const formattedData = formatChartData(data);
  const sortedData = sortAndRemoveDuplicates(formattedData);

  setCandlestickSeriesData(candlestickSeries, sortedData);

  setEmasSeriesData(ema10Series, ema55Series, ema200Series, sortedData);

  setStochastickSeriesData(stochasticKSeries, stochasticDSeries, sortedData);

};
