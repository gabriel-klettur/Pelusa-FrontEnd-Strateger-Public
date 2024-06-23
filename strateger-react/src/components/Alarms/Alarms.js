import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms, setPage, setSelectedAlarms, setAllSelectedAlarms } from '../../slices/alarmSlice';
import AlarmList from './AlarmList';
import ToolAlarmBar from './ToolAlarmBar';

const Alarms = () => {
  const dispatch = useDispatch();
  const { alarms, loading, error, page, selectedAlarms, hasMore, offset } = useSelector((state) => state.alarms);

  const [selectedTemporalidad, setSelectedTemporalidad] = useState('');
  const [selectedTypes, setSelectedTypes] = useState({});

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

  const handleTypeChange = (types) => {
    setSelectedTypes({ ...selectedTypes, [selectedTemporalidad]: types });
  };

  return (
    <>
      <ToolAlarmBar 
        selectedTemporalidad={selectedTemporalidad}
        setSelectedTemporalidad={setSelectedTemporalidad}
        selectedTypes={selectedTypes[selectedTemporalidad] || []}
        setSelectedTypes={handleTypeChange}
      />
      <AlarmList 
        alarms={selectedAlarms} 
        loading={loading} 
        error={error} 
        page={page} 
        selectedAlarms={selectedAlarms} 
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
