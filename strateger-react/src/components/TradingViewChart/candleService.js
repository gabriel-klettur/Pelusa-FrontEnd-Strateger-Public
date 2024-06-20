// Path: strateger-react/src/components/TradingViewChart/candleService.js

import axios from 'axios';
import config from '../../config';
import store from '../../store';
import { updateLastCandleSuccess, updateLastCandleError } from '../../slices/tradingViewChartSlice';
import { addMinutes, subMinutes, addHours, subHours } from 'date-fns';

const adjustDates = (interval, startDate, endDate) => {
  let expandedStartDate = new Date(startDate);
  let expandedEndDate = new Date(endDate);

  switch (interval) {
    case '1':
      interval = '1m';
    // fall through
    case '1m':
    case '5m':
    case '15m':
    case '30m':
      expandedStartDate = subMinutes(expandedStartDate, 5);
      expandedEndDate = addMinutes(expandedEndDate, 5);
      break;
    case '1h':
      expandedStartDate = subHours(expandedStartDate, 5);
      expandedEndDate = addHours(expandedEndDate, 5);
      break;
    case '4h':
      expandedStartDate = subHours(expandedStartDate, 20);
      expandedEndDate = addHours(expandedEndDate, 20);
      break;
    case '1d':
      expandedStartDate = subHours(expandedStartDate, 120);
      expandedEndDate = addHours(expandedEndDate, 120);
      break;
    case '1w':
      expandedStartDate = subHours(expandedStartDate, 840);
      expandedEndDate = addHours(expandedEndDate, 840);
      break;
    case '1M':
      expandedStartDate = subHours(expandedStartDate, 3600);
      expandedEndDate = addHours(expandedEndDate, 3600);
      break;
    default:
      throw new Error('Invalid interval');
  }

  return { interval, expandedStartDate, expandedEndDate };
};

export const startCandleUpdateService = () => {
  setInterval(async () => {
    try {
      const state = store.getState();
      const interval = '1m';
      const { expandedStartDate, expandedEndDate } = adjustDates(interval, state.tradingViewChart.startDate, state.tradingViewChart.endDate);

      const response = await axios.get(`${config.apiURL}/bingx/get-k-line-data`, {
        params: {
          symbol: "BTC-USDT",
          interval: '1m',
          limit: "1",
          start_date: expandedStartDate.toISOString().slice(0, 19).replace('T', ' '),
          end_date: expandedEndDate.toISOString().slice(0, 19).replace('T', ' ')
        }
      });

      const resultData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

      if (resultData.code === 0) {
        const formattedData = resultData.data.map(item => [
          new Date(item.time).getTime(),
          parseFloat(item.open),
          parseFloat(item.high),
          parseFloat(item.low),
          parseFloat(item.close)
        ]).filter(item => !isNaN(item[0]));

        formattedData.sort((a, b) => a[0] - b[0]);

        store.dispatch(updateLastCandleSuccess(formattedData[0]));
      } else {
        store.dispatch(updateLastCandleError(resultData.msg || 'Unknown error from API'));
      }
    } catch (err) {
      store.dispatch(updateLastCandleError(err.message));
    }
  }, 5000);
};
