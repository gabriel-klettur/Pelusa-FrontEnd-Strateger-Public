//Path: strateger-react/src/redux/order/orderSelectors.jsx

// Selectores para USDT-M
export const selectOrdersUsdtm = (state) => state.orders.usdtm.orders;
export const selectFiltersUsdtm = (state) => state.orders.usdtm.filters;
export const selectFilteredOrdersUsdtm = (state) => state.orders.usdtm.filteredOrders;
export const selectLoadingUsdtm = (state) => state.orders.usdtm.loading;
export const selectErrorUsdtm = (state) => state.orders.usdtm.error;
export const selectPageUsdtm = (state) => state.orders.usdtm.page;
export const selectHasMoreUsdtm = (state) => state.orders.usdtm.hasMore;

// Selectores para COIN-M
export const selectOrdersCoinm = (state) => state.orders.coinm.orders;
export const selectFiltersCoinm = (state) => state.orders.coinm.filters;
export const selectFilteredOrdersCoinm = (state) => state.orders.coinm.filteredOrders;
export const selectLoadingCoinm = (state) => state.orders.coinm.loading;
export const selectErrorCoinm = (state) => state.orders.coinm.error;
export const selectPageCoinm = (state) => state.orders.coinm.page;
export const selectHasMoreCoinm = (state) => state.orders.coinm.hasMore;

// Selectores para SPOT
export const selectOrdersSpot = (state) => state.orders.spot.orders;
export const selectFiltersSpot = (state) => state.orders.spot.filters;
export const selectFilteredOrdersSpot = (state) => state.orders.spot.filteredOrders;
export const selectLoadingSpot = (state) => state.orders.spot.loading;
export const selectErrorSpot = (state) => state.orders.spot.error;
export const selectPageSpot = (state) => state.orders.spot.page;
export const selectHasMoreSpot = (state) => state.orders.spot.hasMore;

// Selectores para Standard Futures
export const selectOrdersStandard = (state) => state.orders.standard.orders;
export const selectFiltersStandard = (state) => state.orders.standard.filters;
export const selectFilteredOrdersStandard = (state) => state.orders.standard.filteredOrders;
export const selectLoadingStandard = (state) => state.orders.standard.loading;
export const selectErrorStandard = (state) => state.orders.standard.error;
export const selectPageStandard = (state) => state.orders.standard.page;
export const selectHasMoreStandard = (state) => state.orders.standard.hasMore;
