// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js

import { useRef } from 'react';

import useSetupMarkers from '../hooks/useSetupMarkers';
import useInitializeChart from '../hooks/useInitializeChart';
import useInitializeCandlestickSeries from '../hooks/useInitializeCandlestickSeries';
import useInitializeEmasSeries from '../hooks/useInitializeEmasSeries';
import useSetCandlestickSeriesData from '../hooks/useSetCandlestickSeriesData';
import useSetEmasSeriesData from '../hooks/useSetEmasSeriesData';

const CandlestickChartContainer = ({data, chartSettings, chartInterval, alarmMarkersSettings}) => {  
        
        const mainChartContainerRef = useRef();
        const chartRef = useInitializeChart(mainChartContainerRef);
    
        
        const candlestickSeriesRef = useInitializeCandlestickSeries(chartRef);
        const { ema10SeriesRef, ema55SeriesRef, ema200SeriesRef } = useInitializeEmasSeries(chartRef);
    
        //* Hooks
        useSetCandlestickSeriesData(chartSettings.showCandlestickSerie, data, candlestickSeriesRef);
        useSetEmasSeriesData(chartSettings.showEmasSerie, data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef);
    
        useSetupMarkers(candlestickSeriesRef, chartInterval, 
            alarmMarkersSettings.showAlarmsMarkers, alarmMarkersSettings.showAlarmsSelectedMarkers, alarmMarkersSettings.showAlarmsFilteredMarkers,
            chartSettings.showOrdersUsdmMarkers, chartSettings.showOrdersCoinmMarkers, chartSettings.showOrdersSpotMarkers, chartSettings.showOrdersStandardMarkers);
        
    

    return(
        <div
            ref={mainChartContainerRef}            
            className="h-full rounded-t-lg overflow-hidden"
      ></div>    
    )
};

export default CandlestickChartContainer;
