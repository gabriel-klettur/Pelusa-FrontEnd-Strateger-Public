// Path: strateger-react/src/slices/strategySlice.js

import { createSlice } from '@reduxjs/toolkit';

const strategySlice = createSlice({
  name: 'strategies',
  initialState: {
    items: []
  },
  reducers: {
    addStrategy(state, action) {
      state.items.push({ ...action.payload, id: state.items.length + 1 });
    },
    updateStrategy(state, action) {
      const index = state.items.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteStrategy(state, action) {
      state.items = state.items.filter((s) => s.id !== action.payload);
    }
  }
});

export const { addStrategy, updateStrategy, deleteStrategy } = strategySlice.actions;
export default strategySlice.reducer;
