// useSetAllSelectedAlarms.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllSelectedAlarms } from '../../../redux/slices/alarmSlice';

const useSetAllSelectedAlarms = () => {
    const dispatch = useDispatch();
    const alarms = useSelector((state) => state.alarms.alarms);
    const selectedTypes = useSelector((state) => state.alarms.selectedTypes);

    useEffect(() => {
        const allAlarms = [];
        Object.keys(selectedTypes).forEach(temporalidad => {
            const types = selectedTypes[temporalidad] || [];
            const filteredAlarms = alarms.filter(alarm => 
                (temporalidad === '' || alarm.Temporalidad === temporalidad) &&
                (types.length === 0 || types.includes(alarm.Order))
            );
            allAlarms.push(...filteredAlarms);
        });
        dispatch(setAllSelectedAlarms(allAlarms));
    }, [selectedTypes, alarms, dispatch]);
};

export default useSetAllSelectedAlarms;
