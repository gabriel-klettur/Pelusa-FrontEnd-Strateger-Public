import React from 'react';
import AlarmRow from './AlarmRow';

const AlarmTable = ({ alarms, selectedAlarms, handleSelectAlarm }) => {
  return (
    <table className="min-w-full bg-african_violet-100 rounded-lg shadow-md">
      <thead>
        <tr className="w-full bg-african_violet-300">
          <th className="py-2 px-4 text-english_violet-900">ID</th>
          <th className="py-2 px-4 text-english_violet-900">Ticker</th>
          <th className="py-2 px-2 text-english_violet-900">T</th>
          <th className="py-2 px-4 text-english_violet-900">Entry Price</th>
          <th className="py-2 px-4 text-english_violet-900">Exit Price</th>
          <th className="py-2 px-4 text-english_violet-900">Time</th>
          <th className="py-2 px-4 text-english_violet-900">Type</th>
          <th className="py-2 px-4 text-english_violet-900">Estrategia</th>
        </tr>
      </thead>
      <tbody>
        {alarms.map((alarm) => (
          <AlarmRow
            key={alarm.id}
            alarm={alarm}
            isSelected={selectedAlarms.some((a) => a.id === alarm.id)}
            handleSelectAlarm={handleSelectAlarm}
          />
        ))}
      </tbody>
    </table>
  );
};

export default AlarmTable;
