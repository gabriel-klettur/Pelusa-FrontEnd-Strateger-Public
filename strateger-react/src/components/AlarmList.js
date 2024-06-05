import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms, setPage, setSelectedAlarms } from '../slices/alarmSlice';
import { setChartParameters } from '../slices/chartSlice'; // Import the new action

const AlarmList = () => {
  const dispatch = useDispatch();
  const { alarms, loading, error, page, selectedAlarms } = useSelector((state) => state.alarms);

  useEffect(() => {
    dispatch(fetchAlarms(page));
  }, [dispatch, page]);

  const handlePreviousPage = () => {
    dispatch(setPage(Math.max(page - 1, 0)));
  };

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };

  const handleSelectAlarm = (alarm) => {
    const isSelected = selectedAlarms.some((a) => a.id === alarm.id);

    let newSelectedAlarms;
    if (isSelected) {
      newSelectedAlarms = selectedAlarms.filter((a) => a.id !== alarm.id);
    } else {
      newSelectedAlarms = [...selectedAlarms, alarm];

      if (alarm.Entry_Price_Alert) {
        let nextExitAlarm = null;
        const alarmIndex = alarms.findIndex(a => a.id === alarm.id);

        for (let i = alarmIndex; i >= 0; i--) {
          if (alarms[i].Exit_Price_Alert) {
            nextExitAlarm = alarms[i];
            break;
          }
        }

        if (nextExitAlarm) {
          newSelectedAlarms = [...newSelectedAlarms, nextExitAlarm];
        }
      }

      if (alarm.Exit_Price_Alert) {
        let previousEntryAlarm = null;
        const alarmIndex = alarms.findIndex(a => a.id === alarm.id);

        for (let i = alarmIndex; i < alarms.length; i++) {
          if (alarms[i].Entry_Price_Alert) {
            previousEntryAlarm = alarms[i];
            break;
          }
        }

        if (previousEntryAlarm) {
          newSelectedAlarms = [previousEntryAlarm, ...newSelectedAlarms];
        }
      }
    }

    dispatch(setSelectedAlarms(newSelectedAlarms));

    if (newSelectedAlarms.length > 1) {
      const sortedAlarms = [...newSelectedAlarms].sort((a, b) => new Date(a.Time_Alert) - new Date(b.Time_Alert));
      const startDate = sortedAlarms[0].Time_Alert;
      const endDate = sortedAlarms[sortedAlarms.length - 1].Time_Alert;
      const temporalidad = alarm.Temporalidad;

      dispatch(setChartParameters({ startDate, endDate, temporalidad }));
    }
  };

  if (loading) {
    return <div className="text-center py-4">Cargando alarmas...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar alarmas: {error}</div>;
  }

  if (!alarms || alarms.length === 0) {
    return <div className="text-center py-4">No hay alarmas disponibles.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="py-2 px-4 border-r">ID</th>
            <th className="py-2 px-4 border-r">Ticker</th>
            <th className="py-2 px-2 border-r">Temporalidad</th>
            <th className="py-2 px-4 border-r">Precio de Entrada</th>
            <th className="py-2 px-4 border-r">Precio de Salida</th>
            <th className="py-2 px-4 border-r">Hora de Alerta</th>
            <th className="py-2 px-4 border-r">Orden</th>
            <th className="py-2 px-4">Estrategia</th>
          </tr>
        </thead>
        <tbody>
          {alarms.map((alarm) => (
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
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AlarmList;

