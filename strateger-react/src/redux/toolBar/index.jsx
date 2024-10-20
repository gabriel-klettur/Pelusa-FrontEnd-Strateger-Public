//Slice
import toolBarReducer from './toolbarSlice';

//Selectors
import { selectTemporalidad, selectCurrentDate, selectStartDate } from './toolbarSlice';

//Actions
import { setTemporalidad, setCurrentDate, setStartDate } from './toolbarSlice';

//TODO Actions
export { setTemporalidad, setCurrentDate, setStartDate };

//TODO Selectors
export { selectTemporalidad, selectCurrentDate, selectStartDate };

//TODO Slice
export default toolBarReducer;
