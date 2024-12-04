export const selectCandlestickChartData = state => state.candlestickChart.data;
export const selectCandlestickChartStartDate = state => state.candlestickChart.startDate;
export const selectCandlestickChartEndDate = state => state.candlestickChart.endDate;
export const selectCandlestickChartInterval = state => state.candlestickChart.interval;

export const selectMarkersAlarmDefault = state => state.candlestickChart.markers.alarm.default;
export const selectMarkersAlarmSelectedByClick = state => state.candlestickChart.markers.alarm.selectedByClick;
export const selectMarkersAlarmFiltered = state => state.candlestickChart.markers.alarm.filtered;

export const selectMarkersOrderUsdm = state => state.candlestickChart.markers.orders.usdm;
export const selectMarkersOrderCoinm = state => state.candlestickChart.markers.orders.coinm;
export const selectMarkersOrderStandard = state => state.candlestickChart.markers.orders.standard;
export const selectMarkersOrderSpot = state => state.candlestickChart.markers.orders.spot;

export const selectCandlestickChartLoading = state => state.candlestickChart.loading;
export const selectCandlestickChartError = state => state.candlestickChart.error;