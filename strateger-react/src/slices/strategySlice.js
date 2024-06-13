import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:80/strateger';

const getStrategies = async (skip = 0, limit = 10) => {
    const response = await axios.get(`${BASE_URL}/list`, { params: { skip, limit } });
    return response.data;
};

const getStrategy = async (strategyId) => {
    const response = await axios.get(`${BASE_URL}/get/${strategyId}`);
    return response.data;
};

const createStrategy = async (strategy) => {
    const response = await axios.post(`${BASE_URL}/insert`, strategy);    
    return response.data;
};

const updateStrategy = async (strategyId, strategy) => {
    const response = await axios.put(`${BASE_URL}/update/${strategyId}`, strategy);
    return response.data;
};

const deleteStrategy = async (strategyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${strategyId}`);
    if (response.status === 200) {
      return strategyId;
    } else {
      throw new Error('Failed to delete the strategy');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// Thunks for async actions
export const fetchStrategies = createAsyncThunk('strategies/fetchStrategies', async ({ skip, limit }) => {
    return await getStrategies(skip, limit);
});

export const fetchStrategy = createAsyncThunk('strategies/fetchStrategy', async (strategyId) => {
    return await getStrategy(strategyId);
});

export const saveStrategy = createAsyncThunk('strategies/saveStrategy', async (strategy) => {
    if (strategy.id) {
        return await updateStrategy(strategy.id, strategy);
    } else {
        return await createStrategy(strategy);
    }
});

export const removeStrategy = createAsyncThunk('strategies/removeStrategy', async (strategyId, { rejectWithValue }) => {
  try {
    return await deleteStrategy(strategyId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

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
