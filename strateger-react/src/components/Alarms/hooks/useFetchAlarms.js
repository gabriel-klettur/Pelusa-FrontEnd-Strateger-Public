//Path: strateger-react/src/components/Alarms/hooks/useFetchAlarms.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlarms } from '../../../redux/alarm';

import { selectAlarmsData } from '../../../redux/alarm';

const useFetchAlarms = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectAlarmsData);

    useEffect(() => {
        if (data.length === 0) {
            dispatch(fetchAlarms({ limit: 500, offset: 0 }));
        }
    }, [dispatch, data.length]);                              
};

export default useFetchAlarms;
