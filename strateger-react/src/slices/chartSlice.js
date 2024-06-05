// chartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    startDate: null,
    endDate: null,
    temporalidad: '1d'
  },
  reducers: {
    setChartParameters(state, action) {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.temporalidad = action.payload.temporalidad;
    }
  }
});

export const { setChartParameters } = chartSlice.actions;
export default chartSlice.reducer;
