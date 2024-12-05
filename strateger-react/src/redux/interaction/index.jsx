//*MAIN
import interactionReducer from './interactionSlice';

//TODO ACTIONS
import { setToggleChartMainButtons, setToggleChartAlarmButtons, setToggleAlarmTab, setToggleOrderButton } from './interactionSlice';
import { setActiveTab, setActiveButton } from './interactionSlice';

//SELECTORS

import { selectChartStochasticButton, selectChartEmasButton, selectChartCandleStickButton } from './interactionSelectors';
import { selectAlarmButtons, selectSelectedAlarmsButton, selectFilteredAlarmsButton } from './interactionSelectors';
import { selectOrdersUsdtmButton, selectOrdersCoinmButton, selectOrdersSpotButton, selectOrdersStandardButton } from './interactionSelectors';
import { selectAlarmTab, selectSelectedAlarmTab, selectFilteredAlarmTab } from './interactionSelectors';

//TODO ACTIONS
export { setToggleChartMainButtons, setToggleChartAlarmButtons, setToggleAlarmTab, setToggleOrderButton };
export { setActiveTab, setActiveButton };

//SELECTORS
export { selectChartStochasticButton, selectChartEmasButton, selectChartCandleStickButton };
export { selectAlarmButtons, selectSelectedAlarmsButton, selectFilteredAlarmsButton };
export { selectOrdersUsdtmButton, selectOrdersCoinmButton, selectOrdersSpotButton, selectOrdersStandardButton };
export { selectAlarmTab, selectSelectedAlarmTab, selectFilteredAlarmTab };

//*MAIN
export default interactionReducer;