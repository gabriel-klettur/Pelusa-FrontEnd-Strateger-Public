//Path: strateger-react/src/components/Charts/MainChart/components/series/sqzSeries.jsx

import { calculateSQZMOMENTUM, createSQZMOMENTUMSeries } from '../indicators/sqzmom';

export const initializeSQZSeries = (chart) => {
  const positiveSeries = createSQZMOMENTUMSeries(chart, 'green', 'red').positiveSeries;
  const negativeSeries = createSQZMOMENTUMSeries(chart, 'green', 'red').negativeSeries;

  return { positiveSeries, negativeSeries };
};

export const setSQZSeriesData = (positiveSeries, negativeSeries, sortedData, period = 20) => {
  const { momentum } = calculateSQZMOMENTUM(sortedData, period);

  // Dividir los datos en positivos y negativos
  const positiveData = momentum.filter(point => point.value >= 0);
  const negativeData = momentum.filter(point => point.value < 0);

  positiveSeries.setData(positiveData);
  negativeSeries.setData(negativeData);
};
