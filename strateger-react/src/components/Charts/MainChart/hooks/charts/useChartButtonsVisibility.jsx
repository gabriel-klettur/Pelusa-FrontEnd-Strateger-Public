//Path: strateger-react/src/components/Charts/MainChart/hooks/charts/useChartButtonsVisibility.jsx

import { useSelector } from 'react-redux';
import { 
    selectChartStochasticButton, 
    selectChartEmasButton, 
    selectChartCandleStickButton, 
    selectChartSQZMomentumButton,
    selectAlarmButtons,
    selectSelectedAlarmsButton,
    selectFilteredAlarmsButton,
    selectOrdersUsdtmButton, 
    selectOrdersCoinmButton, 
    selectOrdersSpotButton, 
    selectOrdersStandardButton,
    selectChartRSIButton,
    selectChartAdxButton
} from 'reduxStore/interaction';

const useChartButtonsVisibility = () => {
    const chartSettings = {
        showStochasticSerie: useSelector(selectChartStochasticButton),
        showEmasSerie: useSelector(selectChartEmasButton),
        showCandlestickSerie: useSelector(selectChartCandleStickButton),
        showSQZMOMENTUMSerie: useSelector(selectChartSQZMomentumButton), 
        showRSISerie: useSelector(selectChartRSIButton), 
        showAdxSerie: useSelector(selectChartAdxButton), 

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