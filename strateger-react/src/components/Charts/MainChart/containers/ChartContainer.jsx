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
import ItemChartButton from '../components/buttons/ItemChartButton';

const ChartContainer = ( ) => {
    const [showStochasticSerie, setShowStochasticSerie] = useState(false);    
    const [showEmasSerie, setShowEmasSerie] = useState(false);
    const [showCandlestickSerie, setShowCandlestickSerie] = useState(true);
    const [showAlarmsMarkers, setShowAlarmsMarkers] = useState(false);
    const [showAlarmsSelectedMarkers, setShowAlarmsSelectedMarkers] = useState(false);
    const [showAlarmsFilteredByIntervalMarkers, setShowAlarmsFilteredByIntervalMarkers] = useState(false);
    const [showAlarmsFilteredByIntervalAndTypeMarkers, setShowAlarmsFilteredByIntervalAndTypeMarkers] = useState(false);    

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
  
    useSetCandlestickSeriesData(showCandlestickSerie, data, candlestickSeriesRef);
    useSetEmasSeriesData(showEmasSerie, data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef);

    useSetupMarkers(candlestickSeriesRef, chartInterval, 
                    showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers);

    //!--------------------------------- Secondary Chart ---------------------------------
    const secondaryChartContainerRef = useRef();
    const secondChartRef = useInitializeChart(secondaryChartContainerRef);

    const {stochasticKSeriesRef,stochasticDSeriesRef } = useInitializeStochasticSeries(secondChartRef);
    
    useSetStochasticSeriesData(showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef);    
    
    return (
        <div className="relative">
          <LoadingOverlay isLoading={loading} />  

          <div className="absolute top-1 left-1 flex flex-col space-y-1 z-10">
            <div className="flex flex-col space-y-1">
              <div className='flex space-x-1'>
                <ItemChartButton setShow={setShowStochasticSerie} indicatorName='Stochastic'/>            
                <ItemChartButton setShow={setShowEmasSerie} indicatorName='Emas'/>            
                <ItemChartButton setShow={setShowCandlestickSerie} indicatorName='Candlesticks'/>                                                       
              </div>
              <div className='flex space-x-1'>                                 
                <ItemChartButton setShow={setShowAlarmsMarkers} indicatorName='Alarms'/>            
                <ItemChartButton setShow={setShowEmasSerie} indicatorName='Selected Alarms'/>                        
                <ItemChartButton setShow={setShowEmasSerie} indicatorName='Alarms Filtered by Interval'/>                        
                <ItemChartButton setShow={setShowEmasSerie} indicatorName='Alarms Filtered by Interval and Type'/>                        
              </div>
            </div>
          </div>

          
          <div className="flex flex-col">
            <div 
              style={{ height: showStochasticSerie ? "400px" : "600px" }}
            >
              <CandlestickChartContainer 
                chartContainerRef={mainChartContainerRef}                               
              />              
            </div>     
            <div 
              style={{ height: showStochasticSerie ? "200px" : "0px" }}
            >
              <StochasticChartContainer stochasticChartContainerRef={secondaryChartContainerRef} />
            </div>               
          </div>
        </div>
      );
}

export default ChartContainer;