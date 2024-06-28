// Path: strateger-react/src/slices/orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import axios from 'axios';
import config from '../config';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ limit, offset }) => {
    const response = await axios.get(`${config.apiURL}/bingx/get-all-full-orders?limit=${limit}&offset=${offset}`);
    const data = JSON.parse(response.data);  // Parsea la cadena JSON
    if (data && data.data && data.data.orders) {
      return data.data.orders;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

const initialFilteredOrders = {
  Side: [],
  Symbol: '',
  PositionSide: '',
  Type: ''
};

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    selectedOrderId: null,
    offset: 0,
    hasMore: true,
    page: 0,
    filteredOrders: initialFilteredOrders,
  },
  reducers: {
    setSelectedOrderId(state, action) {
      state.selectedOrderId = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setFilteredOrders(state, action) {
      state.filteredOrders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.hasMore = false;
        }
        state.orders = [...state.orders, ...action.payload];
        state.loading = false;
        state.offset += 500;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedOrderId, setPage, setFilteredOrders } = orderSlice.actions;

// Memoizar el selector selectFilteredOrders
const selectOrders = (state) => state.orders.orders;
const selectOrderFilters = (state) => state.orders.filteredOrders;

export const selectFilteredOrders = createSelector(
  [selectOrders, selectOrderFilters],
  (orders, filteredOrders) => {
    return orders.filter(order => 
      (filteredOrders.Side.length === 0 || filteredOrders.Side.includes(order.Side)) &&
      (filteredOrders.Symbol === '' || order.Symbol === filteredOrders.Symbol) &&
      (filteredOrders.PositionSide === '' || order.PositionSide === filteredOrders.PositionSide) &&
      (filteredOrders.Type === '' || order.Type === filteredOrders.Type)
    );
  }
);

export default orderSlice.reducer;
