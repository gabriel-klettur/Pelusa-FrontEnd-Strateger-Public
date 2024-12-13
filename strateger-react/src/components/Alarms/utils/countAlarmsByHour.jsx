/**
 ** Counts the number of alarms for each hour of the day.
 *
 * @param {Array} alarms - An array of alarm objects, each containing a `Time_Alert` property.
 * @returns {Array} An array where the index represents the hour of the day (0-23) and the value at each index is the count of alarms for that hour.
 */
const countAlarmsByHour = (alarms) => {
    
    const dataSetAlarmsByHour = alarms.reduce((acc, alarm) => {
        if (alarm.Time_Alert) {
          const hour = new Date(alarm.Time_Alert).getHours();   // Extract the hour from Time_Alert
          acc[hour] = (acc[hour] || 0) + 1;                     // Increment the accumulator for that hour
        }
        return acc;
    }, {});       
    
    const alarmsHourlyDataset = Object.values(dataSetAlarmsByHour);

    return alarmsHourlyDataset;

};

export default countAlarmsByHour;