// useFilterAlarmsByInterval.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAlarms } from '../../../redux/slices/alarmSlice';

const useFilterAlarmsByInterval = () => {
    const dispatch = useDispatch();
    const alarms = useSelector((state) => state.alarms.alarms);
    const selectedTemporalidad = useSelector((state) => state.alarms.selectedTemporalidad);    

    useEffect(() => {
        if (selectedTemporalidad) {
            console.log('Filtrando por temporalidad:', selectedTemporalidad);
            
            const filteredAlarms = alarms.filter(alarm => (alarm.Temporalidad === selectedTemporalidad));
            dispatch(setSelectedAlarms(filteredAlarms));
        } else {
            dispatch(setSelectedAlarms([]));
        }
    }, [selectedTemporalidad, alarms, dispatch]);
};

export default useFilterAlarmsByInterval;
