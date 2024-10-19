// Slice
import backtestingReducer from './backtestingSlice';

// Selectors
import { selectBacktestingResult, selectBacktestingStatus, selectBacktestingError } from './backtestingSelectors';

// Thunks
import { runBacktest } from './backtestingThunks';

//TODO Thunks
export { runBacktest };

//TODO Selectors
export { selectBacktestingResult, selectBacktestingStatus, selectBacktestingError };

//TODO Slice
export default backtestingReducer;