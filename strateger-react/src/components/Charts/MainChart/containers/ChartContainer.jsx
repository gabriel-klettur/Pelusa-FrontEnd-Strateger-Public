import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectTemporalidad, selectStartDate, selectCurrentDate } from '../../../../redux/toolBar';

import StochasticChartContainer from './StochasticChartContainer';
import CandlestickChartContainer from './CandlestickChartContainer';

import useMarkers from '../hooks/useMarkers';
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
import IndicatorButton from '../components/buttons/IndicatorButton';

const ChartContainer = ( ) => {
    const [showStochastic, setShowStochastic] = useState(false);    

    const interval = useSelector(selectTemporalidad);
    const startDate = new Date(useSelector(selectStartDate)).toISOString();
    const endDate = new Date(useSelector(selectCurrentDate)).toISOString();

    // Hook for fetching chart data and Setting chart parameters
  
    const { chartStartDate, chartEndDate } = useSetupChartParameters(interval, startDate, endDate);  
    const { data, loading, chartInterval } = useFetchChartData(chartStartDate, chartEndDate);

    //!--------------------------------- Main Chart -------------------------------------
    const mainChartContainerRef = useRef();
    const chartRef = useInitializeChart(mainChartContainerRef);   

    const candlestickSeriesRef = useInitializeCandlestickSeries(chartRef);
    const {ema10SeriesRef, ema55SeriesRef, ema200SeriesRef } = useInitializeEmasSeries(chartRef);
  
    useSetCandlestickSeriesData(data, candlestickSeriesRef);
    useSetEmasSeriesData(data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef);

    useMarkers(candlestickSeriesRef, chartInterval); 

    //!--------------------------------- Secondary Chart ---------------------------------
    const secondaryChartContainerRef = useRef();
    const secondChartRef = useInitializeChart(secondaryChartContainerRef);

    const {stochasticKSeriesRef,stochasticDSeriesRef } = useInitializeStochasticSeries(secondChartRef);
        
    useSetStochasticSeriesData(data, stochasticKSeriesRef, stochasticDSeriesRef);    
    
    return (
        <div className="relative">
          <LoadingOverlay isLoading={loading} />  

          <div className="absolute top-1 left-1 flex flex-col space-y-1 z-10">
            <IndicatorButton setShow={setShowStochastic} indicatorName='Stochastic'/>            
          </div>
          
          <div className="flex flex-col">
            <div 
              style={{ height: showStochastic ? "400px" : "600px" }}
            >
              <CandlestickChartContainer 
                chartContainerRef={mainChartContainerRef}                               
              />   
            </div>     
            <div 
              style={{ height: showStochastic ? "200px" : "0px" }}
            >
              <StochasticChartContainer stochasticChartContainerRef={secondaryChartContainerRef} />
            </div>               
          </div>
        </div>
      );
}

export default ChartContainer;