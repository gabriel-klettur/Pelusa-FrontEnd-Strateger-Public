//Path: strateger-react/src/components/Charts/MainChart/hooks/useChartSettings.jsx

import { useSelector } from 'react-redux';
import { 
    selectChartStochasticButton, 
    selectChartEmasButton, 
    selectChartCandleStickButton, 
    selectAlarmButtons,
    selectSelectedAlarmsButton,
    selectFilteredAlarmsButton,
    selectOrdersUsdtmButton, 
    selectOrdersCoinmButton, 
    selectOrdersSpotButton, 
    selectOrdersStandardButton 
} from 'reduxStore/interaction';

const useChartButtonsVisibility = () => {
    const chartSettings = {
        showStochasticSerie: useSelector(selectChartStochasticButton),
        showEmasSerie: useSelector(selectChartEmasButton),
        showCandlestickSerie: useSelector(selectChartCandleStickButton),

        showAlarmsMarkers: useSelector(selectAlarmButtons),        
        showSelectedAlarmsMarkers: useSelector(selectSelectedAlarmsButton),
        showFilteredAlarmsMarkers: useSelector(selectFilteredAlarmsButton),        
        
        showOrdersUsdmMarkers: useSelector(selectOrdersUsdtmButton),
        showOrdersCoinmMarkers: useSelector(selectOrdersCoinmButton),
        showOrdersSpotMarkers: useSelector(selectOrdersSpotButton),
        showOrdersStandardMarkers: useSelector(selectOrdersStandardButton),
    };

    return chartSettings;
};

export default useChartButtonsVisibility;