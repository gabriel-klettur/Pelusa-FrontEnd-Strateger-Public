//Path: strateger-react/src/redux/charts/CandlestickChartSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

import { fetchCandlestickChartData } from './candlestickChartThunks';

const alarmMarkersStates = {
  default: [],
  selectedByClick: [],
  filtered: [],  
};

const orderMarkersStates = {  
  usdm: [],
  coinm: [],
  standard: [],
  spot: [],
};

const markersStates = {
  alarm: alarmMarkersStates,
  orders: orderMarkersStates,
};

const candlestickChartSlice = createSlice({
  name: 'candlestickChart',
  initialState: {
    data: [],    
    startDate: null,
    endDate: null,
    ticker: null,
    interval: null,
    markers: markersStates,       
    loading: false,
    error: null,
  },
  reducers: {
    //!---------------------------- Parameters ----------------------------
    setCandlestickChartParameters(state, action) {
      state.startDate = new Date(action.payload.startDate).toISOString();
      state.endDate = new Date(action.payload.endDate).toISOString();
      state.interval = action.payload.interval;
      state.ticker = action.payload.ticker;
    },
    //!------------------------------- Data -------------------------------
    updateChartData(state, action) {      
      state.data = action.payload;                  
    },
    //!------------------------------ Alarms ------------------------------
    setAlarmDefaultMarkers(state, action) {
      state.markers.alarm.default = action.payload;
    },
    setAlarmSelectedByClickMarkers(state, action) {
      state.markers.alarm.selectedByClick = action.payload;
    },
    setAlarmFilteredMarkers(state, action) {
      state.markers.alarm.filtered = action.payload;
    },
    //!------------------------------ Orders ------------------------------
    setOrderUsdmMarkers(state, action) {
      state.markers.orders.usdm = action.payload;
    },
    setOrderCoinmMarkers(state, action) {
      state.markers.orders.coinm = action.payload;
    },
    setOrderStandardMarkers(state, action) {
      state.markers.orders.standard = action.payload;
    },
    setOrderSpotMarkers(state, action) {
      state.markers.orders.spot = action.payload;
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
                setAlarmMarkers, setAlarmDefaultMarkers, setAlarmSelectedByClickMarkers, setAlarmFilteredMarkers,
                setOrderMarkers, setOrderUsdmMarkers, setOrderCoinmMarkers, setOrderStandardMarkers, setOrderSpotMarkers
} = candlestickChartSlice.actions;

export default candlestickChartSlice.reducer;

