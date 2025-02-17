// Path: strateger-react/src/components/Charts/CandlestickChartChart/components/indicators/emas.js
// Importa el tipo de serie correspondiente
import { LineSeries } from 'lightweight-charts';

// Función para calcular la EMA
export const calculateEMA = (data, period) => {
  const k = 2 / (period + 1);
  let emaArray = [];
  if (data.length > 0) {
    let ema = data[0].close; // Se utiliza el primer valor como base para la EMA

    data.forEach((item, index) => {
      if (index === 0) {
        emaArray.push({ time: item.time, value: ema });
      } else {
        ema = item.close * k + ema * (1 - k);
        emaArray.push({ time: item.time, value: ema });
      }
    });
  }
  return emaArray;
};

// Crea la serie de EMA usando la nueva API de v5
export const createEMASeries = (chart, color) => {
  return chart.addSeries(LineSeries, {
    color: typeof color === 'string' ? color : String(color),
    priceScaleId: 'emas',
    lineWidth: 2,
    lastValueVisible: false,
    crossHairMarkerVisible: false,
    priceLineVisible: false,
  });
};
