// Path: src/components/Alarms/hooks/useFilterAlarmsByInterval.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilteredByIntervalAlarms } from '../../../redux/alarm/alarmSlice';

import { selectAlarmsData } from '../../../redux/alarm';

const useFilterAlarmsByInterval = () => {
    const dispatch = useDispatch();
    
    const alarms = useSelector(selectAlarmsData);
    const selectedTemporalidad = useSelector((state) => state.alarmsFilter.selectedTemporalidad);           // Interval selected (1m, 5m, 15m, etc)

    useEffect(() => {          
        if (selectedTemporalidad) {
            const filteredAlarms = alarms.filter(alarm => (alarm.Interval === selectedTemporalidad));            
            dispatch(setFilteredByIntervalAlarms(filteredAlarms));     
        } else {
            dispatch(setFilteredByIntervalAlarms([]));
        }
    }, [selectedTemporalidad, alarms, dispatch]);
};

export default useFilterAlarmsByInterval;
