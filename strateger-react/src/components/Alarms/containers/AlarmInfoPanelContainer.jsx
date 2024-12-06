//Path: src/components/Alarms/containers/AlarmInfoPanel.jsx

//import ChartAlarmsByMonth from '../components/AlarmInfoPanel/ChartAlarmsByMonth/ChartAlarmsByMonth';
import ChartAlarmsByTime from '../components/AlarmInfoPanel/AlarmsGraphByTime/ChartAlarmsByTime';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import AlarmTab from '../components/AlarmTab';
import ChartAlarmsByMonth from '../components/AlarmInfoPanel/AlarmsGraphByMonth/AlarmsGraphByMonth';
import GeneralStatistics from '../components/AlarmInfoPanel/GeneralStatistics/GeneralStatistics';

const AlarmInfoPanel = ({alarmsData, filteredByClickAlarmsData, filteredByOptionsAlarmsData}) => {    

    const alarmsByHour = alarmsData.reduce((acc, alarm) => {
        if (alarm.Time_Alert) {
          const hour = new Date(alarm.Time_Alert).getHours(); // Extrae la hora de Time_Alert
          acc[hour] = (acc[hour] || 0) + 1; // Incrementa el contador para esa hora
        }
        return acc;
    }, {});        
    const alarmsByHourArray = Object.values(alarmsByHour);

    const alarmsByHourFilteredByClick = filteredByClickAlarmsData.reduce((acc, alarm) => {
        if (alarm.Time_Alert) {
          const hour = new Date(alarm.Time_Alert).getHours(); // Extrae la hora de Time_Alert
          acc[hour] = (acc[hour] || 0) + 1; // Incrementa el contador para esa hora
        }
        return acc;
    }, {});
    const alarmsByHourFilteredByClickArray = Object.values(alarmsByHourFilteredByClick);

    const alarmsByHourFilteredByOptions = filteredByOptionsAlarmsData.reduce((acc, alarm) => {
        if (alarm.Time_Alert) {
          const hour = new Date(alarm.Time_Alert).getHours(); // Extrae la hora de Time_Alert
          acc[hour] = (acc[hour] || 0) + 1; // Incrementa el contador para esa hora
        }
        return acc;
    }, {});
    const alarmsByHourFilteredByOptionsArray = Object.values(alarmsByHourFilteredByOptions);
    

    return(
        <div className='h-full bg-african_violet-200 p-2'>
            {/*<ChartAlarmsByMonth />                                */}            
            <TabGroup>
                <TabList className="flex justify-center w-full ">
                    <AlarmTab
                        tabName="Alarm By Time"                        
                    />                    
                    <AlarmTab
                        tabName="General Statistics"                        
                    />
                    <AlarmTab
                        tabName="Alarm By Month"                        
                    />
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ChartAlarmsByTime 
                            alarmsByHour={alarmsByHourArray}
                            alarmsByHourFilteredByClick={alarmsByHourFilteredByClickArray}
                            alarmsByHourFilteredByOptions={alarmsByHourFilteredByOptionsArray}
                        />                                               
                    </TabPanel>
                    <TabPanel>
                        <GeneralStatistics/>
                    </TabPanel>
                    <TabPanel>
                        <ChartAlarmsByMonth/>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
    

        </div>
    )
}

export default AlarmInfoPanel;