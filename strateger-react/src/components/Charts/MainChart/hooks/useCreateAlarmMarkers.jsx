import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapAlarmsToMarkers, sortAndFilterMarkers as sortAndFilterAlarmMarkers } from '../components/markers/Alarms';

const useCreateAlarmMarkers = (chartInterval, selectAlarms, setAlarmMarkers) => {
    const dispatch = useDispatch();

    const fullFilteredAlarms = useSelector(selectAlarms);                              //! Selector

    useEffect(() => {
        let newAlarmMarkers = [];
        
        newAlarmMarkers = mapAlarmsToMarkers(fullFilteredAlarms, chartInterval);                                //? Mapeo
        
        const sortedAlarmMarkers = sortAndFilterAlarmMarkers(newAlarmMarkers).sort((a, b) => a.time - b.time);  //? Sort
        dispatch(setAlarmMarkers(sortedAlarmMarkers));                                                          //! Dispatch
    }, [ fullFilteredAlarms, chartInterval, dispatch, setAlarmMarkers]);

}

export default useCreateAlarmMarkers;