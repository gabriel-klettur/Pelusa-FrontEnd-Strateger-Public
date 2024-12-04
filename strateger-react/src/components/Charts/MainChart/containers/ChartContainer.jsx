import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectTemporalidad, selectStartDate, selectCurrentDate } from '../../../../redux/toolBar';

import StochasticChartContainer from './StochasticChartContainer';
import CandlestickChartContainer from './CandlestickChartContainer';

import useSetupMarkers from '../hooks/useSetupMarkers';
import useFetchChartData from '../hooks/useFetchChartData';
import useSetupChartParameters from '../hooks/useSetupChartParameters';
import useInitializeChart from '../hooks/useInitializeChart';
import useInitializeCandlestickSeries from '../hooks/useInitializeCandlestickSeries';
import useInitializeEmasSeries from '../hooks/useInitializeEmasSeries';
import useInitializeStochasticSeries from '../hooks/useInitializeStochasticSeries';

import useSetCandlestickSeriesData from '../hooks/useSetCandlestickSeriesData';
import useSetEmasSeriesData from '../hooks/useSetEmasSeriesData';
import useSetStochasticSeriesData from '../hooks/useSetStochasticSeriesData';

import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';
import ButtonsPanel from '../components/buttonsPanel/ButtonsPanel';

const ChartContainer = ({ showButtonsPanel, updateShowButtonsPanel }) => {
    
    //!------------------------------ States Show/Hidden Components ------------------------------!//
    const [chartSettings, setChartSettings] = useState({
        showStochasticSerie: false,
        showEmasSerie: false,
        showCandlestickSerie: true,        

        showOrdersUsdmMarkers: false,
        showOrdersCoinmMarkers: false,
        showOrdersSpotMarkers: false,
        showOrdersStandardMarkers: false,
    });

    const [alarmMarkersSettings, setAlarmMarkerSettings] = useState({
        showAlarmsMarkers: true,
        showAlarmsSelectedMarkers: false,
        showAlarmsFilteredMarkers: false,
    });

    const updateChartSetting = (key, value) => {
        setChartSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));        
    };

    const updateAlarmMarkerSetting = (key) => {
        setAlarmMarkerSettings((prevSettings) => {
            const isCurrentlyTrue = prevSettings[key]; // Verifica si el botón ya está en true
    
            // Si está en true, desactivamos todos; si está en false, activamos solo ese botón
            const updatedSettings = Object.keys(prevSettings).reduce((acc, currentKey) => {
                acc[currentKey] = currentKey === key ? !isCurrentlyTrue : false;
                return acc;
            }, {});
    
            return updatedSettings;
        });
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

    //!------------------------------ Secondary Chart ------------------------------!//
    const secondaryChartContainerRef = useRef();
    const secondChartRef = useInitializeChart(secondaryChartContainerRef);

    const { stochasticKSeriesRef, stochasticDSeriesRef } = useInitializeStochasticSeries(secondChartRef);

    //* Hooks
    useSetStochasticSeriesData(chartSettings.showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef);

    //!------------------------------ Render ------------------------------!//
    return (
        <div className="relative">
            <LoadingOverlay isLoading={loading} />

            <div className="absolute top-1 left-1 flex flex-col space-y-1 z-10">                
                <ButtonsPanel
                    chartSettings={chartSettings}
                    updateChartSetting={updateChartSetting} 
                    showButtonsPanel={showButtonsPanel}
                    updateShowButtonsPanel={updateShowButtonsPanel}
                    alarmMarkersSettings={alarmMarkersSettings}
                    updateAlarmMarkerSetting={updateAlarmMarkerSetting}
                />        
            </div>

            <div className="flex flex-col">
                <div style={{ height: chartSettings.showStochasticSerie ? "400px" : "600px" }}>
                    <CandlestickChartContainer chartContainerRef={mainChartContainerRef} />
                </div>
                <div style={{ height: chartSettings.showStochasticSerie ? "200px" : "0px" }}>
                    <StochasticChartContainer stochasticChartContainerRef={secondaryChartContainerRef} />
                </div>
            </div>
        </div>
    );
}

export default ChartContainer;
