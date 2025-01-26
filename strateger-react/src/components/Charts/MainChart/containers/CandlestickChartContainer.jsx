// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js

import { useRef } from 'react';

import useSetupMarkers from '../hooks/useSetupMarkers';
import useInitializeChart from '../hooks/charts/useInitializeChart';
import useInitializeCandlestickSeries from '../hooks/charts/useInitializeCandlestickSeries';
import useInitializeEmasSeries from '../hooks/useInitializeEmasSeries';
import useSetCandlestickSeriesData from '../hooks/charts/useSetCandlestickSeriesData';
import useSetEmasSeriesData from '../hooks/useSetEmasSeriesData';
import useInitializeStochasticSeries from '../hooks/useInitializeStochasticSeries';
import useSetStochasticSeriesData from '../hooks/useSetStochasticSeriesData';


const CandlestickChartContainer = ({data, chartSettings, chartInterval}) => {  
        

        //!-----------------------------  Initialization -----------------------------!//
        const mainChartContainerRef = useRef();                         // Main chart container reference
        const chartRef = useInitializeChart(mainChartContainerRef);
            
        const candlestickSeriesRef = useInitializeCandlestickSeries(chartRef);
        const { ema10SeriesRef, ema55SeriesRef, ema200SeriesRef } = useInitializeEmasSeries(chartRef);
        const { stochasticKSeriesRef, stochasticDSeriesRef } = useInitializeStochasticSeries(chartRef);
    
        //!----------------------- Incorportation of data -----------------------------!//
        useSetCandlestickSeriesData(chartSettings.showCandlestickSerie, data, candlestickSeriesRef);
        useSetEmasSeriesData(chartSettings.showEmasSerie, data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef);    
        useSetStochasticSeriesData(chartSettings.showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef);

        
        useSetupMarkers(candlestickSeriesRef, chartInterval, 
            chartSettings.showAlarmsMarkers, chartSettings.showAlarmsSelectedMarkers, chartSettings.showAlarmsFilteredMarkers,
            chartSettings.showOrdersUsdmMarkers, chartSettings.showOrdersCoinmMarkers, chartSettings.showOrdersSpotMarkers, chartSettings.showOrdersStandardMarkers);
        
    

    return(
        <div
            ref={mainChartContainerRef}            
            className="h-full rounded-t-lg overflow-hidden"
      ></div>    
    )
};

export default CandlestickChartContainer;
