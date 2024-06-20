// Path: strateger-react/src/slices/orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    selectedOrderId: null,
    offset: 0, // Nueva propiedad para manejar el desplazamiento
    hasMore: true, // Nueva propiedad para saber si hay más órdenes que cargar
    page: 0, // Nueva propiedad para manejar la paginación local
  },
  reducers: {
    setSelectedOrderId(state, action) {
      state.selectedOrderId = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.hasMore = false; // Si se cargaron menos de 500 órdenes, no hay más para cargar
        }
        state.orders = [...state.orders, ...action.payload];
        state.loading = false;
        state.offset += 500; // Incrementar el desplazamiento
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedOrderId, setPage } = orderSlice.actions;
export default orderSlice.reducer;
