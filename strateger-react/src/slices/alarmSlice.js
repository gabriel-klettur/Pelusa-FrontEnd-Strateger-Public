// Path: strateger-react/src/slices/alarmSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchAlarms = createAsyncThunk(
  'alarms/fetchAlarms',
  async ({ limit, offset }) => {
    const response = await axios.get(`${config.apiURL}/alarms/alarms?limit=${limit}&offset=${offset}&latest=true`);
    return response.data.sort((a, b) => b.id - a.id);
  }
);

const initialFilteredTemporalidades = {
  '1m': 0, '5m': 0, '15m': 0, '30m': 0, '1h': 0, '4h': 0, 'D': 0, 'W': 0, 'M': 0
};

const alarmSlice = createSlice({
  name: 'alarms',
  initialState: {
    alarms: [],
    loading: false,
    error: null,
    page: 0,
    selectedAlarms: [],
    allSelectedAlarms: [],
    strategyFilteredAlarms: [],  // Añadido
    offset: 0,
    hasMore: true,
    filteredTemporalidades: initialFilteredTemporalidades, // Añadido
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSelectedAlarms(state, action) {
      state.selectedAlarms = action.payload;
    },
    setAllSelectedAlarms(state, action) {
      state.allSelectedAlarms = action.payload;
    },
    setStrategyFilteredAlarms(state, action) { // Añadido
      state.strategyFilteredAlarms = action.payload;
    },
    incrementTemporalidad(state, action) { // Añadido
      state.filteredTemporalidades[action.payload]++;
    },
    decrementTemporalidad(state, action) { // Añadido
      if (state.filteredTemporalidades[action.payload] > 0) {
        state.filteredTemporalidades[action.payload]--;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlarms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlarms.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.hasMore = false;
        }
        state.alarms = [...state.alarms, ...action.payload];
        state.loading = false;
        state.offset += 500;
      })
      .addCase(fetchAlarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setSelectedAlarms, setAllSelectedAlarms, setStrategyFilteredAlarms, incrementTemporalidad, decrementTemporalidad } = alarmSlice.actions;
export const selectSelectedAlarms = (state) => state.alarms.selectedAlarms;
export const selectAllSelectedAlarms = (state) => state.alarms.allSelectedAlarms; // Añadido para seleccionar allSelectedAlarms
export const selectStrategyFilteredAlarms = (state) => state.alarms.strategyFilteredAlarms; // Añadido para seleccionar strategyFilteredAlarms
export const selectFilteredTemporalidades = (state) => state.alarms.filteredTemporalidades;

export default alarmSlice.reducer;

