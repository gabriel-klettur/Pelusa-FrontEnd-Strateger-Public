import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectTemporalidad, selectStartDate, selectCurrentDate } from '../../../../redux/toolBar';

import StochasticChartContainer from './StochasticChartContainer';
import CandlestickChartContainer from './CandlestickChartContainer';

import useMarkers from '../hooks/useMarkers';
import useStochasticChart from '../hooks/useStochasticChart';
import useCandlestickChart from '../hooks/useCandlestickChart';
import useFetchChartData from '../hooks/useFetchChartData';
import useSetupChartParameters from '../hooks/useSetupChartParameters';

import { setEmasSeriesData } from '../components/series/emasSeries';
import { setStochastickSeriesData } from '../components/series/stochastickSeries';
import { setCandlestickSeriesData } from '../components/series/candlestickSeries';

import { formatChartData, sortAndRemoveDuplicates } from '../utils/chartData';

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

      // Hook for Candlestick chart
    const {
      chartContainerRef,
      candlestickSeriesRef,
      ema10SeriesRef,
      ema55SeriesRef,
      ema200SeriesRef,
    } = useCandlestickChart();

    // Hook for Stochastic chart
    const {
      stochasticChartContainerRef,
      stochasticKSeriesRef,
      stochasticDSeriesRef,
    } = useStochasticChart();


    // Hook to set series data whenever data is updated
    useEffect(() => {
      if (data && candlestickSeriesRef.current) {

        const formattedData = formatChartData(data);
        const sortedData = sortAndRemoveDuplicates(formattedData);

        setCandlestickSeriesData(
          candlestickSeriesRef.current, 
          sortedData
        );

        setEmasSeriesData(
          ema10SeriesRef.current,
          ema55SeriesRef.current,
          ema200SeriesRef.current,
          sortedData
        );

        setStochastickSeriesData(
          stochasticKSeriesRef.current,
          stochasticDSeriesRef.current,
          sortedData
        );

      }
    }, [
      data,
      candlestickSeriesRef,
      ema10SeriesRef,
      ema55SeriesRef,
      ema200SeriesRef,
      stochasticKSeriesRef,
      stochasticDSeriesRef,
    ]);

    useMarkers(candlestickSeriesRef, chartInterval); //* -----  Hook to set markers on the chart -----

    

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
                chartContainerRef={chartContainerRef}                               
              />   
            </div>     
            <div 
              style={{ height: showStochastic ? "200px" : "0px" }}
            >
              <StochasticChartContainer stochasticChartContainerRef={stochasticChartContainerRef} />
            </div>               
          </div>
        </div>
      );
}

export default ChartContainer;