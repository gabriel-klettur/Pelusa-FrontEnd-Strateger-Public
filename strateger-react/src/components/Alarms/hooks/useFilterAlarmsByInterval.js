// useFilterAlarmsByInterval.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredByIntervalAlarms } from '../../../redux/slices/alarmSlice';

const useFilterAlarmsByInterval = () => {
    const dispatch = useDispatch();
    const alarms = useSelector((state) => state.alarms.alarms);
    const selectedTemporalidad = useSelector((state) => state.alarms.selectedTemporalidad);    

    useEffect(() => {
        if (selectedTemporalidad) {
            const filteredAlarms = alarms.filter(alarm => (alarm.Temporalidad === selectedTemporalidad));
            dispatch(setFilteredByIntervalAlarms(filteredAlarms));
        } else {
            dispatch(setFilteredByIntervalAlarms([]));
        }
    }, [selectedTemporalidad, alarms, dispatch]);
};

export default useFilterAlarmsByInterval;
