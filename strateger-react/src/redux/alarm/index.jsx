// Slice
import  alarmReducer  from './alarmSlice';

// Thunks
import { fetchAlarms } from './alarmThunks';

// Selectors
import { selectStrategyFilteredAlarms } from './alarmSelectors';
import { selectAlarms, selectAlarmsData, selectAlarmsLoading, selectAlarmsPage, selectAlarmsOffset, selectAlarmsHasMore, selectAlarmsError } from './alarmSelectors';
import { selectFilteredByClickAlarms, selectFilteredByClickAlarmsPage, selectFilteredByClickAlarmsError, selectFilteredByClickAlarmsLoading, selectFilteredByClickAlarmsHasMore, selectFilteredByClickAlarmsOffset } from './alarmSelectors';
import { selectFilteredByIntervalAlarms, selectFilteredByIntervalAlarmsPage, selectFilteredByIntervalAlarmsError, selectFilteredByIntervalAlarmsLoading, selectFilteredByIntervalAlarmsHasMore, selectFilteredByIntervalAlarmsOffset } from './alarmSelectors';
import { selectFilteredByIntervalAndTypeAlarms, selectFilteredByIntervalAndTypeAlarmsPage, selectFilteredByIntervalAndTypeAlarmsError, selectFilteredByIntervalAndTypeAlarmsLoading, selectFilteredByIntervalAndTypeAlarmsHasMore, selectFilteredByIntervalAndTypeAlarmsOffset } from './alarmSelectors';
import { selectFilteredByOptionsAlarms, selectFilteredByOptionsAlarmsPage, selectFilteredByOptionsAlarmsError, selectFilteredByOptionsAlarmsLoading, selectFilteredByOptionsAlarmsHasMore, selectFilteredByOptionsAlarmsOffset } from './alarmSelectors';

//Actions 
import { setPageAlarms, setPageFilteredByClickAlarms, setPageFilteredByIntervalAlarms, setPageFilteredByIntervalAndTypeAlarms, setFilteredByClickAlarms, setFilteredByIntervalAlarms, setFilteredByIntervalAndTypeAlarms, setStrategyFilteredAlarms } from './alarmSlice';
import { setHasMoreAlarms, setHasMoreFilteredByClickAlarms, setHasMoreFilteredByIntervalAlarms, setHasMoreFilteredByIntervalAndTypeAlarms} from './alarmSlice';
import { setFilteredByOptions, setPageFilteredByOptions, setHasMoreFilteredByOptions } from './alarmSlice';

//TODO Thunks
export { fetchAlarms }

//TODO Selectors
export { selectStrategyFilteredAlarms } 
export { selectAlarms, selectAlarmsData, selectAlarmsLoading, selectAlarmsPage, selectAlarmsOffset, selectAlarmsHasMore, selectAlarmsError }
export { selectFilteredByClickAlarms, selectFilteredByClickAlarmsPage, selectFilteredByClickAlarmsError, selectFilteredByClickAlarmsLoading, selectFilteredByClickAlarmsHasMore, selectFilteredByClickAlarmsOffset }
export { selectFilteredByIntervalAlarms, selectFilteredByIntervalAlarmsPage, selectFilteredByIntervalAlarmsError, selectFilteredByIntervalAlarmsLoading, selectFilteredByIntervalAlarmsHasMore, selectFilteredByIntervalAlarmsOffset }
export { selectFilteredByIntervalAndTypeAlarms, selectFilteredByIntervalAndTypeAlarmsPage, selectFilteredByIntervalAndTypeAlarmsError, selectFilteredByIntervalAndTypeAlarmsLoading, selectFilteredByIntervalAndTypeAlarmsHasMore, selectFilteredByIntervalAndTypeAlarmsOffset }
export { selectFilteredByOptionsAlarms, selectFilteredByOptionsAlarmsPage, selectFilteredByOptionsAlarmsError, selectFilteredByOptionsAlarmsLoading, selectFilteredByOptionsAlarmsHasMore, selectFilteredByOptionsAlarmsOffset }

//TODO Actions
export { setPageAlarms, setPageFilteredByClickAlarms, setPageFilteredByIntervalAlarms, setPageFilteredByIntervalAndTypeAlarms, setFilteredByClickAlarms, setFilteredByIntervalAlarms, setFilteredByIntervalAndTypeAlarms, setStrategyFilteredAlarms }
export { setHasMoreAlarms, setHasMoreFilteredByClickAlarms, setHasMoreFilteredByIntervalAlarms, setHasMoreFilteredByIntervalAndTypeAlarms}
export { setFilteredByOptions , setPageFilteredByOptions, setHasMoreFilteredByOptions }





//----------------------------------------------------










//TODO Slice
export default alarmReducer;





