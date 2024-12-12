// Path: src/components/Alarms/hooks/useFilterAlarmsByIntervalAndType.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilteredByIntervalAndTypeAlarms } from '../../../redux/alarm/alarmSlice';          
import { removeEmptySelectedTypes } from '../../../redux/alarm/filtersPanel/alarmFilterPanelSlice';                   

import { selectAlarmsData } from '../../../redux/alarm';

const useFilterAlarmsByIntervalAndType = () => {
    const dispatch = useDispatch();
    const alarms = useSelector(selectAlarmsData);  

    const selectedIntevals = useSelector((state) => state.alarmsFilter.selectedTemporalidad);           // Interval selected (1m, 5m, 15m, etc)
    const selectedTypes = useSelector((state) => state.alarmsFilter.selectedTypes);                         // Types selected (Long, Short/ open long, close long, etc)

    useEffect(() => {

        const allAlarms = [];

        // Verificación adicional para asegurar que selectedTypes no solo tenga claves, sino que también contenga arrays con elementos
        const hasValidTypes = Object.keys(selectedTypes).some(key => selectedTypes[key].length > 0);    
        
        // If no Invervals or types are selected, clean filtered alarms with empty array and remove empty selected types
        if (Object.keys(selectedTypes).length === 0 || selectedIntevals === '' || !hasValidTypes) {                                    
            //console.log('1. This is the case when no intervals or types are selected');
            if (Object.keys(selectedTypes).length > 0) {
                //console.log('2. This is the case when no intervals is selected but types are selected');
                Object.keys(selectedTypes).forEach(interval => {
                    //console.log('3. Clean filtered alarms with empty array and remove empty selected types');
                    dispatch(removeEmptySelectedTypes(interval));                       //Delete empty key (interval) from the selectedTypes object, only if it has no elements                    
                    dispatch(setFilteredByIntervalAndTypeAlarms(allAlarms));            //Clean filtered alarms with empty array    
                });
            }
            return;
        }

        // Iterate over each temporalidad and filter alarms
        Object.keys(selectedTypes).forEach(interval => {
            //console.log('4. Iterate over each temporalidad and filter alarms');

            if (interval === '' || selectedTypes[interval].length === 0) {                
                //console.log('5. This is the case when no intervals is selected but types are empty');
                dispatch(removeEmptySelectedTypes(interval)); // Esto eliminará la clave con array vacío
                return;
            }

            const types = selectedTypes[interval] || [];
            const filteredAlarms = alarms.filter(alarm => 
                (alarm.Interval === interval) &&
                (types.includes(alarm.Order))
            );
            allAlarms.push(...filteredAlarms);
        });        

        dispatch(setFilteredByIntervalAndTypeAlarms(allAlarms));
        
    }, [selectedTypes, alarms, dispatch, selectedIntevals]);
};

export default useFilterAlarmsByIntervalAndType;
