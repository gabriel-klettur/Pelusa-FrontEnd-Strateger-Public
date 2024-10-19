//Slice
import positionReducer from './positionSlice';

//Thunks
import { fetchPositionsCoinM, fetchPositionsUSDTM, fetchSpotDepositRecords } from './positionThunks';

//Selectors
import { selectCoinMPositions, selectUSDTMPositions, selectSpotRecords, selectCoinMPositionsList, selectUSDTMPositionsList, selectSpotRecordsList, selectCoinMLoading, selectUSDTMLoading, selectSpotLoading, selectCoinMError, selectUSDTMError, selectSpotError } from './positionSelectors';

//TODO Selectors
export { selectCoinMPositions, selectUSDTMPositions, selectSpotRecords, selectCoinMPositionsList, selectUSDTMPositionsList, selectSpotRecordsList, selectCoinMLoading, selectUSDTMLoading, selectSpotLoading, selectCoinMError, selectUSDTMError, selectSpotError };

//TODO Thunks
export { fetchPositionsCoinM, fetchPositionsUSDTM, fetchSpotDepositRecords };

//TODO Slice
export default positionReducer;
