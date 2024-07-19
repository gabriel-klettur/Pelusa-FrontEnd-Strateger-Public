// src/slices/tradingViewChartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';
import { addMinutes, addHours, subMinutes, subHours } from 'date-fns';

const adjustDates = (interval, startDate, endDate) => {
  let expandedStartDate = new Date(startDate);
  let expandedEndDate = new Date(endDate);

  switch (interval) {
    case '1':
      interval = '1m';
      break;
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

export const fetchTradingViewChartData = createAsyncThunk(
  'tradingViewChart/fetchTradingViewChartData',
  async ({ interval, startDate, endDate }, { rejectWithValue }) => {
    try {
      const { interval: adjustedInterval, expandedStartDate, expandedEndDate } = adjustDates(interval, startDate, endDate);

      if (!expandedStartDate || !expandedEndDate || expandedStartDate >= expandedEndDate) {
        return rejectWithValue('Invalid date range');
      }

      const response = await axios.get(`${config.apiURL}/bingx/get-k-line-data`, {
        params: {
          symbol: "BTC-USDT",
          interval: adjustedInterval,
          limit: "1440",
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

        const lastPrice = formattedData[formattedData.length - 1]?.[4] || null;

        return { formattedData, lastPrice };
      } else {
        return rejectWithValue(resultData.msg || 'Unknown error from API');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const tradingViewChartSlice = createSlice({
  name: 'tradingViewChart',
  initialState: {
    data: [],
    loading: false,
    error: null,
    startDate: null,
    endDate: null,
    interval: '1d',
    lastPrice: null
  },
  reducers: {
    setTradingViewChartParameters(state, action) {
      state.startDate = new Date(action.payload.startDate).toISOString();
      state.endDate = new Date(action.payload.endDate).toISOString();
      state.interval = action.payload.interval;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradingViewChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradingViewChartData.fulfilled, (state, action) => {
        state.data = action.payload.formattedData;
        state.lastPrice = action.payload.lastPrice;
        state.loading = false;
      })
      .addCase(fetchTradingViewChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setTradingViewChartParameters } = tradingViewChartSlice.actions;
export const selectTradingViewChartData = state => state.tradingViewChart.data;
export const selectTradingViewChartLoading = state => state.tradingViewChart.loading;
export const selectTradingViewChartError = state => state.tradingViewChart.error;
export const selectTradingViewChartStartDate = state => state.tradingViewChart.startDate;
export const selectTradingViewChartEndDate = state => state.tradingViewChart.endDate;
export const selectTradingViewChartInterval = state => state.tradingViewChart.interval;
export const selectLastPrice = state => state.tradingViewChart.lastPrice;

export default tradingViewChartSlice.reducer;
