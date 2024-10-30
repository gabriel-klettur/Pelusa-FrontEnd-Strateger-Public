
import { useSelector } from 'react-redux';

import { selectTemporalidad, selectStartDate, selectCurrentDate } from '../../../../redux/toolBar';

import useChartData from '../hooks/useChartData';
import useChart from '../hooks/useChart';
import useMarkers from '../hooks/useMarkers';

import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';

import StochasticChartContainer from './StochasticChartContainer';
import CandlestickChartContainer from './CandlestickChartContainer';

const ChartContainer = ( ) => {

    const initialTemporalidad = useSelector(selectTemporalidad);
    const startDate = useSelector(selectStartDate);
    const endDate = useSelector(selectCurrentDate);
  
    const { data, loading, chartInterval } = useChartData(
      initialTemporalidad,
      new Date(startDate).toISOString(),
      new Date(endDate).toISOString()
    );
    
    const { chartContainerRef, candlestickSeriesRef, stochasticChartContainerRef } = useChart(data);
    
    useMarkers(candlestickSeriesRef, chartInterval);

    return (
        <div className="relative bg-african_violet-900">
          <LoadingOverlay isLoading={loading} />    
          <div className="flex flex-col">
            <CandlestickChartContainer chartContainerRef={chartContainerRef} />
            <StochasticChartContainer stochasticChartContainerRef={stochasticChartContainerRef} />                
          </div>
        </div>
      );
}

export default ChartContainer;