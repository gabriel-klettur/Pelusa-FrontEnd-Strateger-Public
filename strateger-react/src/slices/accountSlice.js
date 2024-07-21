// Path: strateger-react/src/slices/accountSlice.js

import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

// Async thunks for fetching balances
export const fetchPerpUSDTMBalance = createAsyncThunk(
  'account/fetchPerpUSDTMBalance',
  async () => {
    const response = await axios.get(`${config.apiURL}/bingx/get-balance-perp-usdtm`);
    const data = JSON.parse(response.data);
    if (data && data.data && data.data.balance) {
      return data.data.balance;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

export const fetchPerpCOINMBalance = createAsyncThunk(
  'account/fetchPerpCOINMBalance',
  async () => {
    const response = await axios.get(`${config.apiURL}/bingx/get-balance-perp-coinm`);
    const data = JSON.parse(response.data);
    if (data && data.data) {
      return data.data;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

export const fetchSpotBalance = createAsyncThunk(
  'account/fetchSpotBalance',
  async () => {
    const response = await axios.get(`${config.apiURL}/bingx/get-balance-spot`);
    const data = JSON.parse(response.data);
    if (data && data.data && data.data.balances) {
      return data.data.balances;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

// Initial state
const initialState = {
  perpUSDTM: {
    balance: null,
    loading: false,
    error: null,
    loaded: false
  },
  perpCOINM: {
    balances: [],
    loading: false,
    error: null,
    loaded: false
  },
  spot: {
    balances: [],
    loading: false,
    error: null,
    loaded: false
  }
};

// Account slice
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Perp USDT-M balance
      .addCase(fetchPerpUSDTMBalance.pending, (state) => {
        state.perpUSDTM.loading = true;
        state.perpUSDTM.error = null;
      })
      .addCase(fetchPerpUSDTMBalance.fulfilled, (state, action) => {
        state.perpUSDTM.balance = action.payload;
        state.perpUSDTM.loading = false;
        state.perpUSDTM.loaded = true;
      })
      .addCase(fetchPerpUSDTMBalance.rejected, (state, action) => {
        state.perpUSDTM.loading = false;
        state.perpUSDTM.error = action.error.message;
      })
      // Perp COIN-M balance
      .addCase(fetchPerpCOINMBalance.pending, (state) => {
        state.perpCOINM.loading = true;
        state.perpCOINM.error = null;
      })
      .addCase(fetchPerpCOINMBalance.fulfilled, (state, action) => {
        state.perpCOINM.balances = action.payload;
        state.perpCOINM.loading = false;
        state.perpCOINM.loaded = true;
      })
      .addCase(fetchPerpCOINMBalance.rejected, (state, action) => {
        state.perpCOINM.loading = false;
        state.perpCOINM.error = action.error.message;
      })
      // Spot balance
      .addCase(fetchSpotBalance.pending, (state) => {
        state.spot.loading = true;
        state.spot.error = null;
      })
      .addCase(fetchSpotBalance.fulfilled, (state, action) => {
        state.spot.balances = action.payload;
        state.spot.loading = false;
        state.spot.loaded = true;
      })
      .addCase(fetchSpotBalance.rejected, (state, action) => {
        state.spot.loading = false;
        state.spot.error = action.error.message;
      });
  }
});

// Selectors
export const selectPerpUSDTM = (state) => state.account.perpUSDTM;
export const selectPerpCOINM = (state) => state.account.perpCOINM;
export const selectSpot = (state) => state.account.spot;

export const selectBalances = createSelector(
  [selectSpot],
  (spot) => spot?.balances || []
);

export const selectLoading = createSelector(
  [selectSpot],
  (spot) => spot?.loading
);

export const selectError = createSelector(
  [selectSpot],
  (spot) => spot?.error
);

export const selectLoaded = createSelector(
  [selectSpot],
  (spot) => spot?.loaded
);



export default accountSlice.reducer;

