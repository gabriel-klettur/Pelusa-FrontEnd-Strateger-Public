export const selectCandlestickChartData = state => state.candlestickChart.data;
export const selectCandlestickChartStartDate = state => state.candlestickChart.startDate;
export const selectCandlestickChartEndDate = state => state.candlestickChart.endDate;
export const selectCandlestickChartInterval = state => state.candlestickChart.interval;

export const selectMarkersAlarmDefault = state => state.candlestickChart.markers.alarm.default;
export const selectMarkersAlarmSelectedByClick = state => state.candlestickChart.markers.alarm.selectedByClick;
export const selectMarkersAlarmFilteredByInterval = state => state.candlestickChart.markers.alarm.filteredByInterval;
export const selectMarkersAlarmFilteredByIntervalAndType = state => state.candlestickChart.markers.alarm.filteredByIntervalAndType;

export const selectCandlestickChartLoading = state => state.candlestickChart.loading;
export const selectCandlestickChartError = state => state.candlestickChart.error;