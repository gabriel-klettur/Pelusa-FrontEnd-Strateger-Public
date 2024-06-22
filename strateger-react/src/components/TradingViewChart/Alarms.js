// src/components/TradingViewChart/alarms.js

export const mapAlarmsToMarkers = (selectedAlarms) => {
    return selectedAlarms.map(alarm => {
      let color, text, position, shape;
  
      switch (alarm.Order) {
        case 'order open long':
          color = 'green';
          text = 'Entry Long';
          position = 'belowBar';
          shape = 'arrowUp';
          break;
        case 'order close long':
          color = 'red';
          text = 'Close Long';
          position = 'aboveBar';
          shape = 'arrowDown';
          break;
        case 'order open short':
          color = 'red';
          text = 'Entry Short';
          position = 'aboveBar';
          shape = 'arrowDown';
          break;
        case 'order close short':
          color = 'green';
          text = 'Close Short';
          position = 'aboveBar';
          shape = 'circle';
          break;
        case 'indicator open long':
          color = 'blue';
          text = 'Indicator Open Long';
          position = 'belowBar';
          shape = 'arrowUp';
          break;
        case 'indicator close long':
          color = 'orange';
          text = 'Indicator Close Long';
          position = 'aboveBar';
          shape = 'arrowDown';
          break;
        case 'indicator open short':
          color = 'orange';
          text = 'Indicator Open Short';
          position = 'aboveBar';
          shape = 'square';
          break;
        case 'indicator close short':
          color = 'blue';
          text = 'Indicator Close Short';
          position = 'aboveBar';
          shape = 'arrowUp';
          break;
        default:
          color = 'black';
          text = '?????';
          position = 'aboveBar';
          shape = 'arrowDown';
      }
  
      return {
        time: Math.floor(new Date(alarm.Time_Alert).getTime() / 1000), // Convertir el tiempo al formato Unix timestamp en segundos
        position: position,
        color: color,
        shape: shape,
        text: text
      };
    });
  };
  
  export const sortAndFilterMarkers = (markers) => {
    return markers
      .sort((a, b) => a.time - b.time)
      .filter((item, index, array) => {
        if (index === 0 || item.time !== array[index - 1].time) {
          return true;
        } else {
          console.warn("Duplicate time found and removed:", item);
          return false;
        }
      });
  };
  