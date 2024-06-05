// Path: strateger-react/src/components/CandleChart/flags.js

export const getFlags = (alarms) => {
  const uniqueIds = new Set();
  
  return alarms.map((alarm, index) => {
    let color;
    switch (alarm.Order) {
      case 'close long':
        color = 'blue';
        break;
      case 'open long':
        color = 'green';
        break;
      case 'open short':
        color = 'red';
        break;
      case 'close short':
        color = 'orange';
        break;
      default:
        color = 'gray'; // default color if none of the conditions match
    }

    // Check for duplicate IDs
    if (uniqueIds.has(alarm.id)) {      
      return null; // Skip adding this flag
    }

    uniqueIds.add(alarm.id);

    return {
      x: new Date(alarm.Time_Alert).getTime() + index * 1000,      
      title: `${alarm.id}`,
      text: `${alarm.Order}`,
      color: color
    };
  }).filter(flag => flag !== null);
};
