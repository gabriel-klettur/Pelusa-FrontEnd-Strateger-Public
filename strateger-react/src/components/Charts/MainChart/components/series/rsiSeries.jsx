//Path: strateger-react/src/components/Charts/MainChart/hooks/indicators/RSISeries.jsx

import { calculateRSI, createRSISeries } from '../indicators/rsi';

export const initializeRSISeries = (chart) => {
  const rsiSeries = createRSISeries(chart, 'blue');
  return { rsiSeries };
};

export const setRSISeriesData = (rsiSeries, sortedData, period) => {  
  const { rsi } = calculateRSI(sortedData, period);

  rsiSeries.setData(rsi);
};
