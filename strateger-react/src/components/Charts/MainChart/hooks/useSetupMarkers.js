// Path: src/components/Charts/CandlestickChartChart/hooks/useMarkers.js

import useCreateAlarmMarkers from './useCreateAlarmMarkers';
import useCreateOrderMarkers from './useCreateOrderMarkers';
import useSetMarkersOnSerie from './useSetMarkersOnSerie';

import { selectFilteredByIntervalAndTypeAlarms } from '../../../../redux/alarm';
import { setAlarmDefaultMarkers} from '../../../../redux/charts';

const useSetupMarkers = (candlestickSeriesRef, chartInterval, showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers) => {
  
  //!------------------------------------ Create markers for alarms ------------------------------------  
  useCreateAlarmMarkers(chartInterval, selectFilteredByIntervalAndTypeAlarms, setAlarmDefaultMarkers);

  //!------------------------------------- Create markers for orders -------------------------------------
  useCreateOrderMarkers(chartInterval);

  //!------------------------------- Set markers to the candlestick series -------------------------------
  useSetMarkersOnSerie(candlestickSeriesRef,
                       showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers);
  
};

export default useSetupMarkers;
