import { useEffect } from 'react';
import { useSelector } from 'react-redux';


import { selectAlarmMarkers} from '../../../../redux/charts';
import { selectOrderMarkers } from '../../../../redux/charts';

const useSetMarkersOnSerie = (candlestickSeriesRef, 
                              showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers) => {

    const alarmMarkers = useSelector(selectAlarmMarkers);
    const orderMarkers = useSelector(selectOrderMarkers);

    useEffect(() => {
      if (candlestickSeriesRef.current) {

         if(showAlarmsMarkers){            
          candlestickSeriesRef.current.setMarkers(alarmMarkers);
         }else{
          candlestickSeriesRef.current.setMarkers([]);
         }
      }
    }, [alarmMarkers, orderMarkers, candlestickSeriesRef, showAlarmsMarkers]);

}

export default useSetMarkersOnSerie;