// Path: strateger-react/src/slices/positionSlice.js

import { createSlice } from '@reduxjs/toolkit';

import { fetchPositionsCoinM, fetchPositionsUSDTM, fetchSpotDepositRecords } from './positionThunks';

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

export default positionSlice.reducer;
