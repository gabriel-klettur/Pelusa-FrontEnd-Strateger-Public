// Path: strateger-react/src/components/Alarms/AlarmList.js

import React from 'react';
import AlarmTable from './AlarmTable';
import Pagination from './Pagination';

const AlarmList = ({ alarms, loading, error, page, selectedAlarms, hasMore, offset, handlePreviousPage, handleNextPage, handleSelectAlarm }) => {
  if (loading && alarms.length === 0) {
    return <div className="text-center py-4">Cargando alarmas...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar alarmas: {error}</div>;
  }

  if (!alarms || alarms.length === 0) {
    return <div className="text-center py-4">No hay alarmas disponibles.</div>;
  }

  const startIndex = page * 20;
  const endIndex = startIndex + 20;
  const currentAlarms = alarms.slice(startIndex, endIndex);

  return (
    <div className="px-4 py-8 text-sm border-4 border-red-500">
      <AlarmTable alarms={currentAlarms} selectedAlarms={selectedAlarms} handleSelectAlarm={handleSelectAlarm} />
      <Pagination 
        page={page} 
        hasMore={hasMore} 
        endIndex={endIndex} 
        alarmsLength={alarms.length} 
        handlePreviousPage={handlePreviousPage} 
        handleNextPage={handleNextPage} 
      />
      {loading && <div className="text-center py-4">Cargando más alarmas...</div>}
    </div>
  );
};

export default AlarmList;
