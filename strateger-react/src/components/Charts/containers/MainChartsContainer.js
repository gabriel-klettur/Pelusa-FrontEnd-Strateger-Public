import React from 'react';

import useChartData from '../hooks/useChartData';
import useChart from '../hooks/useChart';
import useMarkers from '../hooks/useMarkers';

import LoadingOverlay from '../../common/utils/LoadingOverlay/LoadingOverlay';

const MainChartsContainer = ({ initialTemporalidad, startDate, endDate }) => {
  
  
  const { data, loading, chartInterval } = useChartData(initialTemporalidad, new Date(startDate).toISOString(), new Date(endDate).toISOString());
  const { chartContainerRef, candlestickSeriesRef, stochasticChartContainerRef } = useChart(data);
  
  useMarkers(candlestickSeriesRef, chartInterval);

  return (
    <div className="relative bg-african_violet-600">
      <LoadingOverlay isLoading={loading} />
                    
        <div className="col-span-10 flex flex-col bg-white p-2 rounded-br-lg mt-1">
          <div
            ref={chartContainerRef}
            className="h-96 flex-grow rounded-t-lg overflow-hidden"
          ></div>
          <div
            ref={stochasticChartContainerRef}
            className="h-32 flex-grow mt-2 rounded-b-lg overflow-hidden border-t-1 border-african_violet-700 mr-3"
          ></div>
        </div>
      </div>    
  );
};

export default MainChartsContainer;
