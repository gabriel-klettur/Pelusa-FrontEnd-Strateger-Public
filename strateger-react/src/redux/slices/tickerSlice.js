// Path: strateger-react/src/slices/tickerSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchTicker = createAsyncThunk(
  'ticker/fetchTicker',
  async (symbol) => {
    const response = await axios.get(`${config.apiURL}/bingx/get-ticker`, {
      params: { symbol }
    });
    const data = JSON.parse(response.data);
    if (data && data.data) {
      return { symbol, lastPrice: parseFloat(data.data.lastPrice) };
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

const tickerSlice = createSlice({
  name: 'ticker',
  initialState: {
    prices: {},
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicker.fulfilled, (state, action) => {
        state.prices[action.payload.symbol] = action.payload.lastPrice;
        state.loading = false;
      })
      .addCase(fetchTicker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

//Selectors
export const selectTicker = (state) => state.ticker.prices;

export default tickerSlice.reducer;


