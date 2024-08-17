// Path: strateger-react/src/components/Alarms/AlarmList/AlarmList.js

import React, { useState, useEffect } from 'react';
import AlarmTable from '../components/AlarmTable';
import Pagination from '../components/Pagination';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

const AlarmListContainer = ({ alarms, loading, error, page, selectedAlarms, allSelectedAlarms, hasMore, offset, handlePreviousPage, handleNextPage, handleSelectAlarm }) => {
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

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar alarmas: {error}</div>;
  }

  const currentAlarms = sortedAlarms.slice(page * 20, (page * 20) + 20);

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} />
      <div className="text-sm">
        <div className="flex justify-start bg-african_violet-300">
          <button onClick={() => setViewType('alarms')} className={`px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${viewType === 'alarms' ? 'bg-african_violet-500 text-white' : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'}`}>
            Alarms
          </button>
          <button onClick={() => setViewType('selectedAlarms')} className={`px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${viewType === 'selectedAlarms' ? 'bg-african_violet-500 text-white' : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'}`}>
            Selected Alarms
          </button>
          <button onClick={() => setViewType('allSelectedAlarms')} className={`px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${viewType === 'allSelectedAlarms' ? 'bg-african_violet-500 text-white' : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'}`}>
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
      </div>
    </div>
  );
};

export default AlarmListContainer;
