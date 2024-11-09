import { useEffect } from 'react';


const useSetMarkersOnSerie = (candlestickSeriesRef, showAlarmMarkers, alarmMarkers) => {

    useEffect(() => {
      if (candlestickSeriesRef.current) {

         if(showAlarmMarkers){            
          candlestickSeriesRef.current.setMarkers(alarmMarkers);
         }else{
          candlestickSeriesRef.current.setMarkers([]);
         }
      }
    }, [alarmMarkers, candlestickSeriesRef, showAlarmMarkers]);
}

export default useSetMarkersOnSerie;