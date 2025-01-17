import { useMemo } from 'react';
import { generateMarkers } from './markerService';

const useMarkers = (data, type, interval) => {
  const markers = useMemo(() => {
    if (!data || !type) return [];
    return generateMarkers(data, type, interval);
  }, [data, type, interval]);

  return markers;
};

export default useMarkers;