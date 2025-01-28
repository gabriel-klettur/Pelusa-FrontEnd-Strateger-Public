//Path: strateger-react/src/components/Charts/MainChart/components/series/adxSeries.jsx

import { calculateADX, createADXSeries } from '../indicators/adx';

export const initializeADXSeries = (chart) => {
  if (!chart) {
    console.error("⚠️ initializeADXSeries: Chart no está definido.");
    return { adxSeries: null, plusDISeries: null, minusDISeries: null, keyLevelSeries: null };
  }

  console.log("✅ Creando ADX Series en el chart");

  const { adxSeries, plusDISeries, minusDISeries, keyLevelSeries } = createADXSeries(chart);

  return { adxSeries, plusDISeries, minusDISeries, keyLevelSeries };
};

export const setAdxSeriesData = (adxSeries, plusDISeries, minusDISeries, keyLevelSeries, sortedData, period) => {  
  const { adx, plusDI, minusDI } = calculateADX(sortedData, period);

  const keyLevelData = adx.map(point => ({ time: point.time, value: 23 })); // Nivel clave

  adxSeries.setData(adx);
  plusDISeries.setData(plusDI);
  minusDISeries.setData(minusDI);
  keyLevelSeries.setData(keyLevelData);
};
