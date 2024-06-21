// Path: strateger-react/src/components/AlarmList.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms, setPage, setSelectedAlarms } from '../slices/alarmSlice';


const AlarmList = () => {
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
    <div className="container mx-auto px-4 py-8 text-sm">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="py-2 px-4 border-r">ID</th>
            <th className="py-2 px-4 border-r">Ticker</th>
            <th className="py-2 px-2 border-r">T</th>
            <th className="py-2 px-4 border-r">Entry Price</th>
            <th className="py-2 px-4 border-r">Exit Price</th>
            <th className="py-2 px-4 border-r">Time</th>
            <th className="py-2 px-4 border-r">Type</th>
            <th className="py-2 px-4">Estrategia</th>
          </tr>
        </thead>
        <tbody>
          {currentAlarms.map((alarm) => (
            <tr
              key={alarm.id}
              className={`border-b hover:bg-gray-50 cursor-pointer ${selectedAlarms.some((a) => a.id === alarm.id) ? 'bg-gray-200' : ''}`}
              onClick={() => handleSelectAlarm(alarm)}
            >
              <td className="py-2 px-4 border-r">{alarm.id}</td>
              <td className="py-2 px-4 border-r">{alarm.Ticker}</td>
              <td className="py-2 px-2 border-r">{alarm.Temporalidad}</td>
              <td className="py-2 px-4 border-r">{alarm.Entry_Price_Alert}</td>
              <td className="py-2 px-4 border-r">{alarm.Exit_Price_Alert}</td>
              <td className="py-2 px-4 border-r">{alarm.Time_Alert}</td>
              <td className="py-2 px-4 border-r">{alarm.Order}</td>
              <td className="py-2 px-4">{alarm.Strategy}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          onClick={handlePreviousPage}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNextPage}
          disabled={!hasMore && endIndex >= alarms.length}
        >
          Siguiente
        </button>
      </div>
      {loading && <div className="text-center py-4">Cargando más alarmas...</div>}
    </div>
  );
};

export default AlarmList;
