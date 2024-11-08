import { useEffect } from 'react';
import { useSelector } from 'react-redux';


import { selectAlarmMarkers} from '../../../../redux/charts';
import { selectOrderMarkers } from '../../../../redux/charts';

const useSetMarkersOnSerie = (candlestickSeriesRef) => {

    const alarmMarkers = useSelector(selectAlarmMarkers);
    const orderMarkers = useSelector(selectOrderMarkers);

    useEffect(() => {
        if (candlestickSeriesRef.current) {
          const combinedMarkers = [...alarmMarkers, ...orderMarkers]
            .filter(marker => !isNaN(marker.time)) // Filter out markers with invalid times
            .sort((a, b) => a.time - b.time);
    
          candlestickSeriesRef.current.setMarkers(combinedMarkers);
        }
      }, [alarmMarkers, orderMarkers, candlestickSeriesRef]);

}

export default useSetMarkersOnSerie;