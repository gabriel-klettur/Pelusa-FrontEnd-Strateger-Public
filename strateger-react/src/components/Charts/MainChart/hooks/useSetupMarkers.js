// Path: src/components/Charts/CandlestickChartChart/hooks/useMarkers.js

import useCreateAlarmMarkers from './useCreateAlarmMarkers';
import useCreateOrderMarkers from './useCreateOrderMarkers';
import useSetMarkersOnSerie from './useSetMarkersOnSerie';


const useSetupMarkers = (candlestickSeriesRef, chartInterval, showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers) => {
  
  //!------------------------------------ Create markers for alarms ------------------------------------
  useCreateAlarmMarkers(chartInterval);

  //!------------------------------------- Create markers for orders -------------------------------------
  useCreateOrderMarkers(chartInterval);

  //!------------------------------- Set markers to the candlestick series -------------------------------
  useSetMarkersOnSerie(candlestickSeriesRef,
                       showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers);
  
};

export default useSetupMarkers;
