// Path: strateger-react/src/components/Alarms/Alarms.js
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms, setPage, setSelectedAlarms } from '../../redux/slices/alarmSlice'; // Asegúrate de importar fetchAlarms aquí

import useFetchAlarms from './hooks/useFetchAlarms';
import useSetAllSelectedAlarms from './hooks/useSetAllSelectedAlarms';
import useSetSelectedAlarms from './hooks/useSetSelectedAlarms';

import AlarmListContainer from './containers/AlarmContainer';

const Alarms = () => {
  const dispatch = useDispatch();
  const { alarms, loading, error, page, selectedAlarms, allSelectedAlarms, hasMore, offset } = useSelector((state) => state.alarms);

  useFetchAlarms();             // Cargar alarmas al montar el componente
  useSetAllSelectedAlarms();    // Actualiuzar las alarmas seleccionadas segun los tipos seleccionados
  useSetSelectedAlarms();       // Actualizar las alarmas según la temporalidad seleccionada

  const handlePreviousPage = () => {
    dispatch(setPage(Math.max(page - 1, 0)));
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage * 20 >= alarms.length && hasMore) {
      dispatch(fetchAlarms({ limit: 500, offset })); // Ahora fetchAlarms estará definido
    }
    dispatch(setPage(nextPage));
  };

  const handleSelectAlarm = (alarm) => {
    const isSelected = selectedAlarms.some((a) => a.id === alarm.id);

    let newSelectedAlarms;
    if (isSelected) {
      newSelectedAlarms = selectedAlarms.filter((a) => a.id !== alarm.id);
    } else {
      newSelectedAlarms = [...selectedAlarms, alarm];
    }

    dispatch(setSelectedAlarms(newSelectedAlarms));
  };

  return (
    <>      
      <AlarmListContainer 
        alarms={alarms} 
        loading={loading} 
        error={error} 
        page={page} 
        selectedAlarms={selectedAlarms} 
        allSelectedAlarms={allSelectedAlarms} 
        hasMore={hasMore} 
        offset={offset} 
        handlePreviousPage={handlePreviousPage} 
        handleNextPage={handleNextPage} 
        handleSelectAlarm={handleSelectAlarm} 
      />
    </>
  );
};

export default Alarms;
