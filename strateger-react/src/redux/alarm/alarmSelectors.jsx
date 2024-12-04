
export const selectAlarms = (state) => state.alarms.alarms;
export const selectAlarmsData = (state) => state.alarms.alarms.data;
export const selectAlarmsLoading = (state) => state.alarms.alarms.loading;
export const selectAlarmsPage = (state) => state.alarms.alarms.page;
export const selectAlarmsOffset = (state) => state.alarms.alarms.offset;
export const selectAlarmsHasMore = (state) => state.alarms.alarms.hasMore;
export const selectAlarmsError = (state) => state.alarms.alarms.error;

export const selectFilteredByClickAlarms = (state) => state.alarms.filteredByClickAlarms.data;
export const selectFilteredByClickAlarmsPage = (state) => state.alarms.filteredByClickAlarms.page;
export const selectFilteredByClickAlarmsHasMore = (state) => state.alarms.filteredByClickAlarms.hasMore;
export const selectFilteredByClickAlarmsLoading = (state) => state.alarms.filteredByClickAlarms.loading;
export const selectFilteredByClickAlarmsError = (state) => state.alarms.filteredByClickAlarms.error;
export const selectFilteredByClickAlarmsOffset = (state) => state.alarms.filteredByClickAlarms.offset;

export const selectFilteredByOptionsAlarms = (state) => state.alarms.filteredByOptions.data;
export const selectFilteredByOptionsAlarmsPage = (state) => state.alarms.filteredByOptions.page;
export const selectFilteredByOptionsAlarmsHasMore = (state) => state.alarms.filteredByOptions.hasMore;
export const selectFilteredByOptionsAlarmsLoading = (state) => state.alarms.filteredByOptions.loading;
export const selectFilteredByOptionsAlarmsError = (state) => state.alarms.filteredByOptions.error;
export const selectFilteredByOptionsAlarmsOffset = (state) => state.alarms.filteredByOptions.offset;

export const selectStrategyFilteredAlarms = (state) => state.alarms.strategyFilteredAlarms;