// Path: strateger-react/src/components/TradingViewChart/series/seriesConfig.js
import { formatChartData, sortAndRemoveDuplicates } from '../data/chartData';
import { calculateEMA, createEMASeries } from '../indicators/Emas';
import { calculateStochastic, createStochasticSeries } from '../indicators/Stochastic'; // Importar el indicador Stochastic

export const initializeSeries = (chart) => {
  const candlestickSeries = chart.addCandlestickSeries();
  const ema10Series = createEMASeries(chart, 'blue');
  const ema55Series = createEMASeries(chart, 'orange');
  const ema200Series = createEMASeries(chart, 'red');
  
  // Series de Stochastic
  const stochasticKSeries = createStochasticSeries(chart, 'purple');
  const stochasticDSeries = createStochasticSeries(chart, 'green');

  return { candlestickSeries, ema10Series, ema55Series, ema200Series, stochasticKSeries, stochasticDSeries };
};

export const setSeriesData = (candlestickSeries, ema10Series, ema55Series, ema200Series, stochasticKSeries, stochasticDSeries, data) => {
  const formattedData = formatChartData(data);
  const sortedData = sortAndRemoveDuplicates(formattedData);

  candlestickSeries.setData(sortedData);

  // Calcular y establecer datos para las EMAs
  const ema10Data = calculateEMA(sortedData, 10);
  const ema55Data = calculateEMA(sortedData, 55);
  const ema200Data = calculateEMA(sortedData, 200);

  ema10Series.setData(ema10Data);
  ema55Series.setData(ema55Data);
  ema200Series.setData(ema200Data);

  // Calcular y establecer datos para el Stochastic
  const { kValues, dValues } = calculateStochastic(sortedData);
  stochasticKSeries.setData(kValues);
  stochasticDSeries.setData(dValues);
};
