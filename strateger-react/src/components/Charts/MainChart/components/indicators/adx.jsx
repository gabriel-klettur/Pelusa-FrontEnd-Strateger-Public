export const calculateADX = (data, period = 14) => {
    if (!data || data.length < period) return { adx: [], plusDI: [], minusDI: [] };
  
    const tr = []; // True Range
    const plusDM = []; // +DM (Directional Movement)
    const minusDM = []; // -DM
    const adx = [];
    const plusDI = [];
    const minusDI = [];
  
    // Calcular TR, +DM y -DM
    for (let i = 1; i < data.length; i++) {
      const highDiff = data[i].high - data[i - 1].high;
      const lowDiff = data[i - 1].low - data[i].low;
  
      tr.push(Math.max(
        data[i].high - data[i].low,
        Math.abs(data[i].high - data[i - 1].close),
        Math.abs(data[i].low - data[i - 1].close)
      ));
  
      plusDM.push(highDiff > lowDiff && highDiff > 0 ? highDiff : 0);
      minusDM.push(lowDiff > highDiff && lowDiff > 0 ? lowDiff : 0);
    }
  
    // Calcular TR, +DI, -DI y ADX
    let smoothedTR = tr.slice(0, period).reduce((sum, val) => sum + val, 0);
    let smoothedPlusDM = plusDM.slice(0, period).reduce((sum, val) => sum + val, 0);
    let smoothedMinusDM = minusDM.slice(0, period).reduce((sum, val) => sum + val, 0);
  
    for (let i = period; i < tr.length; i++) {
      smoothedTR = smoothedTR - smoothedTR / period + tr[i];
      smoothedPlusDM = smoothedPlusDM - smoothedPlusDM / period + plusDM[i];
      smoothedMinusDM = smoothedMinusDM - smoothedMinusDM / period + minusDM[i];
  
      const currentPlusDI = (smoothedPlusDM / smoothedTR) * 100;
      const currentMinusDI = (smoothedMinusDM / smoothedTR) * 100;
  
      plusDI.push({ time: data[i].time, value: currentPlusDI });
      minusDI.push({ time: data[i].time, value: currentMinusDI });
  
      const dx = Math.abs(currentPlusDI - currentMinusDI) / (currentPlusDI + currentMinusDI) * 100;
  
      if (adx.length === 0) {
        adx.push({ time: data[i].time, value: dx });
      } else {
        const lastADX = adx[adx.length - 1].value;
        const currentADX = (lastADX * (period - 1) + dx) / period;
        adx.push({ time: data[i].time, value: currentADX });
      }
    }
  
    return { adx, plusDI, minusDI };
  };
  
  export const createADXSeries = (chart) => {
    const adxSeries = chart.addLineSeries({
      color: 'orange', // ADX en naranja
      priceScaleId: 'adx',
      lineWidth: 2,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
    });
  
    const plusDISeries = chart.addLineSeries({
      color: 'green', // +DI en verde
      priceScaleId: 'adx',
      lineWidth: 2,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
    });
  
    const minusDISeries = chart.addLineSeries({
      color: 'red', // -DI en rojo
      priceScaleId: 'adx',
      lineWidth: 2,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
    });
  
    const keyLevelSeries = chart.addLineSeries({
      color: 'yellow', // Key level en amarillo
      priceScaleId: 'adx',
      lineWidth: 1,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
    });
  
    return { adxSeries, plusDISeries, minusDISeries, keyLevelSeries };
  };
  