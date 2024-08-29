// useSetAllSelectedAlarms.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredByIntervalAndTypeAlarms, removeSelectedTypes } from '../../../redux/slices/alarmSlice';

const useFilterAlarmsByIntervalAndType = () => {
    const dispatch = useDispatch();
    const alarms = useSelector((state) => state.alarms.alarms);
    const selectedTemporalidad = useSelector((state) => state.alarms.selectedTemporalidad);
    const selectedTypes = useSelector((state) => state.alarms.selectedTypes);

    useEffect(() => {

        const allAlarms = [];

        // Verificación adicional para asegurar que selectedTypes no solo tenga claves, sino que también contenga arrays con elementos
        const hasValidTypes = Object.keys(selectedTypes).some(key => selectedTypes[key].length > 0);    
        
        if (Object.keys(selectedTypes).length === 0 || selectedTemporalidad === '' || !hasValidTypes) {                                    
            
            if (Object.keys(selectedTypes).length > 0) {
                Object.keys(selectedTypes).forEach(temporalidad => {
                    dispatch(removeSelectedTypes(temporalidad));
                    dispatch(setFilteredByIntervalAndTypeAlarms(allAlarms));
                });
            }

            return;
        }

        console.log('Filtrando por Type de alarma:', selectedTypes);        
        
        // Iterate over each temporalidad and filter alarms
        Object.keys(selectedTypes).forEach(temporalidad => {

            if (temporalidad === '' || selectedTypes[temporalidad].length === 0) {                
                dispatch(removeSelectedTypes(temporalidad)); // Esto eliminará la clave con array vacío
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
