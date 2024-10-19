//Path: strateger-react/src/slices/strategySlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchStrategies, saveStrategy, removeStrategy } from './strategyThunks';

const strategySlice = createSlice({
  name: 'strategies',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setStrategies(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStrategies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStrategies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStrategies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveStrategy.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveStrategy.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index === -1) {
          state.items.push(action.payload);
        } else {
          state.items[index] = action.payload;
        }
      })
      .addCase(saveStrategy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeStrategy.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeStrategy.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((s) => s.id !== action.payload);
      })
      .addCase(removeStrategy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Mostrar error en el estado
      });
  },
});

export const { setStrategies } = strategySlice.actions;
export default strategySlice.reducer;
