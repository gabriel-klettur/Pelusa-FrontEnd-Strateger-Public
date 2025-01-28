//*MAIN
import interactionReducer from './interactionSlice';

//TODO ACTIONS
import { setToggleChartMainButtons, setToggleChartAlarmButtons, setToggleAlarmTab, setToggleOrderButton } from './interactionSlice';
import { setActiveTab, setActiveButton } from './interactionSlice';
import { setActiveRadarDataset } from './interactionSlice';

//SELECTORS

import { selectChartAdxButton, selectChartRSIButton, selectChartSQZMomentumButton, selectChartStochasticButton, selectChartEmasButton, selectChartCandleStickButton } from './interactionSelectors';
import { selectAlarmButtons, selectSelectedAlarmsButton, selectFilteredAlarmsButton } from './interactionSelectors';
import { selectOrdersUsdtmButton, selectOrdersCoinmButton, selectOrdersSpotButton, selectOrdersStandardButton } from './interactionSelectors';
import { selectAlarmTab, selectSelectedAlarmTab, selectFilteredAlarmTab } from './interactionSelectors';
import { selectActiveRadarDataset } from './interactionSelectors';

//TODO ACTIONS
export { setToggleChartMainButtons, setToggleChartAlarmButtons, setToggleAlarmTab, setToggleOrderButton };
export { setActiveTab, setActiveButton };
export {setActiveRadarDataset};

//SELECTORS
export { selectChartAdxButton, selectChartRSIButton, selectChartSQZMomentumButton, selectChartStochasticButton, selectChartEmasButton, selectChartCandleStickButton };
export { selectAlarmButtons, selectSelectedAlarmsButton, selectFilteredAlarmsButton };
export { selectOrdersUsdtmButton, selectOrdersCoinmButton, selectOrdersSpotButton, selectOrdersStandardButton };
export { selectAlarmTab, selectSelectedAlarmTab, selectFilteredAlarmTab };
export { selectActiveRadarDataset };

//*MAIN
export default interactionReducer;