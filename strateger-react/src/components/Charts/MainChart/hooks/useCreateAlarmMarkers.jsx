import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapAlarmsToMarkers, sortAndFilterMarkers as sortAndFilterAlarmMarkers } from '../components/markers/Alarms';
import { setAlarmMarkers} from '../../../../redux/charts';
import { selectFilteredByIntervalAndTypeAlarms } from '../../../../redux/alarm';

const useCreateAlarmMarkers = (chartInterval) => {
    const dispatch = useDispatch();

    const fullFilteredAlarms = useSelector(selectFilteredByIntervalAndTypeAlarms);

    useEffect(() => {
        let newAlarmMarkers = [];
        
        newAlarmMarkers = mapAlarmsToMarkers(fullFilteredAlarms, chartInterval);
        
        const sortedAlarmMarkers = sortAndFilterAlarmMarkers(newAlarmMarkers).sort((a, b) => a.time - b.time);
        dispatch(setAlarmMarkers(sortedAlarmMarkers));
    }, [ fullFilteredAlarms, chartInterval, dispatch]);

}

export default useCreateAlarmMarkers;