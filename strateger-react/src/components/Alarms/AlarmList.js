// Path: strateger-react/src/components/Alarms/AlarmList.js

import React, { useState, useEffect } from 'react';
import AlarmTable from './AlarmTable';
import Pagination from './Pagination';

const AlarmList = ({ alarms, loading, error, page, selectedAlarms, allSelectedAlarms, hasMore, offset, handlePreviousPage, handleNextPage, handleSelectAlarm }) => {
  const [viewType, setViewType] = useState('alarms');
  const [sortedAlarms, setSortedAlarms] = useState([]);

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

  if (loading && alarms.length === 0) {
    return <div className="text-center py-4">Cargando alarmas...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar alarmas: {error}</div>;
  }

  if (!alarms || alarms.length === 0) {
    return <div className="text-center py-4">No hay alarmas disponibles.</div>;
  }

  const currentAlarms = sortedAlarms.slice(page * 20, (page * 20) + 20);

  return (
    <div className="px-4 py-8 text-sm border-4 border-red-500">
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={() => setViewType('alarms')} className={`px-4 py-2 rounded ${viewType === 'alarms' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          Alarms
        </button>
        <button onClick={() => setViewType('selectedAlarms')} className={`px-4 py-2 rounded ${viewType === 'selectedAlarms' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          Selected Alarms
        </button>
        <button onClick={() => setViewType('allSelectedAlarms')} className={`px-4 py-2 rounded ${viewType === 'allSelectedAlarms' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
          All Selected Alarms
        </button>
      </div>
      <AlarmTable alarms={currentAlarms} selectedAlarms={selectedAlarms} handleSelectAlarm={handleSelectAlarm} />
      <Pagination 
        page={page} 
        hasMore={hasMore} 
        endIndex={page * 20 + currentAlarms.length} 
        alarmsLength={sortedAlarms.length} 
        handlePreviousPage={handlePreviousPage} 
        handleNextPage={handleNextPage} 
      />
      {loading && <div className="text-center py-4">Cargando más alarmas...</div>}
    </div>
  );
};

export default AlarmList;
