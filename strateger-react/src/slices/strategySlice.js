// Path: strateger-react/src/slices/strategySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

export const fetchStrategies = createAsyncThunk('strategies/fetchStrategies', async () => {
  const response = await api.getStrategies();
  return response;
});

export const addStrategy = createAsyncThunk('strategies/addStrategy', async (strategy) => {
  const response = await api.createStrategy(strategy);
  return response;
});

export const updateStrategy = createAsyncThunk('strategies/updateStrategy', async ({ id, data }) => {
  const response = await api.updateStrategy(id, data);
  return response;
});

export const deleteStrategy = createAsyncThunk('strategies/deleteStrategy', async (id) => {
  await api.deleteStrategy(id);
  return id;
});

const strategySlice = createSlice({
  name: 'strategies',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStrategies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStrategies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStrategies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStrategy.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateStrategy.fulfilled, (state, action) => {
        const index = state.items.findIndex((strategy) => strategy.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteStrategy.fulfilled, (state, action) => {
        state.items = state.items.filter((strategy) => strategy.id !== action.payload);
      });
  },
});

export default strategySlice.reducer;
