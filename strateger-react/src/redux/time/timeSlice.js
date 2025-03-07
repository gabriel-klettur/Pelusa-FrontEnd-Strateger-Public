// Path: strateger-react/src/slices/timeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  localTime: new Date().toISOString(),
  chinaTime: new Date().toISOString(),
  usTime: new Date().toISOString(),
  germanyTime: new Date().toISOString(),
  ukTime: new Date().toISOString(),
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    updateTime: (state) => {
      const now = new Date();
      state.localTime = now.toISOString();
      state.chinaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })).toISOString();
      state.usTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' })).toISOString();
      state.germanyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Berlin' })).toISOString();
      state.ukTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' })).toISOString();
    },
  },
});

export const { updateTime } = timeSlice.actions;
export default timeSlice.reducer;
