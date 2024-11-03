
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

export const selectFilteredByIntervalAlarms = (state) => state.alarms.filteredByIntervalAlarms.data;
export const selectFilteredByIntervalAlarmsPage = (state) => state.alarms.filteredByIntervalAlarms.page;
export const selectFilteredByIntervalAlarmsHasMore = (state) => state.alarms.filteredByIntervalAlarms.hasMore;
export const selectFilteredByIntervalAlarmsLoading = (state) => state.alarms.filteredByIntervalAlarms.loading;
export const selectFilteredByIntervalAlarmsError = (state) => state.alarms.filteredByIntervalAlarms.error;
export const selectFilteredByIntervalAlarmsOffset = (state) => state.alarms.filteredByIntervalAlarms.offset;

export const selectFilteredByIntervalAndTypeAlarms = (state) => state.alarms.filteredByIntervalAndTypeAlarms.data;
export const selectFilteredByIntervalAndTypeAlarmsPage = (state) => state.alarms.filteredByIntervalAndTypeAlarms.page;
export const selectFilteredByIntervalAndTypeAlarmsHasMore = (state) => state.alarms.filteredByIntervalAndTypeAlarms.hasMore;
export const selectFilteredByIntervalAndTypeAlarmsLoading = (state) => state.alarms.filteredByIntervalAndTypeAlarms.loading;
export const selectFilteredByIntervalAndTypeAlarmsError = (state) => state.alarms.filteredByIntervalAndTypeAlarms.error;
export const selectFilteredByIntervalAndTypeAlarmsOffset = (state) => state.alarms.filteredByIntervalAndTypeAlarms.offset;


export const selectStrategyFilteredAlarms = (state) => state.alarms.strategyFilteredAlarms;