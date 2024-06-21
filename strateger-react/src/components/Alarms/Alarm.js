// Path: strateger-react/src/components/Alarms/Alarm.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms, setPage, setSelectedAlarms } from '../../slices/alarmSlice';
import AlarmList from './AlarmList';

const Alarm = () => {
  const dispatch = useDispatch();
  const { alarms, loading, error, page, selectedAlarms, hasMore, offset } = useSelector((state) => state.alarms);

  useEffect(() => {
    if (alarms.length === 0) {
      dispatch(fetchAlarms({ limit: 500, offset: 0 }));
    }
  }, [dispatch, alarms.length]);

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
    <AlarmList 
      alarms={alarms} 
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
  );
};

export default Alarm;
