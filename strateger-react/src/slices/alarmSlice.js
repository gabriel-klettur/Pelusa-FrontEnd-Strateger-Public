//Path: strateger-react/src/slices/alarmSlice.js
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

const alarmSlice = createSlice({
  name: 'alarms',
  initialState: {
    alarms: [],
    loading: false,
    error: null,
    page: 0,
    selectedAlarms: [],
    offset: 0, // Nueva propiedad para manejar el desplazamiento
    hasMore: true, // Nueva propiedad para saber si hay más alarmas que cargar
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSelectedAlarms(state, action) {
      state.selectedAlarms = action.payload;
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
          state.hasMore = false; // Si se cargaron menos de 500 alarmas, no hay más para cargar
        }
        state.alarms = [...state.alarms, ...action.payload];
        state.loading = false;
        state.offset += 500; // Incrementar el desplazamiento
      })
      .addCase(fetchAlarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setSelectedAlarms } = alarmSlice.actions;
export const selectSelectedAlarms = (state) => state.alarms.selectedAlarms;

export default alarmSlice.reducer;
