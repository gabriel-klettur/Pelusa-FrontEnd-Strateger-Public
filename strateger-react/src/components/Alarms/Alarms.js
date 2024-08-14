// Alarms.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms, setPage, setSelectedAlarms, setAllSelectedAlarms, selectSelectedTemporalidad, selectSelectedTypes } from '../../redux/slices/alarmSlice';
import AlarmList from './AlarmList';


const Alarms = () => {
  const dispatch = useDispatch();
  const { alarms, loading, error, page, selectedAlarms, allSelectedAlarms, hasMore, offset } = useSelector((state) => state.alarms);
  const selectedTemporalidad = useSelector(selectSelectedTemporalidad);
  const selectedTypes = useSelector(selectSelectedTypes);

  useEffect(() => {
    if (alarms.length === 0) {
      dispatch(fetchAlarms({ limit: 500, offset: 0 }));
    }
  }, [dispatch, alarms.length]);

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

  useEffect(() => {
    if (selectedTemporalidad) {
      const types = selectedTypes[selectedTemporalidad] || [];
      const filteredAlarms = alarms.filter(alarm => 
        (selectedTemporalidad === '' || alarm.Temporalidad === selectedTemporalidad) &&
        (types.length === 0 || types.includes(alarm.Order))
      );
      dispatch(setSelectedAlarms(filteredAlarms));
    } else {
      dispatch(setSelectedAlarms([]));
    }
  }, [selectedTemporalidad, selectedTypes, alarms, dispatch]);

  const handlePreviousPage = () => {
    dispatch(setPage(Math.max(page - 1, 0)));
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage * 20 >= alarms.length && hasMore) {
      dispatch(fetchAlarms({ limit: 500, offset }));
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
      <AlarmList 
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
