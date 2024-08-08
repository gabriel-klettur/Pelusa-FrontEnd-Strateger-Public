import React, { useState, useEffect } from 'react';
import AlarmTable from './AlarmTable/AlarmTable';
import Pagination from './Pagination/Pagination';
import LoadingOverlay from '../common/LoadingOverlay/LoadingOverlay';

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

  if (error) {
    return <div className="text-center py-4 text-red-500">Error al cargar alarmas: {error}</div>;
  }

  const currentAlarms = sortedAlarms.slice(page * 20, (page * 20) + 20);

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} />
      <div className="px-4 text-sm bg-african_violet-100 rounded-lg shadow-md">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setViewType('alarms')}
            className={`px-4 py-2 rounded-lg shadow-md transition duration-300 ${
              viewType === 'alarms' ? 'bg-african_violet-500 text-white' : 'bg-pomp_and_power-200 text-english_violet-900'
            } hover:bg-african_violet-600`}
          >
            Alarms
          </button>
          <button
            onClick={() => setViewType('selectedAlarms')}
            className={`px-4 py-2 rounded-lg shadow-md transition duration-300 ${
              viewType === 'selectedAlarms' ? 'bg-african_violet-500 text-white' : 'bg-pomp_and_power-200 text-english_violet-900'
            } hover:bg-african_violet-600`}
          >
            Selected Alarms
          </button>
          <button
            onClick={() => setViewType('allSelectedAlarms')}
            className={`px-4 py-2 rounded-lg shadow-md transition duration-300 ${
              viewType === 'allSelectedAlarms' ? 'bg-african_violet-500 text-white' : 'bg-pomp_and_power-200 text-english_violet-900'
            } hover:bg-african_violet-600`}
          >
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

export default AlarmList;
