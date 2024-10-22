import { createSlice } from '@reduxjs/toolkit';
import { fetchOrdersUsdtm, fetchOrdersCoinm, fetchOrdersSpot, fetchOrdersStandard } from './orderThunks';

const initialFilters = {
  Side: [],
  Symbol: '',
  PositionSide: '',
  Type: ''
};

const initialOrderState = {
  orders: [],
  filteredOrders: [], // Cada tipo tiene su filteredOrders
  filters: initialFilters,
  page: 0,
  offset: 0,
  hasMore: true,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    usdtm: { ...initialOrderState },
    coinm: { ...initialOrderState },
    spot: { ...initialOrderState },
    standard: { ...initialOrderState },
    selectedOrderId: null,        
  },
  reducers: {
    setSelectedOrderId(state, action) {
      state.selectedOrderId = action.payload;
    },
    setPage(state, action) {
      const { orderType, page } = action.payload; // e.g., { orderType: 'usdtm', page: 1 }
      state[orderType].page = page;
    },
    setFilters(state, action) {
      const { orderType, filters } = action.payload; // e.g., { orderType: 'usdtm', filters: newFilters }
      state[orderType].filters = filters;
      state[orderType].filteredOrders = state[orderType].orders.filter(order =>
        (filters.Side.length === 0 || filters.Side.includes(order.side)) &&
        (filters.Symbol === '' || order.symbol === filters.Symbol) &&
        (filters.PositionSide === '' || order.positionSide === filters.PositionSide) &&
        (filters.Type === '' || order.type === filters.Type)
      );
    },
    setFilteredOrders(state, action) {
      const { orderType, filteredOrders } = action.payload;
      state[orderType].filteredOrders = filteredOrders;
    },
    appendOrders(state, action) {
      const { orderType, newOrders } = action.payload;
      const allOrders = [...state[orderType].orders, ...newOrders];
      const uniqueOrders = Array.from(new Set(allOrders.map(order => order.orderId)))
                                .map(id => allOrders.find(order => order.orderId === id));
      state[orderType].orders = uniqueOrders;
      state[orderType].filteredOrders = uniqueOrders.filter(order =>
        (state[orderType].filters.Side.length === 0 || state[orderType].filters.Side.includes(order.side)) &&
        (state[orderType].filters.Symbol === '' || order.symbol === state[orderType].filters.Symbol) &&
        (state[orderType].filters.PositionSide === '' || order.positionSide === state[orderType].filters.PositionSide) &&
        (state[orderType].filters.Type === '' || order.type === state[orderType].filters.Type)
      );
    }
  },
  extraReducers: (builder) => {
    // Para USDT-M
    builder
      .addCase(fetchOrdersUsdtm.pending, (state) => {
        state.usdtm.loading = true;
        state.usdtm.error = null;
      })
      .addCase(fetchOrdersUsdtm.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.usdtm.hasMore = false;
        }
        state.usdtm.orders = [...state.usdtm.orders, ...action.payload];
        state.usdtm.filteredOrders = state.usdtm.orders.filter(order =>
          (state.usdtm.filters.Side.length === 0 || state.usdtm.filters.Side.includes(order.side)) &&
          (state.usdtm.filters.Symbol === '' || order.symbol === state.usdtm.filters.Symbol) &&
          (state.usdtm.filters.PositionSide === '' || order.positionSide === state.usdtm.filters.PositionSide) &&
          (state.usdtm.filters.Type === '' || order.type === state.usdtm.filters.Type)
        );
        state.usdtm.loading = false;
        state.usdtm.offset += 500;
      })
      .addCase(fetchOrdersUsdtm.rejected, (state, action) => {
        state.usdtm.loading = false;
        state.usdtm.error = action.error.message;
      });

    // Para COIN-M
    builder
      .addCase(fetchOrdersCoinm.pending, (state) => {
        state.coinm.loading = true;
        state.coinm.error = null;
      })
      .addCase(fetchOrdersCoinm.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.coinm.hasMore = false;
        }
        state.coinm.orders = [...state.coinm.orders, ...action.payload];
        state.coinm.filteredOrders = state.coinm.orders.filter(order =>
          (state.coinm.filters.Side.length === 0 || state.coinm.filters.Side.includes(order.side)) &&
          (state.coinm.filters.Symbol === '' || order.symbol === state.coinm.filters.Symbol) &&
          (state.coinm.filters.PositionSide === '' || order.positionSide === state.coinm.filters.PositionSide) &&
          (state.coinm.filters.Type === '' || order.type === state.coinm.filters.Type)
        );
        state.coinm.loading = false;
        state.coinm.offset += 500;
      })
      .addCase(fetchOrdersCoinm.rejected, (state, action) => {
        state.coinm.loading = false;
        state.coinm.error = action.error.message;
      });

    // Para Spot
    builder
      .addCase(fetchOrdersSpot.pending, (state) => {
        state.spot.loading = true;
        state.spot.error = null;
      })
      .addCase(fetchOrdersSpot.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.spot.hasMore = false;
        }
        state.spot.orders = [...state.spot.orders, ...action.payload];
        state.spot.filteredOrders = state.spot.orders.filter(order =>
          (state.spot.filters.Side.length === 0 || state.spot.filters.Side.includes(order.side)) &&
          (state.spot.filters.Symbol === '' || order.symbol === state.spot.filters.Symbol) &&
          (state.spot.filters.PositionSide === '' || order.positionSide === state.spot.filters.PositionSide) &&
          (state.spot.filters.Type === '' || order.type === state.spot.filters.Type)
        );
        state.spot.loading = false;
        state.spot.offset += 500;
      })
      .addCase(fetchOrdersSpot.rejected, (state, action) => {
        state.spot.loading = false;
        state.spot.error = action.error.message;
      });

    // Para Standard Futures
    builder
      .addCase(fetchOrdersStandard.pending, (state) => {
        state.standard.loading = true;
        state.standard.error = null;
      })
      .addCase(fetchOrdersStandard.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.standard.hasMore = false;
        }
        state.standard.orders = [...state.standard.orders, ...action.payload];
        state.standard.filteredOrders = state.standard.orders.filter(order =>
          (state.standard.filters.Side.length === 0 || state.standard.filters.Side.includes(order.side)) &&
          (state.standard.filters.Symbol === '' || order.symbol === state.standard.filters.Symbol) &&
          (state.standard.filters.PositionSide === '' || order.positionSide === state.standard.filters.PositionSide) &&
          (state.standard.filters.Type === '' || order.type === state.standard.filters.Type)
        );
        state.standard.loading = false;
        state.standard.offset += 500;
      })
      .addCase(fetchOrdersStandard.rejected, (state, action) => {
        state.standard.loading = false;
        state.standard.error = action.error.message;
      });
  },
});

export const { setSelectedOrderId, setPage, setFilters, setFilteredOrders, appendOrders } = orderSlice.actions;

export default orderSlice.reducer;
