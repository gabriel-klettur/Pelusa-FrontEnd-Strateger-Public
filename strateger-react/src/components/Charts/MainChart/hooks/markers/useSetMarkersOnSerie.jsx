import { useEffect, useRef } from 'react';
import { createSeriesMarkers } from 'lightweight-charts';

const useSetMarkersOnSerie = (candlestickSeriesRef, combinedMarkers) => {
  const markersRef = useRef(null);
  const prevMarkersRef = useRef([]); // Guardar los marcadores anteriores

  useEffect(() => {
    if (!candlestickSeriesRef?.current) {      
      return;
    }

    // ✅ Guardamos la referencia en una variable local para evitar cambios inesperados
    const seriesInstance = candlestickSeriesRef.current;

    // ✅ Verificar si los marcadores han cambiado antes de actualizar
    const markersHaveChanged = JSON.stringify(prevMarkersRef.current) !== JSON.stringify(combinedMarkers);

    if (!markersHaveChanged) {      
      return;
    }
    
    if (!markersRef.current) {
      markersRef.current = createSeriesMarkers(seriesInstance, combinedMarkers || []);
    } else {
      markersRef.current.setMarkers(combinedMarkers || []);
    }

    // Guardar los marcadores actuales para comparar en la próxima actualización
    prevMarkersRef.current = combinedMarkers;

    return () => {
      if (!seriesInstance) {        
        markersRef.current?.setMarkers([]); // Solo eliminar cuando el gráfico ya no existe
        markersRef.current = null;
      }
    };
  }, [candlestickSeriesRef, combinedMarkers]); // ⚠️ `combinedMarkers` sigue aquí, pero evitamos actualizaciones innecesarias
};

export default useSetMarkersOnSerie;
