//Path: strateger-react/src/redux/order/orderSelectors.jsx

export const selectSelectedTab = (state) => state.orders.selectedTab;

// Selectores para USDT-M
export const selectOrderUsdtm = (state) => state.orders.usdtm.ordersData;
export const selectFiltersUsdtm = (state) => state.orders.usdtm.filters;
export const selectFilteredOrdersUsdtm = (state) => state.orders.usdtm.filteredOrders;
export const selectLoadingUsdtm = (state) => state.orders.usdtm.loading;
export const selectErrorUsdtm = (state) => state.orders.usdtm.error;
export const selectPageUsdtm = (state) => state.orders.usdtm.page;
export const selectHasMoreUsdtm = (state) => state.orders.usdtm.hasMore;
export const selectOffsetUsdtm = (state) => state.orders.usdtm.offset;

// Selectores para COIN-M
export const selectOrderCoinm = (state) => state.orders.coinm.ordersData;
export const selectFiltersCoinm = (state) => state.orders.coinm.filters;
export const selectFilteredOrdersCoinm = (state) => state.orders.coinm.filteredOrders;
export const selectLoadingCoinm = (state) => state.orders.coinm.loading;
export const selectErrorCoinm = (state) => state.orders.coinm.error;
export const selectPageCoinm = (state) => state.orders.coinm.page;
export const selectHasMoreCoinm = (state) => state.orders.coinm.hasMore;
export const selectOffsetCoinm = (state) => state.orders.coinm.offset;

// Selectores para SPOT
export const selectOrderSpot = (state) => state.orders.spot.ordersData;
export const selectFiltersSpot = (state) => state.orders.spot.filters;
export const selectFilteredOrdersSpot = (state) => state.orders.spot.filteredOrders;
export const selectLoadingSpot = (state) => state.orders.spot.loading;
export const selectErrorSpot = (state) => state.orders.spot.error;
export const selectPageSpot = (state) => state.orders.spot.page;
export const selectHasMoreSpot = (state) => state.orders.spot.hasMore;
export const selectOffsetSpot = (state) => state.orders.spot.offset;

// Selectores para Standard Futures
export const selectOrderStandard = (state) => state.orders.standard.ordersData;
export const selectFiltersStandard = (state) => state.orders.standard.filters;
export const selectFilteredOrdersStandard = (state) => state.orders.standard.filteredOrders;
export const selectLoadingStandard = (state) => state.orders.standard.loading;
export const selectErrorStandard = (state) => state.orders.standard.error;
export const selectPageStandard = (state) => state.orders.standard.page;
export const selectHasMoreStandard = (state) => state.orders.standard.hasMore;
export const selectOffsetStandard = (state) => state.orders.standard.offset;

export const selectSelectedOrderId = (state) => state.orders.selectedOrderId;
