// Path: strateger-react/src/slices/spotSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';
import { createSelector } from 'reselect';

export const fetchSpotBalance = createAsyncThunk(
  'spot/fetchSpotBalance',
  async () => {
    const response = await axios.get(`${config.apiURL}/bingx/get-balance-spot`);
    const data = JSON.parse(response.data); // Parsea la cadena JSON
    if (data && data.data && data.data.balances) {
      return data.data.balances;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

const initialState = {
  balances: [], // Aseguramos que balances sea una lista vacía por defecto
  loading: false,
  error: null
};

const spotSlice = createSlice({
  name: 'spot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpotBalance.fulfilled, (state, action) => {
        state.balances = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpotBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectSpot = (state) => state.spot;

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

export default spotSlice.reducer;
