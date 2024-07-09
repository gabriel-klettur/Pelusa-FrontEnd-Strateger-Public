import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

const BASE_URL = `${config.apiURL}/strateger/diary`;

const createDiaryEntry = async (entry) => {
  console.log('Creating new diary entry:', entry);
  const response = await axios.post(`${BASE_URL}/insert`, entry);    
  return response.data;
};

const updateDiaryEntry = async (entryId, entry) => {
  console.log('Updating diary entry:', entryId, entry);
  const response = await axios.put(`${BASE_URL}/update/${entryId}`, entry);
  return response.data;
};

// Thunks for async actions
export const fetchDiaryEntries = createAsyncThunk('diary/fetchDiaryEntries', async ({ skip, limit }) => {
  const response = await axios.get(`${BASE_URL}/list`, { params: { skip, limit } });
  return response.data;
});

export const saveDiaryEntry = createAsyncThunk('diary/saveDiaryEntry', async (entry) => {
  console.log('saveDiaryEntry called with:', entry);
  if (entry.id && entry.id !== '') {
    return await updateDiaryEntry(entry.id, entry);
  } else {
    return await createDiaryEntry(entry);
  }
});

export const removeDiaryEntry = createAsyncThunk('diary/removeDiaryEntry', async (entryId, { rejectWithValue }) => {
  console.log('removeDiaryEntry called with id:', entryId);
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${entryId}`);
    if (response.status === 200) {
      return entryId;
    } else {
      throw new Error('Failed to delete the diary entry');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

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
