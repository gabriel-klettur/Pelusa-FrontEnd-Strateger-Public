//Path: src/components/Alarms/containers/AlarmInfoPanel.jsx

import AlarmInfoChart from '../components/AlarmInfoPanel/ChartAlarmsByMonth/ChartAlarmsByMonth';

const AlarmInfoPanel = () => {
    return(
        <div className='h-full bg-african_violet-200 p-2'>
            <AlarmInfoChart />                    
        </div>
    )
}

export default AlarmInfoPanel;