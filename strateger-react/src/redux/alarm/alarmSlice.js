//Path: strateger-react/src/redux/slices/alarmSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchAlarms } from './alarmThunks';

const initialStates = {
  data: [],
  loading: false,
  error: null,
  page: 0,
  offset: 0,
  hasMore: true,
};

const alarmSlice = createSlice({
  name: 'alarms',
  initialState: {
    alarms: initialStates,     
    filteredByClickAlarms: initialStates,   
    filteredByIntervalAlarms: initialStates,
    filteredByIntervalAndTypeAlarms: initialStates,
    strategyFilteredAlarms: [],
    page: 0,
    offset: 0,
    hasMore: true,  
    loading: false,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.alarms.page = action.payload;
    },
    setFilteredByClickAlarms(state, action) {
      const sortedAlarms = action.payload.sort((a, b) => b.id - a.id);
      state.filteredByClickAlarms.data = sortedAlarms;
    },
    setFilteredByIntervalAlarms(state, action) {
      const sortedAlarms = action.payload.sort((a, b) => b.id - a.id);
      state.filteredByIntervalAlarms.data = sortedAlarms;
    },
    setFilteredByIntervalAndTypeAlarms(state, action) {
      const sortedAlarms = action.payload.sort((a, b) => b.id - a.id);
      state.filteredByIntervalAndTypeAlarms.data = sortedAlarms;
    },
    setStrategyFilteredAlarms(state, action) {
      state.strategyFilteredAlarms = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlarms.pending, (state) => {
        state.alarms.loading = true;
        state.alarms.error = null;
      })
      .addCase(fetchAlarms.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.alarms.hasMore = false;
        }        
        const newAlarms = action.payload.sort((a, b) => b.id - a.id);
        state.alarms.data = [...state.alarms.data, ...newAlarms];
        state.alarms.loading = false;
        state.alarms.offset += 500;
      })
      .addCase(fetchAlarms.rejected, (state, action) => {
        state.alarms.loading = false;
        state.alarms.error = action.error.message;
      });
  },
});

export const {
  setPage,
  setFilteredByClickAlarms,
  setFilteredByIntervalAlarms,
  setFilteredByIntervalAndTypeAlarms,  
  setStrategyFilteredAlarms,
} = alarmSlice.actions;



export default alarmSlice.reducer;
