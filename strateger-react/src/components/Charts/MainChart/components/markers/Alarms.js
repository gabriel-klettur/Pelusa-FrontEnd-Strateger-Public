// Path: src/components/Charts/MainChart/components/markers/Alarms.js

const getCandleTime = (time, interval) => {
  const date = new Date(time * 1000);

  switch (interval) {
    case '1m':
      return Math.floor(date.setSeconds(0, 0) / 1000);
    case '5m':
      return Math.floor(date.setMinutes(Math.floor(date.getMinutes() / 5) * 5, 0, 0) / 1000);
    case '15m':
      return Math.floor(date.setMinutes(Math.floor(date.getMinutes() / 15) * 15, 0, 0) / 1000);
    case '30m':
      return Math.floor(date.setMinutes(Math.floor(date.getMinutes() / 30) * 30, 0, 0) / 1000);
    case '1h':
      return Math.floor(date.setMinutes(0, 0, 0) / 1000);
    case '4h':
      return Math.floor(date.setHours(Math.floor(date.getHours() / 4) * 4, 0, 0, 0) / 1000);
    case '1d':
      return Math.floor(date.setHours(0, 0, 0, 0) / 1000);
    case '1w':
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return Math.floor(new Date(date.setDate(diff)).setHours(0, 0, 0, 0) / 1000);
    case '1M':
      return Math.floor(new Date(date.getFullYear(), date.getMonth(), 1).setHours(0, 0, 0, 0) / 1000);
    default:
      return time;
  }
};

export const mapAlarmsToMarkers = (selectedAlarms, interval) => {

  const groupedAlarms = {};

  selectedAlarms.forEach(alarm => {
    const alarmTime = Math.floor(new Date(alarm.Time_Alert).getTime() / 1000);
    const candleTime = getCandleTime(alarmTime, interval);
    
    const key = `${candleTime}_${alarm.Order}_${alarm.Temporalidad}`;

    if (!groupedAlarms[key]) {
      groupedAlarms[key] = [];
    }
    groupedAlarms[key].push(alarm);
  });

  const markers = [];

  Object.keys(groupedAlarms).forEach(key => {
    const alarms = groupedAlarms[key];
    const alarm = alarms[0]; // Usar la primera alarma del grupo para obtener los detalles comunes

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

    text += ` (${alarm.Temporalidad}) x ${alarms.length}`;

    markers.push({
      time: parseInt(key.split('_')[0]), // Convertir candleTime de string a número
      position: position,
      color: color,
      shape: shape,
      text: text
    });
  });

  return markers;
};

export const sortAndFilterMarkers = (markers) => {
  return markers
    .sort((a, b) => a.time - b.time)
    .filter((item, index, array) => {
      if (index === 0 || item.time !== array[index - 1].time || item.text !== array[index - 1].text) {
        return true;
      } else {        
        return false;
      }
    });
};
