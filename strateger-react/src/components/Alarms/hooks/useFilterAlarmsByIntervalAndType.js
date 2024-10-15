// useSetAllSelectedAlarms.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilteredByIntervalAndTypeAlarms } from '../../../redux/slices/alarmSlice';          
import { removeEmptySelectedTypes } from '../../../redux/slices/alarmFilterSlice';                   


const useFilterAlarmsByIntervalAndType = () => {
    const dispatch = useDispatch();
    const alarms = useSelector((state) => state.alarms.alarms);  

    const selectedTemporalidad = useSelector((state) => state.alarmsFilter.selectedTemporalidad);           // Interval selected (1m, 5m, 15m, etc)
    const selectedTypes = useSelector((state) => state.alarmsFilter.selectedTypes);                         // Types selected (Long, Short/ open long, close long, etc)

    useEffect(() => {

        const allAlarms = [];

        // Verificación adicional para asegurar que selectedTypes no solo tenga claves, sino que también contenga arrays con elementos
        const hasValidTypes = Object.keys(selectedTypes).some(key => selectedTypes[key].length > 0);    
        
        // If no temporalidad or types are selected, return all alarms
        if (Object.keys(selectedTypes).length === 0 || selectedTemporalidad === '' || !hasValidTypes) {                                    
            
            if (Object.keys(selectedTypes).length > 0) {
                Object.keys(selectedTypes).forEach(temporalidad => {
                    dispatch(removeEmptySelectedTypes(temporalidad));                       //Delete empty key (temporalidad) from the selectedTypes object, only if it has no elements
                    dispatch(setFilteredByIntervalAndTypeAlarms(allAlarms));        
                });
            }
            return;
        }
        
        // Iterate over each temporalidad and filter alarms
        Object.keys(selectedTypes).forEach(temporalidad => {

            if (temporalidad === '' || selectedTypes[temporalidad].length === 0) {                
                dispatch(removeEmptySelectedTypes(temporalidad)); // Esto eliminará la clave con array vacío
                return;
            }

            const types = selectedTypes[temporalidad] || [];
            const filteredAlarms = alarms.filter(alarm => 
                (alarm.Temporalidad === temporalidad) &&
                (types.includes(alarm.Order))
            );
            allAlarms.push(...filteredAlarms);

        });        

        dispatch(setFilteredByIntervalAndTypeAlarms(allAlarms));
        
    }, [selectedTypes, alarms, dispatch, selectedTemporalidad]);
};

export default useFilterAlarmsByIntervalAndType;
