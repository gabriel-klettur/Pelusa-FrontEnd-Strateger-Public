import { createSlice } from '@reduxjs/toolkit';

const strategySlice = createSlice({
  name: 'strategies',
  initialState: {
    items: []
  },
  reducers: {
    setStrategies(state, action) {
      state.items = action.payload;
    },
    addStrategy(state, action) {
      state.items.push(action.payload);
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

export const { setStrategies, addStrategy, updateStrategy, deleteStrategy } = strategySlice.actions;
export default strategySlice.reducer;
