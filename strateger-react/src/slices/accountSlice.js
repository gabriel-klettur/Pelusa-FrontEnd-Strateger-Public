// Path: strateger-react/src/slices/accountSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchBalance = createAsyncThunk(
  'account/fetchBalance',
  async () => {
    const response = await axios.get(`${config.apiURL}/bingx/get-balance-perp-usdtm`);
    const data = JSON.parse(response.data); // Parsea la cadena JSON
    if (data && data.data && data.data.balance) {
      return data.data.balance;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

const initialState = {
  balance: {
    userId: '',
    asset: '',
    balance: '',
    equity: '',
    unrealizedProfit: '',
    realisedProfit: '',
    availableMargin: '',
    usedMargin: '',
    freezedMargin: '',
    shortUid: ''
  },
  loading: false,
  error: null
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.loading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default accountSlice.reducer;
