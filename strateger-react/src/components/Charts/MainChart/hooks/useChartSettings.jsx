//Path: strateger-react/src/components/Charts/MainChart/hooks/useChartSettings.jsx

import { useSelector } from 'react-redux';
import { 
    selectChartStochasticButton, 
    selectChartEmasButton, 
    selectChartCandleStickButton, 
    selectOrdersUsdtmButton, 
    selectOrdersCoinmButton, 
    selectOrdersSpotButton, 
    selectOrdersStandardButton 
} from 'reduxStore/interaction';

const useChartSettings = () => {
    const chartSettings = {
        showStochasticSerie: useSelector(selectChartStochasticButton),
        showEmasSerie: useSelector(selectChartEmasButton),
        showCandlestickSerie: useSelector(selectChartCandleStickButton),
        showOrdersUsdmMarkers: useSelector(selectOrdersUsdtmButton),
        showOrdersCoinmMarkers: useSelector(selectOrdersCoinmButton),
        showOrdersSpotMarkers: useSelector(selectOrdersSpotButton),
        showOrdersStandardMarkers: useSelector(selectOrdersStandardButton),
    };

    return chartSettings;
};

export default useChartSettings;