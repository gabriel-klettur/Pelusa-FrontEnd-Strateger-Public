//Slice
import strategyReducer from './strategySlice';

//Thunks
import { fetchStrategies, fetchStrategy, saveStrategy, removeStrategy } from './strategyThunks';

//Actions
import { setStrategies } from './strategySlice';


//TODO Actions
export { setStrategies };

//TODO Thunks
export { fetchStrategies, fetchStrategy, saveStrategy, removeStrategy };

//TODO Slice
export default strategyReducer;
