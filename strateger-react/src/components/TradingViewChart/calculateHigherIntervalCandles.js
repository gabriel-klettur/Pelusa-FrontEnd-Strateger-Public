// Path: strateger-react/src/components/TradingViewChart/calculateHigherIntervalCandles.js

const calculateHigherIntervalCandles = (data1m) => {
    const intervals = ['5m', '15m', '30m', '1h', '4h', '1d'];
    const intervalDurations = {
      '5m': 5 * 60,
      '15m': 15 * 60,
      '30m': 30 * 60,
      '1h': 60 * 60,
      '4h': 4 * 60 * 60,
      '1d': 24 * 60 * 60,
    };
  
    const newData = {};
  
    intervals.forEach(interval => {
      const duration = intervalDurations[interval];
      const groupedData = [];
  
      for (let i = 0; i < data1m.length; i += duration) {
        const segment = data1m.slice(i, i + duration);
        if (segment.length > 0) {
          const open = segment[0][1];
          const close = segment[segment.length - 1][4];
          const high = Math.max(...segment.map(item => item[2]));
          const low = Math.min(...segment.map(item => item[3]));
          groupedData.push([segment[0][0], open, high, low, close]);
        }
      }
  
      newData[interval] = groupedData;
    });
  
    return newData;
  };
  
  export default calculateHigherIntervalCandles;
  