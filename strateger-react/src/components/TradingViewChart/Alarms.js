// src/components/TradingViewChart/alarms.js

export const mapAlarmsToMarkers = (selectedAlarms) => {
    return selectedAlarms.map(alarm => {
      let color, text;
  
      switch (alarm.Order) {
        case 'order open long':
          color = 'green';
          text = 'Entry Long';
          break;
        case 'order close long':
          color = 'green';
          text = 'Close Long';
          break;
        case 'order open short':
          color = 'red';
          text = 'Entry Short';
          break;
        case 'order close short':
          color = 'red';
          text = 'Close Short';
          break;
        case 'indicator open long':
          color = 'blue';
          text = 'Indicator Open Long';
          break;
        case 'indicator close long':
          color = 'orange';
          text = 'Indicator Close Long';
          break;
        default:
          color = 'black';
          text = '?????';
      }
  
      return {
        time: Math.floor(new Date(alarm.Time_Alert).getTime() / 1000), // Convertir el tiempo al formato Unix timestamp en segundos
        position: 'aboveBar',
        color: color,
        shape: 'arrowDown',
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
  