//Path: src/components/Charts/MainChart/utils/getClosestCandle.jsx

/**
*TODO Dado un array de velas y un tiempo de click,
*TODO retorna la vela cuyo timestamp esté más cercano al tiempo proporcionado.
*/

export const getClosestCandle = (data, clickedTime) => {
    let closestCandle = data[0];
    let minDiff = Infinity;
    data.forEach((candle) => {
      const candleTime = candle[0] > 1e10 ? Math.floor(candle[0] / 1000) : candle[0];
      const diff = Math.abs(candleTime - clickedTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestCandle = candle;
      }
    });
    return closestCandle;
  };
  