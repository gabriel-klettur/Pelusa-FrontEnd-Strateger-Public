import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectTemporalidad, selectStartDate, selectCurrentDate } from 'reduxStore/toolBar';

import StochasticChartContainer from './StochasticChartContainer';
import CandlestickChartContainer from './CandlestickChartContainer';

import useSetupMarkers from '../hooks/useSetupMarkers';
import useFetchChartData from '../hooks/useFetchChartData';
import useSetupChartParameters from '../hooks/useSetupChartParameters';
import useInitializeChart from '../hooks/useInitializeChart';
import useInitializeCandlestickSeries from '../hooks/useInitializeCandlestickSeries';
import useInitializeEmasSeries from '../hooks/useInitializeEmasSeries';

import useSetCandlestickSeriesData from '../hooks/useSetCandlestickSeriesData';
import useSetEmasSeriesData from '../hooks/useSetEmasSeriesData';

import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';
import ButtonsPanel from '../components/buttonsPanel/ButtonsPanel';

import { selectChartStochasticButton, selectChartEmasButton, selectChartCandleStickButton} from 'reduxStore/interaction';
import { selectAlarmButtons, selectSelectedAlarmsButton, selectFilteredAlarmsButton } from 'reduxStore/interaction';
import { selectOrdersUsdtmButton, selectOrdersCoinmButton, selectOrdersSpotButton, selectOrdersStandardButton } from 'reduxStore/interaction';


const ChartContainer = ({ showButtonsPanel, updateShowButtonsPanel }) => {
    
    //!------------------------------ States Show/Hidden Components ------------------------------!//    
    const chartSettings = {
        showStochasticSerie: useSelector(selectChartStochasticButton),
        showEmasSerie: useSelector(selectChartEmasButton),
        showCandlestickSerie: useSelector(selectChartCandleStickButton),
        
        showOrdersUsdmMarkers: useSelector(selectOrdersUsdtmButton),
        showOrdersCoinmMarkers: useSelector(selectOrdersCoinmButton),
        showOrdersSpotMarkers: useSelector(selectOrdersSpotButton),
        showOrdersStandardMarkers: useSelector(selectOrdersStandardButton),
    };

    const alarmMarkersSettings = {
        showAlarmsMarkers: useSelector(selectAlarmButtons),
        showAlarmsSelectedMarkers: useSelector(selectSelectedAlarmsButton),
        showAlarmsFilteredMarkers: useSelector(selectFilteredAlarmsButton),
    };

    //!------------------------------ Parameters ------------------------------!//
    const interval = useSelector(selectTemporalidad);
    const startDate = new Date(useSelector(selectStartDate)).toISOString();
    const endDate = new Date(useSelector(selectCurrentDate)).toISOString();

    const { chartStartDate, chartEndDate } = useSetupChartParameters(interval, startDate, endDate);
    const { data, loading, chartInterval } = useFetchChartData(chartStartDate, chartEndDate);

    //!------------------------------ Main Chart ------------------------------!//
    const mainChartContainerRef = useRef();
    const chartRef = useInitializeChart(mainChartContainerRef);

    //!------------------------------ Main Chart ------------------------------!//
    const candlestickSeriesRef = useInitializeCandlestickSeries(chartRef);
    const { ema10SeriesRef, ema55SeriesRef, ema200SeriesRef } = useInitializeEmasSeries(chartRef);

    //* Hooks
    useSetCandlestickSeriesData(chartSettings.showCandlestickSerie, data, candlestickSeriesRef);
    useSetEmasSeriesData(chartSettings.showEmasSerie, data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef);

    useSetupMarkers(candlestickSeriesRef, chartInterval, 
        alarmMarkersSettings.showAlarmsMarkers, alarmMarkersSettings.showAlarmsSelectedMarkers, alarmMarkersSettings.showAlarmsFilteredMarkers,
        chartSettings.showOrdersUsdmMarkers, chartSettings.showOrdersCoinmMarkers, chartSettings.showOrdersSpotMarkers, chartSettings.showOrdersStandardMarkers);
    

    //!------------------------------ Render ------------------------------!//
    return (
        <div className="relative">
            <LoadingOverlay isLoading={loading} />

            <div className="absolute top-1 left-1 flex flex-col space-y-1 z-10">                
                <ButtonsPanel
                    chartSettings={chartSettings}                    
                    showButtonsPanel={showButtonsPanel}
                    updateShowButtonsPanel={updateShowButtonsPanel}
                    alarmMarkersSettings={alarmMarkersSettings}                    
                />        
            </div>

            <div className="flex flex-col">
                <div style={{ height: chartSettings.showStochasticSerie ? "400px" : "600px" }}>
                    <CandlestickChartContainer chartContainerRef={mainChartContainerRef} />
                </div>
                <div style={{ height: chartSettings.showStochasticSerie ? "200px" : "0px" }}>
                    <StochasticChartContainer 
                        data={data} 
                        chartSettings={chartSettings}                         
                 />
                </div>
            </div>
        </div>
    );
}

export default ChartContainer;
