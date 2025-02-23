// Path: src/components/Charts/MainChart/hooks/useSetMarkersOnSerie.jsx

import { useEffect, useRef } from 'react';
import { createSeriesMarkers } from 'lightweight-charts';

/**
 * Hook para asignar markers a una serie candlestick usando la API de Lightweight Charts 5.x.
 * @param {object} candlestickSeriesRef - useRef() que apunta a la serie de velas.
 * @param {Array} combinedMarkers - Arreglo de markers que se mostrarán en la serie.
 */
const useSetMarkersOnSerie = (candlestickSeriesRef, combinedMarkers) => {
  // Guardamos la instancia de la primitiva "markers" en un ref
  const markersPrimitiveRef = useRef(null);

  useEffect(() => {
    // Si la serie no está lista, no hacemos nada
    const series = candlestickSeriesRef.current;
    if (!series) return;

    // Si todavía no se ha creado la instancia de markers, la creamos
    if (!markersPrimitiveRef.current) {
      markersPrimitiveRef.current = createSeriesMarkers(series, combinedMarkers || []);
    } else {
      // De lo contrario, simplemente actualizamos los markers existentes
      markersPrimitiveRef.current.setMarkers(combinedMarkers || []);
    }

    // Cleanup opcional: al desmontar el hook, podemos limpiar los markers
    return () => {
      if (markersPrimitiveRef.current) {
        markersPrimitiveRef.current.setMarkers([]);
      }
    };
  }, [candlestickSeriesRef, combinedMarkers]);
};

export default useSetMarkersOnSerie;
