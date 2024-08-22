// useSetSelectedAlarms.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAlarms } from '../../../redux/slices/alarmSlice';

const useSetSelectedAlarms = () => {
    const dispatch = useDispatch();
    const alarms = useSelector((state) => state.alarms.alarms);
    const selectedTemporalidad = useSelector((state) => state.alarms.selectedTemporalidad);
    const selectedTypes = useSelector((state) => state.alarms.selectedTypes);

    useEffect(() => {
        if (selectedTemporalidad) {
            const types = selectedTypes[selectedTemporalidad] || [];
            const filteredAlarms = alarms.filter(alarm => 
                (selectedTemporalidad === '' || alarm.Temporalidad === selectedTemporalidad) &&
                (types.length === 0 || types.includes(alarm.Order))
            );
            dispatch(setSelectedAlarms(filteredAlarms));
        } else {
            dispatch(setSelectedAlarms([]));
        }
    }, [selectedTemporalidad, selectedTypes, alarms, dispatch]);
};

export default useSetSelectedAlarms;
