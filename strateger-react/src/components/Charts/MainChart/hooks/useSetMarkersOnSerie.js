import { useEffect } from 'react';
import { useSelector } from 'react-redux';


import { selectMarkersAlarmDefault} from '../../../../redux/charts';
//import { selectOrderMarkers } from '../../../../redux/charts';

const useSetMarkersOnSerie = (candlestickSeriesRef, 
                              showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers) => {

    const alarmMarkers = useSelector(selectMarkersAlarmDefault);    
    //const orderMarkers = useSelector(selectOrderMarkers);

    useEffect(() => {
      if (candlestickSeriesRef.current) {

         if(showAlarmsMarkers){            
          candlestickSeriesRef.current.setMarkers(alarmMarkers);
         }else{
          candlestickSeriesRef.current.setMarkers([]);
         }
      }
    }, [alarmMarkers, candlestickSeriesRef, showAlarmsMarkers]);




}

export default useSetMarkersOnSerie;