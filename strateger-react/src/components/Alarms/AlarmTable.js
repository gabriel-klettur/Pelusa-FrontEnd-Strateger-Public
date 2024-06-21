// Path: strateger-react/src/components/Alarms/AlarmTable.js

import React from 'react';

const AlarmTable = ({ alarms, selectedAlarms, handleSelectAlarm }) => {
  return (
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
  );
};

export default AlarmTable;
