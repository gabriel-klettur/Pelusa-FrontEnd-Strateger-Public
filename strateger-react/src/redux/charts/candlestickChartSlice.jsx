//Path: strateger-react/src/redux/charts/CandlestickChartSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

import { fetchCandlestickChartData } from './candlestickChartThunks';

const candlestickChartSlice = createSlice({
  name: 'candlestickChart',
  initialState: {
    data: [],    
    startDate: null,
    endDate: null,
    interval: '1d',
    alarmMarkers: [], 
    orderMarkers: [], 
    positionMarkers: [],
    diaryMarkers: [],
    strategyMarkers: [],
    backTestingMarkers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCandlestickChartParameters(state, action) {
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
      state.data = action.payload;                  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandlestickChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandlestickChartData.fulfilled, (state, action) => {
        state.data = action.payload.formattedData;        
        state.loading = false;
      })
      .addCase(fetchCandlestickChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCandlestickChartParameters, setAlarmMarkers, setOrderMarkers, setPositionMarkers, updateChartData } = candlestickChartSlice.actions;

export default candlestickChartSlice.reducer;

