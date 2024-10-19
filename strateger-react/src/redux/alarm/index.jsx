// Slice
import  alarmReducer  from './alarmSlice';

// Thunks
import { fetchAlarms } from './alarmThunks';

// Selectors
import { selectFilteredByClickAlarms, selectFilteredByIntervalAlarms, selectFilteredByIntervalAndTypeAlarms, selectStrategyFilteredAlarms } from './alarmSelectors';

//Actions 
import { setPage, setFilteredByClickAlarms, setFilteredByIntervalAlarms, setFilteredByIntervalAndTypeAlarms, setStrategyFilteredAlarms } from './alarmSlice';

//TODO Thunks
export { fetchAlarms }

//TODO Selectors
export { selectFilteredByClickAlarms, selectFilteredByIntervalAlarms, selectFilteredByIntervalAndTypeAlarms, selectStrategyFilteredAlarms } 

//TODO Actions
export { setPage, setFilteredByClickAlarms, setFilteredByIntervalAlarms, setFilteredByIntervalAndTypeAlarms, setStrategyFilteredAlarms }

//TODO Slice
export default alarmReducer;



