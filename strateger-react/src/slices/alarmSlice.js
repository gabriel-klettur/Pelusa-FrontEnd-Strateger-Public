// Path: strateger-react/src/slices/alarmSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAlarms = createAsyncThunk(
  'alarms/fetchAlarms',
  async (page) => {
    const response = await axios.get(`http://127.0.0.1:80/alarms/alarms?limit=10&offset=${page * 10}&latest=true`);
    return response.data.sort((a, b) => b.id - a.id);
  }
);

const alarmSlice = createSlice({
  name: 'alarms',
  initialState: {
    alarms: [],
    loading: false,
    error: null,
    page: 0,
    selectedAlarms: [], // Añadido
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSelectedAlarms(state, action) {
      state.selectedAlarms = action.payload; // Añadido
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlarms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlarms.fulfilled, (state, action) => {
        state.alarms = action.payload;
        state.loading = false;
      })
      .addCase(fetchAlarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setSelectedAlarms } = alarmSlice.actions; // Añadido

export default alarmSlice.reducer;
