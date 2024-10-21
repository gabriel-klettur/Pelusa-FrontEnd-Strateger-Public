//Path: strateger-react/src/redux/toolbar/index.jsx

//Slice
import toolBarReducer from './toolBarSlice';

//Selectors
import { selectTemporalidad, selectCurrentDate, selectStartDate } from './toolBarSelectors';

//Actions
import { setTemporalidad, setCurrentDate, setStartDate } from './toolBarSlice';

//TODO Actions
export { setTemporalidad, setCurrentDate, setStartDate };

//TODO Selectors
export { selectTemporalidad, selectCurrentDate, selectStartDate };

//TODO Slice
export default toolBarReducer;
