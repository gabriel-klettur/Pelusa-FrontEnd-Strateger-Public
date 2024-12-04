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

const ChartContainer = () => {
    const [showStochasticSerie, setShowStochasticSerie] = useState(false);
    const [showEmasSerie, setShowEmasSerie] = useState(false);
    const [showCandlestickSerie, setShowCandlestickSerie] = useState(true);
    const [showAlarmsMarkers, setShowAlarmsMarkers] = useState(false);
    const [showAlarmsSelectedMarkers, setShowAlarmsSelectedMarkers] = useState(false);
    const [showAlarmsFilteredByIntervalMarkers, setShowAlarmsFilteredByIntervalMarkers] = useState(false);
    const [showAlarmsFilteredByIntervalAndTypeMarkers, setShowAlarmsFilteredByIntervalAndTypeMarkers] = useState(false);
    const [showOrdersUsdmMarkers, setShowOrdersUsdmMarkers] = useState(false);
    const [showOrdersCoinmMarkers, setShowOrdersCoinmMarkers] = useState(false);
    const [showOrdersSpotMarkers, setShowOrdersSpotMarkers] = useState(false);
    const [showOrdersStandardMarkers, setShowOrdersStandardMarkers] = useState(false);


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
    useSetCandlestickSeriesData(showCandlestickSerie, data, candlestickSeriesRef);
    useSetEmasSeriesData(showEmasSerie, data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef);
    useSetupMarkers(candlestickSeriesRef, chartInterval, 
                    showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers,
                    showOrdersUsdmMarkers, showOrdersCoinmMarkers, showOrdersSpotMarkers, showOrdersStandardMarkers);

    //!------------------------------ Secondary Chart ------------------------------!//
    const secondaryChartContainerRef = useRef();
    const secondChartRef = useInitializeChart(secondaryChartContainerRef);

    const { stochasticKSeriesRef, stochasticDSeriesRef } = useInitializeStochasticSeries(secondChartRef);

    //* Hooks
    useSetStochasticSeriesData(showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef);

    //!------------------------------ Render ------------------------------!//
    return (
        <div className="relative">
            <LoadingOverlay isLoading={loading} />

            <div className="absolute top-1 left-1 flex flex-col space-y-1 z-10">
                
                <ButtonsPanel
                    setShowStochasticSerie={setShowStochasticSerie}
                    setShowEmasSerie={setShowEmasSerie}
                    setShowCandlestickSerie={setShowCandlestickSerie}
                    setShowAlarmsMarkers={setShowAlarmsMarkers}
                    setShowAlarmsSelectedMarkers={setShowAlarmsSelectedMarkers}
                    setShowAlarmsFilteredByIntervalMarkers={setShowAlarmsFilteredByIntervalMarkers}
                    setShowAlarmsFilteredByIntervalAndTypeMarkers={setShowAlarmsFilteredByIntervalAndTypeMarkers}
                    setShowOrdersUsdmMarkers={setShowOrdersUsdmMarkers}
                    setShowOrdersCoinmMarkers={setShowOrdersCoinmMarkers}
                    setShowOrdersSpotMarkers={setShowOrdersSpotMarkers}
                    setShowOrdersStandardMarkers={setShowOrdersStandardMarkers}
                    showStochasticSerie={showStochasticSerie}
                    showEmasSerie={showEmasSerie}
                    showCandlestickSerie={showCandlestickSerie}
                    showAlarmsMarkers={showAlarmsMarkers}
                    showAlarmsSelectedMarkers={showAlarmsSelectedMarkers}
                    showAlarmsFilteredByIntervalMarkers={showAlarmsFilteredByIntervalMarkers}
                    showAlarmsFilteredByIntervalAndTypeMarkers={showAlarmsFilteredByIntervalAndTypeMarkers}
                    showOrdersUsdmMarkers={showOrdersUsdmMarkers}
                    showOrdersCoinmMarkers={showOrdersCoinmMarkers}
                    showOrdersSpotMarkers={showOrdersSpotMarkers}
                    showOrdersStandardMarkers={showOrdersStandardMarkers}                    
                />        
            </div>

            <div className="flex flex-col">
                <div style={{ height: showStochasticSerie ? "400px" : "600px" }}>
                    <CandlestickChartContainer chartContainerRef={mainChartContainerRef} />
                </div>
                <div style={{ height: showStochasticSerie ? "200px" : "0px" }}>
                    <StochasticChartContainer stochasticChartContainerRef={secondaryChartContainerRef} />
                </div>
            </div>
        </div>
    );
}

export default ChartContainer;
