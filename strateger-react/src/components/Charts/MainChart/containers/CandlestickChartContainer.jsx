// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js

import { useRef } from 'react';

//!---- Chart ----!//
import useInitializeChart from '../hooks/charts/useInitializeChart';

//!---- Indicators ----!//
import useInitializeCandlestickSeries from '../hooks/charts/useInitializeCandlestickSeries';
import useSetCandlestickSeriesData from '../hooks/charts/useSetCandlestickSeriesData';
import useInitializeEmasSeries from '../hooks/indicators/useInitializeEmasSeries';
import useSetEmasSeriesData from '../hooks/indicators/useSetEmasSeriesData';
import useInitializeStochasticSeries from '../hooks/indicators/useInitializeStochasticSeries';
import useSetStochasticSeriesData from '../hooks/indicators/useSetStochasticSeriesData';
import useInitializeRSISeries from '../hooks/indicators/useInitializeRSISeries';
import useSetRSISeriesData from '../hooks/indicators/useSetRSISeriesData';

import useInitializeSQZSeries from '../hooks/indicators/useInitializeSQZSeries';
import useSetSQZSeriesData from '../hooks/indicators/useSetSQZSeriesData';

//!---- Markers ----!//
import useSetupMarkers from '../hooks/markers/useSetupMarkers';

const CandlestickChartContainer = ({data, chartSettings, chartInterval}) => {  
        
        //!-----------------------------  Initialization -----------------------------!//
        const mainChartContainerRef = useRef();                         // Main chart container reference
        const chartRef = useInitializeChart(mainChartContainerRef);
            
        const candlestickSeriesRef = useInitializeCandlestickSeries(chartRef);
        
        const { ema10SeriesRef, ema55SeriesRef, ema200SeriesRef } = useInitializeEmasSeries(chartRef);
        const { stochasticKSeriesRef, stochasticDSeriesRef } = useInitializeStochasticSeries(chartRef);                
        const { positiveIncreasingRef, positiveDecreasingRef, negativeDecreasingRef, negativeIncreasingRef } = useInitializeSQZSeries(chartRef);
        const { rsiSeriesRef } = useInitializeRSISeries(chartRef);
    
        //!----------------------- Incorportation of data -----------------------------!//
        useSetCandlestickSeriesData(chartSettings.showCandlestickSerie, data, candlestickSeriesRef);
        useSetEmasSeriesData(chartSettings.showEmasSerie, data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef);    
        useSetStochasticSeriesData(chartSettings.showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef);
        useSetSQZSeriesData(
            chartSettings.showSQZMOMENTUMSerie, 
            data, 
            positiveIncreasingRef, 
            positiveDecreasingRef, 
            negativeDecreasingRef, 
            negativeIncreasingRef
        );
        useSetRSISeriesData(chartSettings.showRSISerie, data, rsiSeriesRef);       
        
        useSetupMarkers(candlestickSeriesRef, chartInterval, 
            chartSettings.showAlarmsMarkers, chartSettings.showAlarmsSelectedMarkers, chartSettings.showAlarmsFilteredMarkers,
            chartSettings.showOrdersUsdmMarkers, chartSettings.showOrdersCoinmMarkers, chartSettings.showOrdersSpotMarkers, chartSettings.showOrdersStandardMarkers);            

    return(
        <div
            ref={mainChartContainerRef}            
            className="h-full overflow-hidden"
      ></div>    
    )
};

export default CandlestickChartContainer;
