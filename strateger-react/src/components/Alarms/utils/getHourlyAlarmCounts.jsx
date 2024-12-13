//Path: strateger-react/src/components/Alarms/utils/getHourlyAlarmCounts.jsx

const getHourlyAlarmCounts = (alarms) => {
    
    const alarmsByHour = alarms.reduce((acc, alarm) => {
        if (alarm.Time_Alert) {
          const hour = new Date(alarm.Time_Alert).getHours();   // Extract the hour from Time_Alert
          acc[hour] = (acc[hour] || 0) + 1;                     // Incrementa el contador para esa hora
        }
        return acc;
    }, {});        
    const alarmsByHourArray = Object.values(alarmsByHour);
    
    return alarmsByHourArray

}

export default getHourlyAlarmCounts;