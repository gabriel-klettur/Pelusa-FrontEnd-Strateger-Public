import { MARKER_TYPES } from './markerConfig';

export const generateMarkers = (data, type, interval) => {
  const markers = [];

  data.forEach((item) => {
    const markerConfig = MARKER_TYPES[type][item.action || item.Order || item.side];

    if (markerConfig) {
      markers.push({
        time: Math.floor(new Date(item.time || item.Time_Alert).getTime() / 1000),
        position: markerConfig.position,
        color: markerConfig.color,
        shape: markerConfig.shape,
        text: `${markerConfig.text} (${interval || item.Interval})`,
      });
    }
  });

  return markers;
};
