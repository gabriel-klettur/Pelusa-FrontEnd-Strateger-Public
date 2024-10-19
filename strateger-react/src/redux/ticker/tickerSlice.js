// Path: strateger-react/src/slices/tickerSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchTicker } from './tickerThunks';

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


export default tickerSlice.reducer;


