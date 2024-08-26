// useFetchAlarms.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlarms } from '../../../redux/slices/alarmSlice';

const useFetchAlarms = () => {
    const dispatch = useDispatch();
    const alarms = useSelector((state) => state.alarms.alarms);

    useEffect(() => {
        if (alarms.length === 0) {
            dispatch(fetchAlarms({ limit: 500, offset: 0 }));
        }
    }, [dispatch, alarms.length]);
};

export default useFetchAlarms;
