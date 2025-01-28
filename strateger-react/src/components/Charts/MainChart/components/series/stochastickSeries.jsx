
//Path: strateger-react/src/components/Charts/MainChart/components/series/stochastickSeries.jsx

import { calculateStochastic, createStochasticSeries } from '../indicators/Stochastic'; // Importar el indicador Stochastic

export const initializeStochastickSeries = (chart) => {

    const stochasticKSeries = createStochasticSeries(chart, 'blue');
    const stochasticDSeries = createStochasticSeries(chart, 'orange');
    
    return { stochasticKSeries, stochasticDSeries };
};

export const setStochastickSeriesData = (stochasticKSeries, stochasticDSeries, sortedData) => {
  const { kValues, dValues } = calculateStochastic(sortedData);

  stochasticKSeries.setData(kValues);
  stochasticDSeries.setData(dValues);
};
