//Path: strateger-react/src/slices/alarmSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchAlarms = createAsyncThunk(
  'alarms/fetchAlarms',
  async (page) => {
    const response = await axios.get(`${config.apiURL}/alarms/alarms?limit=10&offset=${page * 20}&latest=true`);
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
        state.alarms = action.payload;
        state.loading = false;
      })
      .addCase(fetchAlarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setSelectedAlarms } = alarmSlice.actions; 

export default alarmSlice.reducer;
