//Path: src/components/Alarms/hooks/useFetchAlarms.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAlarms } from '../../../redux/alarm';
import { selectAlarmsData } from '../../../redux/alarm';

const useFetchAlarms = (pollingInterval = null) => {
    const dispatch = useDispatch();
    const data = useSelector(selectAlarmsData);

    useEffect(() => {
        // Fetch inicial si no hay datos
        if (data.length === 0) {
            dispatch(fetchAlarms({ limit: 500, offset: 0 }));
        }

        // Configurar polling si se pasa un intervalo
        let intervalId;
        if (pollingInterval) {
            intervalId = setInterval(() => {
                dispatch(fetchAlarms({ limit: 100, offset: 0 }));
            }, pollingInterval);
        }

        // Limpiar el intervalo cuando se desmonte el componente
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [dispatch, data.length, pollingInterval]);
};

export default useFetchAlarms;
