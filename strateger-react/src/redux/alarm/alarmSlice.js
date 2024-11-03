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
  },
  reducers: {
    setPageAlarms(state, action) {
      state.alarms.page = action.payload;
    },
    setPageFilteredByClickAlarms(state, action) {
      state.filteredByClickAlarms.page = action.payload;
    },
    setPageFilteredByIntervalAlarms(state, action) {
      state.filteredByIntervalAlarms.page = action.payload;
    },
    setPageFilteredByIntervalAndTypeAlarms(state, action) {
      state.filteredByIntervalAndTypeAlarms.page = action.payload;
    },
    setHasMoreAlarms(state, action) {
      state.alarms.hasMore = action.payload;
    },
    setHasMoreFilteredByClickAlarms(state, action) {
      state.filteredByClickAlarms.hasMore = action.payload;
    },
    setHasMoreFilteredByIntervalAlarms(state, action) {
      state.filteredByIntervalAlarms.hasMore = action.payload;
    },
    setHasMoreFilteredByIntervalAndTypeAlarms(state, action) {
      state.filteredByIntervalAndTypeAlarms.hasMore = action.payload;
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
  setPageAlarms,
  setPageFilteredByClickAlarms,
  setPageFilteredByIntervalAlarms,
  setPageFilteredByIntervalAndTypeAlarms,
  setHasMoreAlarms,
  setHasMoreFilteredByClickAlarms,
  setHasMoreFilteredByIntervalAlarms,
  setHasMoreFilteredByIntervalAndTypeAlarms,
  setFilteredByClickAlarms,
  setFilteredByIntervalAlarms,
  setFilteredByIntervalAndTypeAlarms,  
  setStrategyFilteredAlarms,
} = alarmSlice.actions;



export default alarmSlice.reducer;
