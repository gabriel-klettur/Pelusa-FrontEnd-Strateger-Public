//Path: src/redux/order/orderSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

import { fetchOrdersUsdtm, fetchOrdersCoinm, fetchOrdersSpot, fetchOrdersStandard } from './orderThunks';

//?-----------------------------------------------------------------------------
//?---------------------------------- Initial States ---------------------------
//?-----------------------------------------------------------------------------

const initialFilters = {
  Side: [],
  Symbol: '',
  PositionSide: '',
  Type: ''
};

const initialOrderState = {
  ordersData: [],
  filteredOrders: [],
  filters: initialFilters,
  page: 0,
  offset: 0,
  hasMore: true,
  loading: false,
  error: null
};

//?-----------------------------------------------------------------------------
//?------------------------------- Create Slice --------------------------------
//?-----------------------------------------------------------------------------

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    usdtm: initialOrderState ,
    coinm: initialOrderState ,
    spot: initialOrderState,
    standard: initialOrderState ,
    selectedOrderId: null,        
  },

  //TODO -----------------------------------------------------------------------
  //TODO ------------------------------ Reducers -------------------------------
  //TODO -----------------------------------------------------------------------

  reducers: {
    setSelectedOrderId(state, action) {
      state.selectedOrderId = action.payload;
    },
    //TODO ------------------------------ USDTM-M -------------------------------
    setPageUsdtm(state, action) {
      state.usdtm.page = action.payload;
    },
    setHasMoreUsdtm(state, action) {
      state.usdtm.hasMore = action.payload;
    },
    setOffsetUsdtm(state, action) {
      state.usdtm.offset = action.payload;
    },
    setFiltersUsdtm(state, action) {      
      state.usdtm.filters = action.payload;
          
      state.usdtm.filteredOrders = state.usdtm.ordersData.filter(order =>
        (state.usdtm.filters.Side.length === 0 || state.usdtm.filters.Side.includes(order.side)) &&
        (state.usdtm.filters.Symbol === '' || order.symbol === state.usdtm.filters.Symbol) &&
        (state.usdtm.filters.PositionSide === '' || order.positionSide === state.usdtm.filters.PositionSide) &&
        (state.usdtm.filters.Type === '' || order.type === state.usdtm.filters.Type)
      );
    },
    setErrorUsdm(state, action) {
      state.usdtm.error = action.payload;
    },            
    //TODO ------------------------------ COINM -------------------------------
    setPageCoinm(state, action) {
      state.coinm.page = action.payload;
    },
    setHasMoreCoinm(state, action) {
      state.coinm.hasMore = action.payload;
    },
    setOffsetCoinm(state, action) {
      state.coinm.offset = action.payload;
    },
    setFiltersCoinm(state, action) {      
      state.coinm.filters = action.payload;
          
      state.coinm.filteredOrders = state.coinm.ordersData.filter(order =>
        (state.coinm.filters.Side.length === 0 || state.coinm.filters.Side.includes(order.side)) &&
        (state.coinm.filters.Symbol === '' || order.symbol === state.coinm.filters.Symbol) &&
        (state.coinm.filters.PositionSide === '' || order.positionSide === state.coinm.filters.PositionSide) &&
        (state.coinm.filters.Type === '' || order.type === state.coinm.filters.Type)
      );
    },
    setErrorCoinm(state, action) {
      state.coinm.error = action.payload;
    },
    //TODO ------------------------------ SPOT -------------------------------
    setPageSpot(state, action) {
      state.spot.page = action.payload;
    },
    setHasMoreSpot(state, action) {
      state.spot.hasMore = action.payload;
    },
    setOffsetSpot(state, action) {
      state.spot.offset = action.payload;
    },
    setFiltersSpot(state, action) {      
      state.spot.filters = action.payload;
          
      state.spot.filteredOrders = state.spot.ordersData.filter(order =>
        (state.spot.filters.Side.length === 0 || state.spot.filters.Side.includes(order.side)) &&
        (state.spot.filters.Symbol === '' || order.symbol === state.spot.filters.Symbol) &&
        (state.spot.filters.PositionSide === '' || order.positionSide === state.spot.filters.PositionSide) &&
        (state.spot.filters.Type === '' || order.type === state.spot.filters.Type)
      );
    },
    setErrorSpot(state, action) {
      state.spot.error = action.payload;
    },
    //TODO ------------------------------ STANDARD -------------------------------
    setPageStandard(state, action) {
      state.standard.page = action.payload;
    },
    setHasMoreStandard(state, action) {
      state.standard.hasMore = action.payload;
    },
    setOffsetStandard(state, action) {
      state.standard.offset = action.payload;
    },
    setFiltersStandard(state, action) {      
      state.standard.filters = action.payload;
          
      state.standard.filteredOrders = state.standard.ordersData.filter(order =>
        (state.standard.filters.Side.length === 0 || state.standard.filters.Side.includes(order.side)) &&
        (state.standard.filters.Symbol === '' || order.symbol === state.standard.filters.Symbol) &&
        (state.standard.filters.PositionSide === '' || order.positionSide === state.standard.filters.PositionSide) &&
        (state.standard.filters.Type === '' || order.type === state.standard.filters.Type)
      );
    },
    setErrorStandard(state, action) {
      state.standard.error = action.payload;
    },
  },

  //! ----------------------------------------------------------------------------
  //! ----------------------------- EXTRA REDUCERS -------------------------------
  //! ----------------------------------------------------------------------------

  extraReducers: (builder) => {
    //! --------------------------------- USDT-M -----------------------------------
    builder
      .addCase(fetchOrdersUsdtm.pending, (state) => {
        state.usdtm.loading = true;
        state.usdtm.error = null;
      })
      .addCase(fetchOrdersUsdtm.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.usdtm.hasMore = false;
        }
        state.usdtm.ordersData = [...state.usdtm.ordersData, ...action.payload];
        state.usdtm.filteredOrders = state.usdtm.ordersData.filter(order =>
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

    //! ---------------------------------- COIN-M --------------------------------
    builder
      .addCase(fetchOrdersCoinm.pending, (state) => {
        state.coinm.loading = true;
        state.coinm.error = null;
      })
      .addCase(fetchOrdersCoinm.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.coinm.hasMore = false;
        }
        state.coinm.ordersData = [...state.coinm.ordersData, ...action.payload];
        state.coinm.filteredOrders = state.coinm.ordersData.filter(order =>
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

    //! --------------------------------- USDT-M ---------------------------------
    builder
      .addCase(fetchOrdersSpot.pending, (state) => {
        state.spot.loading = true;
        state.spot.error = null;
      })
      .addCase(fetchOrdersSpot.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.spot.hasMore = false;
        }
        state.spot.ordersData = [...state.spot.ordersData, ...action.payload];
        state.spot.filteredOrders = state.spot.ordersData.filter(order =>
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

    //!----------------------------- Standard Futures ----------------------------
    builder
      .addCase(fetchOrdersStandard.pending, (state) => {
        state.standard.loading = true;
        state.standard.error = null;
      })
      .addCase(fetchOrdersStandard.fulfilled, (state, action) => {
        if (action.payload.length < 500) {
          state.standard.hasMore = false;
        }
        state.standard.ordersData = [...state.standard.ordersData, ...action.payload];
        state.standard.filteredOrders = state.standard.ordersData.filter(order =>
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

export const { 
  setSelectedOrderId,
  setPageUsdtm, setHasMoreUsdtm, setOffsetUsdtm, setFiltersUsdtm, setErrorUsdm,
  setPageCoinm, setHasMoreCoinm, setOffsetCoinm, setFiltersCoinm, setErrorCoinm,
  setPageSpot, setHasMoreSpot, setOffsetSpot, setFiltersSpot, setErrorSpot,
  setPageStandard, setHasMoreStandard, setOffsetStandard, setFiltersStandard, setErrorStandard
} = orderSlice.actions;  

export default orderSlice.reducer;
