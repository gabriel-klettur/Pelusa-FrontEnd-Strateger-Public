// Path: strateger-react/src/components/Charts/MainChart/components/indicators/useSetMarkersOnSerie.jsx

import { useEffect, useRef } from 'react';
import { createSeriesMarkers } from 'lightweight-charts';

const useSetMarkersOnSerie = (candlestickSeriesRef, combinedMarkers) => {
  // Almacenamos la instancia del markers primitive en un ref
  const seriesMarkersRef = useRef(null);

  useEffect(() => {
    if (candlestickSeriesRef.current) {
      if (!seriesMarkersRef.current) {
        // Creamos la instancia de markers con los markers iniciales
        seriesMarkersRef.current = createSeriesMarkers(
          candlestickSeriesRef.current,
          combinedMarkers || []
        );
      } else {
        // Actualizamos los markers en la instancia existente
        seriesMarkersRef.current.setMarkers(combinedMarkers || []);
      }
    }
  }, [candlestickSeriesRef, combinedMarkers]);
};

export default useSetMarkersOnSerie;
