//Slice
import candlestickChartReducer from './candlestickChartSlice';

//Actions
import { setCandlestickChartParameters, updateChartData } from './candlestickChartSlice';
import { setAlarmDefaultMarkers, setAlarmSelectedByClickMarkers, setAlarmFilteredMarkers } from './candlestickChartSlice';
import { setOrderUsdmMarkers, setOrderCoinmMarkers, setOrderStandardMarkers, setOrderSpotMarkers } from './candlestickChartSlice';

//Thunks
import { fetchCandlestickChartData } from './candlestickChartThunks';

//Selectors
import { selectCandlestickChartData, selectCandlestickChartStartDate, selectCandlestickChartEndDate, selectCandlestickChartInterval, selectCandlestickChartTicker } from './candlestickChartSelectors';
import { selectCandlestickChartLoading, selectCandlestickChartError } from './candlestickChartSelectors';
import { selectMarkersAlarmDefault, selectMarkersAlarmSelectedByClick, selectMarkersAlarmFiltered  } from './candlestickChartSelectors';
import { selectMarkersOrderUsdm, selectMarkersOrderCoinm, selectMarkersOrderStandard, selectMarkersOrderSpot } from './candlestickChartSelectors';

//TODO Thunks
export { fetchCandlestickChartData };

//TODO Actions
export { setCandlestickChartParameters, updateChartData };
export { setAlarmDefaultMarkers, setAlarmSelectedByClickMarkers, setAlarmFilteredMarkers };
export { setOrderUsdmMarkers, setOrderCoinmMarkers, setOrderStandardMarkers, setOrderSpotMarkers };

//TODO Selectors
export { selectCandlestickChartData, selectCandlestickChartStartDate, selectCandlestickChartEndDate, selectCandlestickChartInterval, selectCandlestickChartTicker };
export { selectCandlestickChartLoading, selectCandlestickChartError };
export { selectMarkersAlarmDefault, selectMarkersAlarmSelectedByClick, selectMarkersAlarmFiltered };
export { selectMarkersOrderUsdm, selectMarkersOrderCoinm, selectMarkersOrderStandard, selectMarkersOrderSpot };

//TODO Slice
export default candlestickChartReducer;