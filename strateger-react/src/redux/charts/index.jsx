//Slice
import candlestickChartReducer from './candlestickChartSlice';

//Actions
import { setCandlestickChartParameters, updateChartData } from './candlestickChartSlice';
import { setAlarmDefaultMarkers, setAlarmSelectedByClickMarkers, setAlarmFilteredByIntervalMarkers, setAlarmFilteredByIntervalAndTypeMarkers} from './candlestickChartSlice';

//Thunks
import { fetchCandlestickChartData } from './candlestickChartThunks';

//Selectors
import { selectCandlestickChartData, selectCandlestickChartStartDate, selectCandlestickChartEndDate, selectCandlestickChartInterval } from './candlestickChartSelectors';
import { selectCandlestickChartLoading, selectCandlestickChartError } from './candlestickChartSelectors';
import { selectMarkersAlarmDefault, selectMarkersAlarmSelectedByClick, selectMarkersAlarmFilteredByInterval, selectMarkersAlarmFilteredByIntervalAndType } from './candlestickChartSelectors';


//TODO Thunks
export { fetchCandlestickChartData };

//TODO Actions
export { setCandlestickChartParameters, updateChartData };
export { setAlarmDefaultMarkers, setAlarmSelectedByClickMarkers, setAlarmFilteredByIntervalMarkers, setAlarmFilteredByIntervalAndTypeMarkers };

//TODO Selectors
export { selectCandlestickChartData, selectCandlestickChartStartDate, selectCandlestickChartEndDate, selectCandlestickChartInterval };
export { selectCandlestickChartLoading, selectCandlestickChartError };
export { selectMarkersAlarmDefault, selectMarkersAlarmSelectedByClick, selectMarkersAlarmFilteredByInterval, selectMarkersAlarmFilteredByIntervalAndType };

//TODO Slice
export default candlestickChartReducer;