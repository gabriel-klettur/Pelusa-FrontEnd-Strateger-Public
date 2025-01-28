//Path: strateger-react/src/components/Charts/MainChart/components/indicators/sqzmom.jsx

export const calculateSQZMOMENTUM = (data, period = 20) => {
    if (!data || data.length < period) return { momentum: [] };
  
    const momentum = [];
  
    for (let i = period - 1; i < data.length; i++) {
      const slice = data.slice(i - period + 1, i + 1);
      const closes = slice.map(candle => candle.close);
      const mean = closes.reduce((sum, value) => sum + value, 0) / period;
      const stdDev = Math.sqrt(
        closes.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / period
      );
  
      const lastClose = slice[slice.length - 1].close;
      const squeezeMomentum = (lastClose - mean) / stdDev;
  
      momentum.push({ time: slice[slice.length - 1].time, value: squeezeMomentum });
    }
  
    return { momentum };
};
  
export const createSQZMOMENTUMSeries = (chart, positiveColor = 'green', negativeColor = 'red') => {
    const positiveSeries = chart.addHistogramSeries({
      color: positiveColor,
      priceScaleId: 'momentum',
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
      lineWidth: 1,
    });
  
    const negativeSeries = chart.addHistogramSeries({
      color: negativeColor,
      priceScaleId: 'momentum',
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
      lineWidth: 1,
    });
  
    return { positiveSeries, negativeSeries };
};
  