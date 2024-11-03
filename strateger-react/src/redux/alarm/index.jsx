// Slice
import  alarmReducer  from './alarmSlice';

// Thunks
import { fetchAlarms } from './alarmThunks';

// Selectors
import { selectFilteredByClickAlarms, selectFilteredByIntervalAlarms, selectFilteredByIntervalAndTypeAlarms, selectStrategyFilteredAlarms } from './alarmSelectors';
import { selectAlarms, selectAlarmsData, selectAlarmsLoading, selectAlarmsPage, selectAlarmsOffset, selectAlarmsHasMore, selectAlarmsError } from './alarmSelectors';

//Actions 
import { setPage, setFilteredByClickAlarms, setFilteredByIntervalAlarms, setFilteredByIntervalAndTypeAlarms, setStrategyFilteredAlarms } from './alarmSlice';

//TODO Thunks
export { fetchAlarms }

//TODO Selectors
export { selectFilteredByClickAlarms, selectFilteredByIntervalAlarms, selectFilteredByIntervalAndTypeAlarms, selectStrategyFilteredAlarms } 
export { selectAlarms, selectAlarmsData, selectAlarmsLoading, selectAlarmsPage, selectAlarmsOffset, selectAlarmsHasMore, selectAlarmsError }

//TODO Actions
export { setPage, setFilteredByClickAlarms, setFilteredByIntervalAlarms, setFilteredByIntervalAndTypeAlarms, setStrategyFilteredAlarms }





//----------------------------------------------------










//TODO Slice
export default alarmReducer;





