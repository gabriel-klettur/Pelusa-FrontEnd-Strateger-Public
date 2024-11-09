import { useEffect } from 'react';
import { useSelector } from 'react-redux';


import { selectMarkersAlarmDefault, selectMarkersAlarmSelectedByClick, selectMarkersAlarmFilteredByInterval, selectMarkersAlarmFilteredByIntervalAndType} from '../../../../redux/charts';

const useSetMarkersOnSerie = (candlestickSeriesRef, 
                              showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers) => {

    const alarmDefaultMarkers = useSelector(selectMarkersAlarmDefault);    
    const alarmSelectedByClickMarkers = useSelector(selectMarkersAlarmSelectedByClick);
    const alarmFilteredByIntervalMarkers = useSelector(selectMarkersAlarmFilteredByInterval);
    const alarmFilteredByIntervalAndTypeMarkers = useSelector(selectMarkersAlarmFilteredByIntervalAndType);

    useEffect(() => {
      if (candlestickSeriesRef.current) {

         if(showAlarmsMarkers){            
          candlestickSeriesRef.current.setMarkers(alarmDefaultMarkers);
         }else{
          candlestickSeriesRef.current.setMarkers([]);
         }
      }
    }, [alarmDefaultMarkers, candlestickSeriesRef, showAlarmsMarkers]);

    useEffect(() => {
      if (candlestickSeriesRef.current) {
        if(showAlarmsSelectedMarkers){
          candlestickSeriesRef.current.setMarkers(alarmSelectedByClickMarkers);
        }else{
          candlestickSeriesRef.current.setMarkers([]);
        }
      }
    }, [alarmSelectedByClickMarkers, candlestickSeriesRef, showAlarmsSelectedMarkers]);

    useEffect(() => {
      if (candlestickSeriesRef.current) {
        if(showAlarmsFilteredByIntervalMarkers){
          candlestickSeriesRef.current.setMarkers(alarmFilteredByIntervalMarkers);
        }else{
          candlestickSeriesRef.current.setMarkers([]);
        }
      }
    }, [alarmFilteredByIntervalMarkers, candlestickSeriesRef, showAlarmsFilteredByIntervalMarkers]);

    useEffect(() => {
      if (candlestickSeriesRef.current) {
        if(showAlarmsFilteredByIntervalAndTypeMarkers){
          candlestickSeriesRef.current.setMarkers(alarmFilteredByIntervalAndTypeMarkers);
        }else{
          candlestickSeriesRef.current.setMarkers([]);
        }
      }
    }, [alarmFilteredByIntervalAndTypeMarkers, candlestickSeriesRef, showAlarmsFilteredByIntervalAndTypeMarkers]);
}

export default useSetMarkersOnSerie;