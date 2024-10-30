// Path: strateger-react/src/components/candlestickChart/indicators/Stochastic.js

export const calculateStochastic = (data, periodK = 14, periodD = 3) => {
    if (!data || data.length < periodK) return { kValues: [], dValues: [] };
  
    const kValues = [];
    const dValues = [];
  
    for (let i = 0; i <= data.length - periodK; i++) {
      const slice = data.slice(i, i + periodK);
      const high = Math.max(...slice.map(candle => candle.high));
      const low = Math.min(...slice.map(candle => candle.low));
      const close = slice[slice.length - 1].close;
      const kValue = ((close - low) / (high - low)) * 100;
      kValues.push({ time: slice[slice.length - 1].time, value: kValue });
  
      if (kValues.length >= periodD) {
        const dSlice = kValues.slice(-periodD);
        const dValue = dSlice.reduce((acc, val) => acc + val.value, 0) / periodD;
        dValues.push({ time: dSlice[dSlice.length - 1].time, value: dValue });
      }
    }
  
    return { kValues, dValues };
  };
  
  export const createStochasticSeries = (chart, color) => {
    return chart.addLineSeries({
      color: typeof color === 'string' ? color : String(color),
      lineWidth: 1,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
    });
  };
  