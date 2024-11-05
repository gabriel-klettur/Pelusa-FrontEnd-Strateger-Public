// Path: strateger-react/src/slices/diarySlice.js

import { createSlice } from '@reduxjs/toolkit';

import { fetchDiaryEntries, saveDiaryEntry, removeDiaryEntry } from './diaryThunks'; 

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDiaryEntries(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiaryEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDiaryEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveDiaryEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveDiaryEntry.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((entry) => entry.id === action.payload.id);
        if (index === -1) {
          state.items.push(action.payload);
        } else {
          state.items[index] = action.payload;
        }
      })
      .addCase(saveDiaryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeDiaryEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeDiaryEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((entry) => entry.id !== action.payload);
      })
      .addCase(removeDiaryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDiaryEntries } = diarySlice.actions;
export default diarySlice.reducer;
