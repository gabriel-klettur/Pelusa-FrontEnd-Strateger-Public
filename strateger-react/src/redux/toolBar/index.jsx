//Path: strateger-react/src/redux/toolbar/index.jsx

//Slice
import toolBarReducer from './toolBarSlice';

//Selectors
import { selectTemporalidad, selectCurrentDate, selectStartDate, selectTicker } from './toolBarSelectors';

//Actions
import { setTemporalidad, setCurrentDate, setStartDate, setTicker } from './toolBarSlice';

//TODO Actions
export { setTemporalidad, setCurrentDate, setStartDate, setTicker };

//TODO Selectors
export { selectTemporalidad, selectCurrentDate, selectStartDate, selectTicker };

//TODO Slice
export default toolBarReducer;
