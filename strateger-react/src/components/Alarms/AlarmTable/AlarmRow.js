import React from 'react';

const AlarmRow = ({ alarm, isSelected, handleSelectAlarm }) => {
  return (
    <tr
      className={`border-b hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-gray-200' : ''}`}
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
  );
};

export default AlarmRow;
