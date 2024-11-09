// Path: src/components/Charts/CandlestickChartChart/hooks/useMarkers.js

import useCreateAlarmMarkers from './useCreateAlarmMarkers';
import useCreateOrderMarkers from './useCreateOrderMarkers';
import useSetMarkersOnSerie from './useSetMarkersOnSerie';

import { selectAlarmsData } from '../../../../redux/alarm';
import { selectFilteredByClickAlarms } from '../../../../redux/alarm';
import { selectFilteredByIntervalAlarms } from '../../../../redux/alarm';
import { selectFilteredByIntervalAndTypeAlarms } from '../../../../redux/alarm';


import { setAlarmDefaultMarkers} from '../../../../redux/charts';
import { setAlarmSelectedByClickMarkers } from '../../../../redux/charts';
import { setAlarmFilteredByIntervalMarkers } from '../../../../redux/charts';
import { setAlarmFilteredByIntervalAndTypeMarkers } from '../../../../redux/charts';


const useSetupMarkers = (candlestickSeriesRef, chartInterval, showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers) => {
  
  //!------------------------------------ Create markers for alarms ------------------------------------  
  useCreateAlarmMarkers(chartInterval, selectAlarmsData, setAlarmDefaultMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByClickAlarms, setAlarmSelectedByClickMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByIntervalAlarms, setAlarmFilteredByIntervalMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByIntervalAndTypeAlarms, setAlarmFilteredByIntervalAndTypeMarkers);


  //!------------------------------------- Create markers for orders -------------------------------------
  useCreateOrderMarkers(chartInterval);

  //!------------------------------- Set markers to the candlestick series -------------------------------
  useSetMarkersOnSerie(candlestickSeriesRef,
                       showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers);
  
};

export default useSetupMarkers;
