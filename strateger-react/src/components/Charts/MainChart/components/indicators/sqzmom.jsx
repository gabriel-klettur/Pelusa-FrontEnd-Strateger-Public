// Path: strateger-react/src/components/Charts/MainChart/components/indicators/sqzmom.jsx

import { HistogramSeries } from 'lightweight-charts';

export const calculateSQZMOMENTUM = (
  data,
  lengthBB = 20,
  multBB = 2.0,
  lengthKC = 20,
  multKC = 1.5
) => {
  if (!data || data.length < Math.max(lengthBB, lengthKC)) return { momentum: [] };

  const momentum = [];

  for (let i = Math.max(lengthBB, lengthKC) - 1; i < data.length; i++) {
    const sliceBB = data.slice(i - lengthBB + 1, i + 1);
    const sliceKC = data.slice(i - lengthKC + 1, i + 1);

    const closePrices = sliceBB.map(candle => candle.close);
    const highPrices = sliceKC.map(candle => candle.high);
    const lowPrices = sliceKC.map(candle => candle.low);

    // 📌 Calcular Momentum
    const highestHigh = Math.max(...highPrices);
    const lowestLow = Math.min(...lowPrices);
    const avgExtreme = (highestHigh + lowestLow) / 2;
    const linregMomentum = closePrices[lengthKC - 1] - avgExtreme;

    momentum.push({ time: data[i].time, value: linregMomentum });
  }

  return { momentum };
};

export const createSQZMOMENTUMSeries = (chart) => {
  const positiveIncreasing = chart.addSeries(HistogramSeries, {
    color: 'rgba(0, 255, 0, 1)', // Verde Claro (Momentum positivo creciente)
    priceScaleId: 'momentum',
    lastValueVisible: false,
    crossHairMarkerVisible: false,
    priceLineVisible: false,
    lineWidth: 1,
  });

  const positiveDecreasing = chart.addSeries(HistogramSeries, {
    color: 'rgba(0, 128, 0, 1)', // Verde Oscuro (Momentum positivo decreciente)
    priceScaleId: 'momentum',
    lastValueVisible: false,
    crossHairMarkerVisible: false,
    priceLineVisible: false,
    lineWidth: 1,
  });

  const negativeDecreasing = chart.addSeries(HistogramSeries, {
    color: 'rgba(255, 0, 0, 1)', // Rojo Claro (Momentum negativo decreciente)
    priceScaleId: 'momentum',
    lastValueVisible: false,
    crossHairMarkerVisible: false,
    priceLineVisible: false,
    lineWidth: 1,
  });

  const negativeIncreasing = chart.addSeries(HistogramSeries, {
    color: 'rgba(128, 0, 0, 1)', // Rojo Oscuro (Momentum negativo creciente)
    priceScaleId: 'momentum',
    lastValueVisible: false,
    crossHairMarkerVisible: false,
    priceLineVisible: false,
    lineWidth: 1,
  });

  return {
    positiveSeries: [positiveIncreasing, positiveDecreasing],
    negativeSeries: [negativeDecreasing, negativeIncreasing],
  };
};
