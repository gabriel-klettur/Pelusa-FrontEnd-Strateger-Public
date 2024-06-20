// Path: strateger-react/src/components/TradingViewChart/candleService.js

import axios from 'axios';
import config from '../../config';
import store from '../../store';
import { updateLastCandleSuccess, updateLastCandleError } from '../../slices/tradingViewChartSlice';

// Función para convertir timestamps a formato de cadena
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  const hours = (`0${date.getHours()}`).slice(-2);
  const minutes = (`0${date.getMinutes()}`).slice(-2);
  const seconds = (`0${date.getSeconds()}`).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const fetchLastCandle = async () => {
  try {
    const state = store.getState();
    const { startDate, endDate } = state.tradingViewChart;

    // Convertir las fechas a formato de cadena
    const startString = formatDate(startDate);
    const endString = formatDate(endDate);

    const response = await axios.get(`${config.apiURL}/bingx/get-k-line-data`, {
      params: {
        symbol: "BTC-USDT",
        interval: '1m',
        limit: "1",
        start_date: startString,
        end_date: endString
      }
    });

    const resultData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

    if (resultData.code === 0) {
      const lastCandle = resultData.data.map(item => [
        new Date(item.time).getTime(),
        parseFloat(item.open),
        parseFloat(item.high),
        parseFloat(item.low),
        parseFloat(item.close)
      ]).filter(item => !isNaN(item[0]))[0];

      store.dispatch(updateLastCandleSuccess(lastCandle));
    } else {
      store.dispatch(updateLastCandleError(resultData.msg || 'Unknown error from API'));
    }
  } catch (err) {
    store.dispatch(updateLastCandleError(err.message));
  }
};

export const startCandleUpdateService = () => {
  setInterval(fetchLastCandle, 5000);
};
