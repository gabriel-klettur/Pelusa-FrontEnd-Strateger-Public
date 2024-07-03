// Path: strateger-react/src/slices/perpCOINMSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchPerpCOINMBalance = createAsyncThunk(
  'perpCOINM/fetchPerpCOINMBalance',
  async () => {
    const response = await axios.get(`${config.apiURL}/bingx/get-balance-perp-coinm`);
    const data = JSON.parse(response.data); // Parsea la cadena JSON
    if (data && data.data) {
      return data.data;
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

const perpCOINMSlice = createSlice({
  name: 'perpCOINM',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerpCOINMBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPerpCOINMBalance.fulfilled, (state, action) => {
        state.balances = action.payload;
        state.loading = false;
      })
      .addCase(fetchPerpCOINMBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default perpCOINMSlice.reducer;
