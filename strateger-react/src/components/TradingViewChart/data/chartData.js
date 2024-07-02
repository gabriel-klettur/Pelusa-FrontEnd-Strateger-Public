// src/components/TradingViewChart/data/chartData.js
export const formatChartData = (data) => {
    return data.map(item => ({
      time: Math.floor(item[0] / 1000), // Convertir el tiempo al formato Unix timestamp en segundos
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4]
    })).filter(item => item.close !== undefined); // Filtrar datos faltantes
  };
  
  export const sortAndRemoveDuplicates = (data) => {
    return data
      .sort((a, b) => a.time - b.time)
      .filter((item, index, array) => index === 0 || item.time !== array[index - 1].time);
  };
  