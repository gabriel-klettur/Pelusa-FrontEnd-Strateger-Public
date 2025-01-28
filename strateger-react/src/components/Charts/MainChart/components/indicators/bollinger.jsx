export const calculateBollingerBands = (data, period = 20, stdDevMultiplier = 2) => {
    if (!data || data.length < period) return { upperBand: [], middleBand: [], lowerBand: [] };
  
    const upperBand = [];
    const middleBand = [];
    const lowerBand = [];
  
    for (let i = period - 1; i < data.length; i++) {
      const slice = data.slice(i - period + 1, i + 1);
      const closes = slice.map(candle => candle.close);
      const mean = closes.reduce((sum, value) => sum + value, 0) / period;
      const stdDev = Math.sqrt(
        closes.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / period
      );
  
      const upper = mean + stdDevMultiplier * stdDev;
      const lower = mean - stdDevMultiplier * stdDev;
  
      middleBand.push({ time: slice[slice.length - 1].time, value: mean });
      upperBand.push({ time: slice[slice.length - 1].time, value: upper });
      lowerBand.push({ time: slice[slice.length - 1].time, value: lower });
    }
  
    return { upperBand, middleBand, lowerBand };
  };
  
  export const createBollingerBandsSeries = (chart) => {
    const upperBandSeries = chart.addLineSeries({
      color: 'blue', // Banda superior
      lineWidth: 1,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
    });
  
    const middleBandSeries = chart.addLineSeries({
      color: 'green', // Banda media
      lineWidth: 2,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
    });
  
    const lowerBandSeries = chart.addLineSeries({
      color: 'red', // Banda inferior
      lineWidth: 1,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
    });
  
    return { upperBandSeries, middleBandSeries, lowerBandSeries };
  };
  