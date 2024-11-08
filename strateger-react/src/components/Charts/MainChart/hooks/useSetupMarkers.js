// Path: src/components/Charts/CandlestickChartChart/hooks/useMarkers.js

import useCreateAlarmMarkers from './useCreateAlarmMarkers';
import useCreateOrderMarkers from './useCreateOrderMarkers';
import useSetMarkersOnSerie from './useSetMarkersOnSerie';


const useSetupMarkers = (candlestickSeriesRef, chartInterval) => {
  
  //!------------------------------------ Create markers for alarms ------------------------------------
  useCreateAlarmMarkers(chartInterval);

  //!------------------------------------- Create markers for orders -------------------------------------
  useCreateOrderMarkers(chartInterval);

  //!------------------------------- Set markers to the candlestick series -------------------------------
  useSetMarkersOnSerie(candlestickSeriesRef);
  
};

export default useSetupMarkers;
