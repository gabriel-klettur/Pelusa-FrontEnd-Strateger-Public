// Path: strateger-react/src/slices/accountSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dailyResults: [],
  strategyResults: [],
  pnl: 0,
  successRate: 0,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountData: (state, action) => {
      state.dailyResults = action.payload.dailyResults;
      state.strategyResults = action.payload.strategyResults;
      state.pnl = action.payload.pnl;
      state.successRate = action.payload.successRate;
    },
  },
});

export const { setAccountData } = accountSlice.actions;
export default accountSlice.reducer;
