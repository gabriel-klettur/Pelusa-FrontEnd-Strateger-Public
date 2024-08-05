// src/components/TradingViewChart/indicators/Indicators.js
export const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    let emaArray = [];
    if (data.length > 0) {
      let ema = data[0].close; // Use the first data point as the initial EMA value
  
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
  
  export const createEMASeries = (chart, color) => {
    return chart.addLineSeries({
      color: typeof color === 'string' ? color : String(color), // Ensure color is a string
      lineWidth: 2,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false
    });
  };
  