// Path: strateger-react/src/slices/positionSlice.js

import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

// Async thunks for fetching positions
export const fetchPositionsCoinM = createAsyncThunk(
  'positions/fetchPositionsCoinM',
  async () => {
    const response = await axios.get(`${config.apiURL}/bingx/get-positions-coinm`);
    const data = JSON.parse(response.data);
    if (data && data.data) {
      return data.data;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

export const fetchPositionsUSDTM = createAsyncThunk(
  'positions/fetchPositionsUSDTM',
  async () => {
    const response = await axios.get(`${config.apiURL}/bingx/get-positions-usdtm`);
    const data = JSON.parse(response.data);
    if (data && data.data) {
      return data.data;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

export const fetchSpotDepositRecords = createAsyncThunk(
  'positions/fetchSpotDepositRecords',
  async () => {
    const response = await axios.get(`${config.apiURL}/bingx/get-spot-deposit-records`);
    const data = JSON.parse(response.data); // Analiza el JSON string
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

// Initial state
const initialState = {
  coinM: {
    positions: [],
    loading: false,
    error: null
  },
  usdtM: {
    positions: [],
    loading: false,
    error: null
  },
  spot: {
    records: [],
    loading: false,
    error: null
  }
};

// Position slice
const positionSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CoinM positions
      .addCase(fetchPositionsCoinM.pending, (state) => {
        state.coinM.loading = true;
        state.coinM.error = null;
      })
      .addCase(fetchPositionsCoinM.fulfilled, (state, action) => {
        state.coinM.positions = action.payload;
        state.coinM.loading = false;
        state.coinM.loaded = true;
      })
      .addCase(fetchPositionsCoinM.rejected, (state, action) => {
        state.coinM.loading = false;
        state.coinM.error = action.error.message;
      })
      // USDTM positions
      .addCase(fetchPositionsUSDTM.pending, (state) => {
        state.usdtM.loading = true;
        state.usdtM.error = null;
      })
      .addCase(fetchPositionsUSDTM.fulfilled, (state, action) => {
        state.usdtM.positions = action.payload;
        state.usdtM.loading = false;
        state.usdtM.loaded = true;
      })
      .addCase(fetchPositionsUSDTM.rejected, (state, action) => {
        state.usdtM.loading = false;
        state.usdtM.error = action.error.message;
      })
      // Spot deposit records
      .addCase(fetchSpotDepositRecords.pending, (state) => {
        state.spot.loading = true;
        state.spot.error = null;
      })
      .addCase(fetchSpotDepositRecords.fulfilled, (state, action) => {
        state.spot.records = action.payload;
        state.spot.loading = false;
      })
      .addCase(fetchSpotDepositRecords.rejected, (state, action) => {
        state.spot.loading = false;
        state.spot.error = action.error.message;
      });
  }
});

// Selectors
export const selectCoinMPositions = (state) => state.positions.coinM;
export const selectUSDTMPositions = (state) => state.positions.usdtM;
export const selectSpotRecords = (state) => state.positions.spot;

export const selectCoinMPositionsList = createSelector(
  [selectCoinMPositions],
  (coinM) => coinM?.positions || []
);

export const selectUSDTMPositionsList = createSelector(
  [selectUSDTMPositions],
  (usdtM) => usdtM?.positions || []
);

export const selectSpotRecordsList = createSelector(
  [selectSpotRecords],
  (spot) => spot?.records || []
);

export const selectCoinMLoading = createSelector(
  [selectCoinMPositions],
  (coinM) => coinM?.loading
);

export const selectUSDTMLoading = createSelector(
  [selectUSDTMPositions],
  (usdtM) => usdtM?.loading
);

export const selectSpotLoading = createSelector(
  [selectSpotRecords],
  (spot) => spot?.loading
);

export const selectCoinMError = createSelector(
  [selectCoinMPositions],
  (coinM) => coinM?.error
);

export const selectUSDTMError = createSelector(
  [selectUSDTMPositions],
  (usdtM) => usdtM?.error
);

export const selectSpotError = createSelector(
  [selectSpotRecords],
  (spot) => spot?.error
);

export default positionSlice.reducer;
