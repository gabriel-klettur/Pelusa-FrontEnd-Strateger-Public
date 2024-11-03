export const selectFilteredByClickAlarms = (state) => state.alarms.filteredByClickAlarms;
export const selectFilteredByIntervalAlarms = (state) => state.alarms.filteredByIntervalAlarms;
export const selectFilteredByIntervalAndTypeAlarms = (state) => state.alarms.filteredByIntervalAndTypeAlarms;
export const selectStrategyFilteredAlarms = (state) => state.alarms.strategyFilteredAlarms;


export const selectAlarms = (state) => state.alarms.alarms;
export const selectAlarmsData = (state) => state.alarms.alarms.data;
export const selectAlarmsLoading = (state) => state.alarms.alarms.loading;
export const selectAlarmsPage = (state) => state.alarms.alarms.page;
export const selectAlarmsOffset = (state) => state.alarms.alarms.offset;
export const selectAlarmsHasMore = (state) => state.alarms.alarms.hasMore;
export const selectAlarmsError = (state) => state.alarms.alarms.error;
