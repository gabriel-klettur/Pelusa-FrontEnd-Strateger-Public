// src/components/TradingViewChart/series/seriesConfig.js
import { formatChartData, sortAndRemoveDuplicates } from '../data/chartData'; // Importar las funciones de manejo de datos
import { calculateEMA, createEMASeries } from '../indicators/Indicators';

export const initializeSeries = (chart) => {
  const candlestickSeries = chart.addCandlestickSeries();
  const ema10Series = createEMASeries(chart, 'blue');
  const ema55Series = createEMASeries(chart, 'orange');
  const ema200Series = createEMASeries(chart, 'red');

  return { candlestickSeries, ema10Series, ema55Series, ema200Series };
};

export const setSeriesData = (candlestickSeries, ema10Series, ema55Series, ema200Series, data) => {
  const formattedData = formatChartData(data);
  const sortedData = sortAndRemoveDuplicates(formattedData);

  console.log("Formatted data for chart:", sortedData);
  candlestickSeries.setData(sortedData);

  // Calcular y establecer datos para las EMAs
  const ema10Data = calculateEMA(sortedData, 10);
  const ema55Data = calculateEMA(sortedData, 55);
  const ema200Data = calculateEMA(sortedData, 200);

  ema10Series.setData(ema10Data);
  ema55Series.setData(ema55Data);
  ema200Series.setData(ema200Data);
};
