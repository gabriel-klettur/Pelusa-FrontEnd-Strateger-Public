//Path: strateger-react/src/redux/order/orderSelectors.jsx

// Selectores para USDT-M
export const selectOrdersUsdtm = (state) => state.orders.usdtm.orders;
export const selectFiltersUsdtm = (state) => state.orders.usdtm.filters;
export const selectFilteredOrdersUsdtm = (state) => state.orders.usdtm.filteredOrders;

// Selectores para COIN-M
export const selectOrdersCoinm = (state) => state.orders.coinm.orders;
export const selectFiltersCoinm = (state) => state.orders.coinm.filters;
export const selectFilteredOrdersCoinm = (state) => state.orders.coinm.filteredOrders;

// Selectores para SPOT
export const selectOrdersSpot = (state) => state.orders.spot.orders;
export const selectFiltersSpot = (state) => state.orders.spot.filters;
export const selectFilteredOrdersSpot = (state) => state.orders.spot.filteredOrders;

// Selectores para Standard Futures
export const selectOrdersStandard = (state) => state.orders.standard.orders;
export const selectFiltersStandard = (state) => state.orders.standard.filters;
export const selectFilteredOrdersStandard = (state) => state.orders.standard.filteredOrders;
