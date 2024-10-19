// Slice
import alarmFilterPanelReducer from './alarmFilterPanelSlice';

// Selectors
import { selectFilteredTemporalidades, selectSelectedTemporalidad, selectSelectedTypes } from './alarmFilterPanelSelectors';

// Actions
import { setSelectedTemporalidad, incrementTemporalidad, decrementTemporalidad, setSelectedTypes, removeEmptySelectedTypes } from './alarmFilterPanelSlice';

//! Selectors
export { selectFilteredTemporalidades, selectSelectedTemporalidad, selectSelectedTypes };

//! Actions
export { setSelectedTemporalidad, incrementTemporalidad, decrementTemporalidad, setSelectedTypes, removeEmptySelectedTypes };

//! Slice
export default alarmFilterPanelReducer;
