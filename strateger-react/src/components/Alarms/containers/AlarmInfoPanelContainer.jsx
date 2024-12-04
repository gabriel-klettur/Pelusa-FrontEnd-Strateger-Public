//Path: src/components/Alarms/containers/AlarmInfoPanel.jsx

//import ChartAlarmsByMonth from '../components/AlarmInfoPanel/ChartAlarmsByMonth/ChartAlarmsByMonth';
import ChartAlarmsByTime from '../components/AlarmInfoPanel/ChartAlarmsByTime/ChartAlarmsByTime';

const AlarmInfoPanel = ({alarmsData}) => {    

    const alarmsByHour = alarmsData.reduce((acc, alarm) => {
        if (alarm.Time_Alert) {
          const hour = new Date(alarm.Time_Alert).getHours(); // Extrae la hora de Time_Alert
          acc[hour] = (acc[hour] || 0) + 1; // Incrementa el contador para esa hora
        }
        return acc;
    }, {});        

    const alarmsByHourArray = Object.values(alarmsByHour);

    return(
        <div className='h-full bg-african_violet-200 p-2'>
            {/*<ChartAlarmsByMonth />                                */}
            <ChartAlarmsByTime 
                alarmsByHour={alarmsByHourArray}
            />
        </div>
    )
}

export default AlarmInfoPanel;