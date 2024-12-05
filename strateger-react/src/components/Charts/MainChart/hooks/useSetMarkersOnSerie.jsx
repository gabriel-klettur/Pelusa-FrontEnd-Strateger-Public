import { useEffect } from 'react';

const useSetMarkersOnSerie = (candlestickSeriesRef, combinedMarkers) => {
  useEffect(() => {
    if (candlestickSeriesRef.current) {
      candlestickSeriesRef.current.setMarkers(combinedMarkers || []); // Aplica todos los marcadores combinados
    }
  }, [combinedMarkers, candlestickSeriesRef]);
};

export default useSetMarkersOnSerie;
