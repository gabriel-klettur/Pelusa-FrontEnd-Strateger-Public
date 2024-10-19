
// Slice
import tickerReducer from './tickerSlice';

//Thunks
import { fetchTicker } from './tickerThunks';

//Selectors
import { selectTicker } from './tickerSelectors';

//TODO Selectors
export { selectTicker };

//TODO thunks
export { fetchTicker };

//TODO Slice
export default tickerReducer;