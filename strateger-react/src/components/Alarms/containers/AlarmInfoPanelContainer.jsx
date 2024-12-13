//Path: src/components/Alarms/containers/AlarmInfoPanel.jsx

//import ChartAlarmsByMonth from '../components/AlarmInfoPanel/ChartAlarmsByMonth/ChartAlarmsByMonth';

import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import AlarmTab from '../components/AlarmTab';
import ChartAlarmsByMonth from '../components/AlarmInfoPanel/AlarmsGraphByMonth/AlarmsGraphByMonth';
import ChartAlarmsByTime from '../components/AlarmInfoPanel/AlarmsGraphByTime/ChartAlarmsByTime';
import GeneralStatistics from '../components/AlarmInfoPanel/GeneralStatistics/GeneralStatistics';

const AlarmInfoPanelContainer = ({alarmsData, filteredByClickAlarmsData, filteredByOptionsAlarmsData}) => {    

    const alarmsByHour = alarmsData.reduce((acc, alarm) => {
        if (alarm.Time_Alert) {
          const hour = new Date(alarm.Time_Alert).getHours();   // Extract the hour from Time_Alert
          acc[hour] = (acc[hour] || 0) + 1;                     // Incrementa el contador para esa hora
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
        <div className='h-full bg-african_violet-200 p-2' data-testid="alarm-info-panel-container">
            {/*<ChartAlarmsByMonth />                                */}            
            <TabGroup data-testid="alarm-info-tab-group">
                <TabList className="flex justify-center w-full " data-testid="alarm-info-tab-list">
                    <AlarmTab
                        tabName="Alarm By Time"  
                        data-testid="alarm-tab-alarm-by-time"                      
                    />                    
                    <AlarmTab
                        tabName="General Statistics" 
                        data-testid="alarm-tab-general-statistics"                     
                    />
                    <AlarmTab
                        tabName="Alarm By Month" 
                        data-testid="alarm-tab-alarm-by-month"                      
                    />
                </TabList>
                <TabPanels data-testid="alarm-info-tab-panels">
                    <TabPanel data-testid="alarm-info-tab-panel-alarm-by-time">
                        <ChartAlarmsByTime 
                            alarmsByHour={alarmsByHourArray}
                            alarmsByHourFilteredByClick={alarmsByHourFilteredByClickArray}
                            alarmsByHourFilteredByOptions={alarmsByHourFilteredByOptionsArray}
                            data-testid="chart-alarms-by-time"
                        />                                               
                    </TabPanel>
                    <TabPanel data-testid="alarm-info-tab-panel-general-statistics">
                        <GeneralStatistics data-testid="general-statistics"/>
                    </TabPanel>
                    <TabPanel data-testid="alarm-info-tab-panel-alarm-by-month">
                        <ChartAlarmsByMonth data-testid="chart-alarms-by-month"/>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
    

        </div>
    )
}

export default AlarmInfoPanelContainer;
