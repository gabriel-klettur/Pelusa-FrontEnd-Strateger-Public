//Path: strateger-react/src/redux/charts/CandlestickChartSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

import { fetchCandlestickChartData } from './candlestickChartThunks';

const alarmMarkersStates = {
  default: [],
  selectedByClick: [],
  filteredByInterval: [],
  filteredByIntervalAndType: [],  
};

const markersStates = {
  alarm: alarmMarkersStates,
  orders: [],
};

const candlestickChartSlice = createSlice({
  name: 'candlestickChart',
  initialState: {
    data: [],    
    startDate: null,
    endDate: null,
    interval: '1d',
    markers: markersStates,       
    loading: false,
    error: null,
  },
  reducers: {
    setCandlestickChartParameters(state, action) {
      state.startDate = new Date(action.payload.startDate).toISOString();
      state.endDate = new Date(action.payload.endDate).toISOString();
      state.interval = action.payload.interval;
    },
    setOrderMarkers(state, action) {
      state.orderMarkers = action.payload;
    },
    updateChartData(state, action) {      
      state.data = action.payload;                  
    },
    setAlarmDefaultMarkers(state, action) {
      state.markers.alarm.default = action.payload;
    },
    setAlarmSelectedByClickMarkers(state, action) {
      state.markers.alarm.selectedByClick = action.payload;
    },
    setAlarmFilteredByIntervalMarkers(state, action) {
      state.markers.alarm.filteredByInterval = action.payload;
    },
    setAlarmFilteredByIntervalAndTypeMarkers(state, action) {
      state.markers.alarm.filteredByIntervalAndType = action.payload;
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

export const {  setCandlestickChartParameters, 
                updateChartData,
                setAlarmMarkers, setAlarmDefaultMarkers, setAlarmSelectedByClickMarkers, setAlarmFilteredByIntervalMarkers, setAlarmFilteredByIntervalAndTypeMarkers
} = candlestickChartSlice.actions;

export default candlestickChartSlice.reducer;

