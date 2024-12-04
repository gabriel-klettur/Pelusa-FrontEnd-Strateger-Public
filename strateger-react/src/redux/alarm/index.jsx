// Slice
import  alarmReducer  from './alarmSlice';

// Thunks
import { fetchAlarms } from './alarmThunks';

// Selectors
import { selectStrategyFilteredAlarms } from './alarmSelectors';
import { selectAlarms, selectAlarmsData, selectAlarmsLoading, selectAlarmsPage, selectAlarmsOffset, selectAlarmsHasMore, selectAlarmsError } from './alarmSelectors';
import { selectFilteredByClickAlarms, selectFilteredByClickAlarmsPage, selectFilteredByClickAlarmsError, selectFilteredByClickAlarmsLoading, selectFilteredByClickAlarmsHasMore, selectFilteredByClickAlarmsOffset } from './alarmSelectors';
import { selectFilteredByOptionsAlarms, selectFilteredByOptionsAlarmsPage, selectFilteredByOptionsAlarmsError, selectFilteredByOptionsAlarmsLoading, selectFilteredByOptionsAlarmsHasMore, selectFilteredByOptionsAlarmsOffset } from './alarmSelectors';

//Actions 
import { setPageAlarms, setPageFilteredByClickAlarms, setFilteredByClickAlarms } from './alarmSlice';
import { setHasMoreAlarms, setHasMoreFilteredByClickAlarms } from './alarmSlice';
import { setFilteredByOptions, setPageFilteredByOptions, setHasMoreFilteredByOptions } from './alarmSlice';

//TODO Thunks
export { fetchAlarms }

//TODO Selectors
export { selectStrategyFilteredAlarms } 
export { selectAlarms, selectAlarmsData, selectAlarmsLoading, selectAlarmsPage, selectAlarmsOffset, selectAlarmsHasMore, selectAlarmsError }
export { selectFilteredByClickAlarms, selectFilteredByClickAlarmsPage, selectFilteredByClickAlarmsError, selectFilteredByClickAlarmsLoading, selectFilteredByClickAlarmsHasMore, selectFilteredByClickAlarmsOffset }
export { selectFilteredByOptionsAlarms, selectFilteredByOptionsAlarmsPage, selectFilteredByOptionsAlarmsError, selectFilteredByOptionsAlarmsLoading, selectFilteredByOptionsAlarmsHasMore, selectFilteredByOptionsAlarmsOffset }

//TODO Actions
export { setPageAlarms, setPageFilteredByClickAlarms, setFilteredByClickAlarms }
export { setHasMoreAlarms, setHasMoreFilteredByClickAlarms }
export { setFilteredByOptions , setPageFilteredByOptions, setHasMoreFilteredByOptions }





//----------------------------------------------------










//TODO Slice
export default alarmReducer;





