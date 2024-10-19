import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchOrdersUsdtm = createAsyncThunk(
  'orders/fetchOrdersUsdtm',
  async ({ limit, offset, startDate, endDate }) => {
    const params = { limit, offset };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await axios.get(`${config.apiURL}/bingx/usdtm/get-all-full-orders`, { params });
    const data = JSON.parse(response.data);  // Parsea la cadena JSON
    if (data && data.data && data.data.orders) {
      return data.data.orders;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

const initialFilters = {
  Side: [],
  Symbol: '',
  PositionSide: '',
  Type: ''
};



const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    ordersUsdtm: [],
    ordersCoinm: [],
    ordersSpot: [],
    ordersStandard: [],
    filteredOrdersUsdtm: [],
    filters: initialFilters,    
    selectedOrderId: null,        
    page: 0,
    offset: 0,
    hasMore: true,
    loading: false,
    error: null    
  },
  reducers: {
    setSelectedOrderId(state, action) {
      state.selectedOrderId = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
      state.filteredOrdersUsdtm = state.ordersUsdtm.filter(order => 
        (state.filters.Side.length === 0 || state.filters.Side.includes(order.side)) &&
        (state.filters.Symbol === '' || order.symbol === state.filters.Symbol) &&
        (state.filters.PositionSide === '' || order.positionSide === state.filters.PositionSide) &&
        (state.filters.Type === '' || order.type === state.filters.Type)
      );
    },
    setFilteredOrders(state, action) {
      state.filteredOrdersUsdtm = action.payload;
    },
    appendOrders(state, action) {
      const newOrders = action.payload;
      const allOrders = [...state.ordersUsdtm, ...newOrders];
      const uniqueOrders = Array.from(new Set(allOrders.map(order => order.orderId)))
                                .map(id => allOrders.find(order => order.orderId === id));
      state.ordersUsdtm = uniqueOrders;
      state.filteredOrdersUsdtm = uniqueOrders.filter(order => 
        (state.filters.Side.length === 0 || state.filters.Side.includes(order.side)) &&
        (state.filters.Symbol === '' || order.symbol === state.filters.Symbol) &&
        (state.filters.PositionSide === '' || order.positionSide === state.filters.PositionSide) &&
        (state.filters.Type === '' || order.type === state.filters.Type)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersUsdtm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersUsdtm.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.hasMore = false;
        }
        state.ordersUsdtm = [...state.ordersUsdtm, ...action.payload];
        state.filteredOrdersUsdtm = state.ordersUsdtm.filter(order => 
          (state.filters.Side.length === 0 || state.filters.Side.includes(order.side)) &&
          (state.filters.Symbol === '' || order.symbol === state.filters.Symbol) &&
          (state.filters.PositionSide === '' || order.positionSide === state.filters.PositionSide) &&
          (state.filters.Type === '' || order.type === state.filters.Type)
        );
        state.loading = false;
        state.offset += 500;
      })
      .addCase(fetchOrdersUsdtm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedOrderId, setPage, setFilters, setFilteredOrders, appendOrders } = orderSlice.actions;

export const selectOrders = (state) => state.orders.ordersUsdtm; 
export const selectFilters = (state) => state.orders.filters; 
export const selectFilteredOrders = (state) => state.orders.filteredOrdersUsdtm; 

export default orderSlice.reducer;
