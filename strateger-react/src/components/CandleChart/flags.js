// Path: strateger-react/src/components/CandleChart/flags.js

export const getFlags = (alarms) => {
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

    //console.log('Alarm:', alarm);

    return {
      x: new Date(alarm.Time_Alert).getTime() + index * 1000,      
      title: `${alarm.id}`,
      text: `${alarm.Order}`,
      color: color
    };
  });
};
