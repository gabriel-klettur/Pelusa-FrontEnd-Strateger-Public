import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectTemporalidad, selectStartDate, selectCurrentDate } from '../../../../redux/toolBar';

import StochasticChartContainer from './StochasticChartContainer';
import CandlestickChartContainer from './CandlestickChartContainer';

import useChartData from '../hooks/useChartData';
import useMarkers from '../hooks/useMarkers';
import useStochasticChart from '../hooks/useStochasticChart';
import useCandlestickChart from '../hooks/useCandlestickChart';

import { setEmasSeriesData } from '../components/series/emasSeries';
import { setStochastickSeriesData } from '../components/series/stochastickSeries';
import { setCandlestickSeriesData } from '../components/series/candlestickSeries';

import { formatChartData, sortAndRemoveDuplicates } from '../utils/chartData';

import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';

const ChartContainer = ( ) => {
    const [showStochastic, setShowStochastic] = useState(false);

    const initialTemporalidad = useSelector(selectTemporalidad);
    const startDate = useSelector(selectStartDate);
    const endDate = useSelector(selectCurrentDate);

    const { data, loading, chartInterval } = useChartData(
      initialTemporalidad,
      new Date(startDate).toISOString(),
      new Date(endDate).toISOString()
    );
    
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
        <div className="relative bg-african_violet-900">
          <LoadingOverlay isLoading={loading} />    
          <button
          onClick={() => setShowStochastic(prev => !prev)}
          className="absolute top-1 left-1 z-10 px-1 py-1 bg-african_violet-500 text-white rounded"
        >
          Stochastic
        </button>
          <div className="flex flex-col">
            <CandlestickChartContainer chartContainerRef={chartContainerRef} />        
            <div className={showStochastic ? "block" : "hidden"}>
              <StochasticChartContainer stochasticChartContainerRef={stochasticChartContainerRef} />
            </div>               
          </div>
        </div>
      );
}

export default ChartContainer;