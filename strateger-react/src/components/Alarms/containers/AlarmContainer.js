//Path: strateger-react/src/components/Alarms/containers/AlarmContainer.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AlarmTable from '../components/AlarmTable/AlarmTable';
import Pagination from '../components/AlarmTable/Pagination';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

import useFetchAlarms from '../hooks/useFetchAlarms';  
import useFilterAlarmsByIntervalAndType from '../hooks/useFilterAlarmsByIntervalAndType';
import useFilterAlarmsByInterval from '../hooks/useFilterAlarmsByInterval';

import { setSelectedAlarms } from '../../../redux/slices/alarmSlice';

const AlarmContainer = () => {
  
  const dispatch = useDispatch();  // Hook de Redux. Permite despachar acciones de Redux.
  const { alarms, page, selectedAlarms, allSelectedAlarms,
  hasMore, loading, error } = useSelector((state) => state.alarms);  // Hook de Redux. Permite acceder al estado de Redux. 

  const [viewType, setViewType] = useState('alarms');
  const [sortedAlarms, setSortedAlarms] = useState([]);

  useFetchAlarms();                       // Hook Personalizado. Cargar alarmas al montar el componente  
  useFilterAlarmsByInterval();            // Hook Personalizado. Actualizar las alarmas según la temporalidad seleccionada
  useFilterAlarmsByIntervalAndType();     // Hook Personalizado. Actualizar las alarmas seleccionadas segun los tipos seleccionados

  //------------------------------------------------------------- Pagination Methods -------------------------------------------------------------
  const currentAlarms = sortedAlarms.slice(page * 20, (page * 20) + 20);
  
  const handleSelectAlarm = (alarm) => {
    let newSelectedAlarms;    
    const isSelected = selectedAlarms.some((a) => a.id === alarm.id);
    if (isSelected) {
      newSelectedAlarms = selectedAlarms.filter((a) => a.id !== alarm.id);
    } else {
      newSelectedAlarms = [...selectedAlarms, alarm];
    }
    dispatch(setSelectedAlarms(newSelectedAlarms));
  };

  //------------------------------------------------------------- Sorting Alarms -------------------------------------------------------------
  useEffect(() => {
    let listToSort = [];
    switch (viewType) {
      case 'selectedAlarms':
        listToSort = selectedAlarms;
        break;
      case 'allSelectedAlarms':
        listToSort = allSelectedAlarms;
        break;
      default:
        listToSort = alarms;
    }
    const sortedList = [...listToSort].sort((a, b) => b.id - a.id);
    setSortedAlarms(sortedList);
  }, [viewType, alarms, selectedAlarms, allSelectedAlarms]);


  //------------------------------------------------------------- Render -------------------------------------------------------------
  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar alarmas: {error}</div>;
  }  

  //------------------------------------------------------------- JSX -------------------------------------------------------------
  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} />
      <div className="text-sm">
        <div className="flex justify-start bg-african_violet-300">
          <button onClick={() => setViewType('alarms')} className={`px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${viewType === 'alarms' ? 'bg-african_violet-500 text-white' : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'}`}>
            Alarms
          </button>
          <button onClick={() => setViewType('selectedAlarms')} className={`px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${viewType === 'selectedAlarms' ? 'bg-african_violet-500 text-white' : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'}`}>
            Filtered by Interval
          </button>
          <button onClick={() => setViewType('allSelectedAlarms')} className={`px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${viewType === 'allSelectedAlarms' ? 'bg-african_violet-500 text-white' : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'}`}>
            Filtered by Interval and Type
          </button>
        </div>
        <AlarmTable alarms={currentAlarms} selectedAlarms={selectedAlarms} handleSelectAlarm={handleSelectAlarm} />
        <Pagination 
          page={page} 
          hasMore={hasMore} 
          endIndex={page * 20 + currentAlarms.length} 
          alarmsLength={sortedAlarms.length} 
          
        />
      </div>
    </div>
  );
};

export default AlarmContainer;
