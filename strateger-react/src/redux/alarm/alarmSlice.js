//Path: strateger-react/src/redux/slices/alarmSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchAlarms } from './alarmThunks';

const alarmSlice = createSlice({
  name: 'alarms',
  initialState: {
    alarms: [],     
    filteredByClickAlarms: [],   
    filteredByIntervalAlarms: [],
    filteredByIntervalAndTypeAlarms: [],
    strategyFilteredAlarms: [],
    page: 0,
    offset: 0,
    hasMore: true,  
    loading: false,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setFilteredByClickAlarms(state, action) {
      const sortedAlarms = action.payload.sort((a, b) => b.id - a.id);
      state.filteredByClickAlarms = sortedAlarms;
    },
    setFilteredByIntervalAlarms(state, action) {
      const sortedAlarms = action.payload.sort((a, b) => b.id - a.id);
      state.filteredByIntervalAlarms = sortedAlarms;
    },
    setFilteredByIntervalAndTypeAlarms(state, action) {
      const sortedAlarms = action.payload.sort((a, b) => b.id - a.id);
      state.filteredByIntervalAndTypeAlarms = sortedAlarms;
    },
    setStrategyFilteredAlarms(state, action) {
      state.strategyFilteredAlarms = action.payload;
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
        const newAlarms = action.payload.sort((a, b) => b.id - a.id);
        state.alarms = [...state.alarms, ...newAlarms];
        state.loading = false;
        state.offset += 500;
      })
      .addCase(fetchAlarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
