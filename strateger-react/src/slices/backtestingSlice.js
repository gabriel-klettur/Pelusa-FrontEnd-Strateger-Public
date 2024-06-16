// Path: strateger-react/src/slices/backtestingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tests: [
    { id: 1, name: 'Test 1', strategy: 'Strategy A', result: 'Success', pnl: 150, date: '2024-06-01' },
    { id: 2, name: 'Test 2', strategy: 'Strategy B', result: 'Failure', pnl: -50, date: '2024-06-02' },
  ],
};

const backtestingSlice = createSlice({
  name: 'backtesting',
  initialState,
  reducers: {
    addTest: (state, action) => {
      state.tests.push({ ...action.payload, id: state.tests.length + 1 });
    },
    updateTest: (state, action) => {
      const index = state.tests.findIndex(test => test.id === action.payload.id);
      if (index !== -1) {
        state.tests[index] = action.payload;
      }
    },
    deleteTest: (state, action) => {
      state.tests = state.tests.filter(test => test.id !== action.payload.id);
    },
  },
});

export const { addTest, updateTest, deleteTest } = backtestingSlice.actions;
export default backtestingSlice.reducer;
