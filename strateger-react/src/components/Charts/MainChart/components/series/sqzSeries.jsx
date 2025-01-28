//Path: strateger-react/src/components/Charts/MainChart/components/series/sqzSeries.jsx

import { calculateSQZMOMENTUM, createSQZMOMENTUMSeries } from '../indicators/sqzmom';

export const initializeSQZSeries = (chart) => {
  const { positiveSeries, negativeSeries } = createSQZMOMENTUMSeries(chart);
  return { positiveSeries, negativeSeries };
};

export const setSQZSeriesData = (positiveSeries, negativeSeries, sortedData, period = 20) => {
  const { momentum } = calculateSQZMOMENTUM(sortedData, period);

  // Dividir los datos en cuatro categorías
  const positiveIncreasing = [];
  const positiveDecreasing = [];
  const negativeDecreasing = [];
  const negativeIncreasing = [];

  for (let i = 1; i < momentum.length; i++) {
    const prevValue = momentum[i - 1]?.value ?? 0;
    const currentValue = momentum[i]?.value ?? 0;

    if (currentValue >= 0) {
      if (currentValue >= prevValue) {
        positiveIncreasing.push(momentum[i]); // 🔹 Verde Claro (Momentum positivo creciente)
      } else {
        positiveDecreasing.push(momentum[i]); // 🔹 Verde Oscuro (Momentum positivo decreciente)
      }
    } else {
      if (currentValue <= prevValue) {
        negativeDecreasing.push(momentum[i]); // 🔹 Rojo Claro (Momentum negativo decreciente)
      } else {
        negativeIncreasing.push(momentum[i]); // 🔹 Rojo Oscuro (Momentum negativo creciente)
      }
    }
  }

  // Establecer los datos en las series correctas
  positiveSeries[0].setData(positiveIncreasing);
  positiveSeries[1].setData(positiveDecreasing);
  negativeSeries[0].setData(negativeDecreasing);
  negativeSeries[1].setData(negativeIncreasing);
};
