// src/slices/tradingViewChartSlice.js

import { createSlice } from '@reduxjs/toolkit';

import { fetchTradingViewChartData } from './tradingViewChartThunks';

const tradingViewChartSlice = createSlice({
  name: 'tradingViewChart',
  initialState: {
    data: [],
    loading: false,
    error: null,
    startDate: null,
    endDate: null,
    interval: '1d',
    lastPrice: null,
    alarmMarkers: [], // nuevo estado para los marcadores de alarmas
    orderMarkers: [], // nuevo estado para los marcadores de órdenes
    positionMarkers: [], // nuevo estado para los marcadores de posiciones
  },
  reducers: {
    setTradingViewChartParameters(state, action) {
      state.startDate = new Date(action.payload.startDate).toISOString();
      state.endDate = new Date(action.payload.endDate).toISOString();
      state.interval = action.payload.interval;
    },
    setAlarmMarkers(state, action) {
      state.alarmMarkers = action.payload;
    },
    setOrderMarkers(state, action) {
      state.orderMarkers = action.payload;
    },
    setPositionMarkers(state, action) {
      state.positionMarkers = action.payload;
    },
    updateChartData(state, action) {      
      state.data = action.payload;                    // Actualizar los datos del gráfico
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradingViewChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradingViewChartData.fulfilled, (state, action) => {
        state.data = action.payload.formattedData;
        state.lastPrice = action.payload.lastPrice;
        state.loading = false;
      })
      .addCase(fetchTradingViewChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setTradingViewChartParameters, setAlarmMarkers, setOrderMarkers, setPositionMarkers, updateChartData } = tradingViewChartSlice.actions;

export default tradingViewChartSlice.reducer;

