// Path: strateger-react/src/components/CandleChart/flags.js

export const getFlags = (alarms, color) => {
    return alarms.map((alarm, index) => ({
      x: new Date(alarm.Time_Alert).getTime() + index * 1000,
      title: 'A' + alarm.id,
      text: `Alarm ${alarm.id}: ${alarm.Order}`,
      color: color
    }));
  };
  