//Path: strateger-react/src/slices/orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (page) => {
    const response = await axios.get(`${config.apiUrl}/strateger/orders?limit=10&offset=${page * 20}`);
    return response.data.sort((a, b) => b.id - a.id);
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    page: 0,
    selectedOrderId: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSelectedOrderId(state, action) {
      state.selectedOrderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setSelectedOrderId } = orderSlice.actions;
export default orderSlice.reducer;
