//Path: strateger-react/src/components/Alarms/AlarmTable/AlarmTable.js

import React from 'react';
import AlarmRow from './AlarmRow';

const AlarmTable = ({ alarms, selectedAlarms, handleSelectAlarm }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead>
        <tr className="w-full bg-african_violet-500 text-white">
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
