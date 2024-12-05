// Slice
import  alarmReducer  from './alarmSlice';

// Thunks
import { fetchAlarms } from './alarmThunks';

// Selectors
import { selectStrategyFilteredAlarms } from './alarmSelectors';
import { selectAlarms, selectAlarmsData, selectAlarmsLoading, selectAlarmsPage, selectAlarmsOffset, selectAlarmsHasMore, selectAlarmsError, selectAlarmsDataLength } from './alarmSelectors';
import { selectFilteredByClickAlarms, selectFilteredByClickAlarmsPage, selectFilteredByClickAlarmsError, selectFilteredByClickAlarmsLoading, selectFilteredByClickAlarmsHasMore, selectFilteredByClickAlarmsOffset, selectFilteredByClickAlarmsLength } from './alarmSelectors';
import { selectFilteredByOptionsAlarms, selectFilteredByOptionsAlarmsPage, selectFilteredByOptionsAlarmsError, selectFilteredByOptionsAlarmsLoading, selectFilteredByOptionsAlarmsHasMore, selectFilteredByOptionsAlarmsOffset, selectFilteredByOptionsAlarmsLength } from './alarmSelectors';

//Actions 
import { setPageAlarms, setPageFilteredByClickAlarms, setFilteredByClickAlarms } from './alarmSlice';
import { setHasMoreAlarms, setHasMoreFilteredByClickAlarms } from './alarmSlice';
import { setFilteredByOptions, setPageFilteredByOptions, setHasMoreFilteredByOptions } from './alarmSlice';

//TODO Thunks
export { fetchAlarms }

//TODO Selectors
export { selectStrategyFilteredAlarms } 
export { selectAlarms, selectAlarmsData, selectAlarmsLoading, selectAlarmsPage, selectAlarmsOffset, selectAlarmsHasMore, selectAlarmsError, selectAlarmsDataLength }
export { selectFilteredByClickAlarms, selectFilteredByClickAlarmsPage, selectFilteredByClickAlarmsError, selectFilteredByClickAlarmsLoading, selectFilteredByClickAlarmsHasMore, selectFilteredByClickAlarmsOffset, selectFilteredByClickAlarmsLength }
export { selectFilteredByOptionsAlarms, selectFilteredByOptionsAlarmsPage, selectFilteredByOptionsAlarmsError, selectFilteredByOptionsAlarmsLoading, selectFilteredByOptionsAlarmsHasMore, selectFilteredByOptionsAlarmsOffset, selectFilteredByOptionsAlarmsLength }

//TODO Actions
export { setPageAlarms, setPageFilteredByClickAlarms, setFilteredByClickAlarms }
export { setHasMoreAlarms, setHasMoreFilteredByClickAlarms }
export { setFilteredByOptions , setPageFilteredByOptions, setHasMoreFilteredByOptions }

//----------------------------------------------------

//TODO Slice
export default alarmReducer;





