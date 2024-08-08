import React from 'react';

const AlarmRow = ({ alarm, isSelected, handleSelectAlarm }) => {
  return (
    <tr
      className={`border-b border-b-african_violet-200 cursor-pointer transition duration-300 ${
        isSelected ? 'bg-african_violet-200' : 'hover:bg-pomp_and_power-100'
      }`}
      onClick={() => handleSelectAlarm(alarm)}
    >
      <td className="py-2 px-4 text-english_violet-900">{alarm.id}</td>
      <td className="py-2 px-4 text-english_violet-900">{alarm.Ticker}</td>
      <td className="py-2 px-2 text-english_violet-900">{alarm.Temporalidad}</td>
      <td className="py-2 px-4 text-english_violet-900">{alarm.Entry_Price_Alert}</td>
      <td className="py-2 px-4 text-english_violet-900">{alarm.Exit_Price_Alert}</td>
      <td className="py-2 px-4 text-english_violet-900">{alarm.Time_Alert}</td>
      <td className="py-2 px-4 text-english_violet-900">{alarm.Order}</td>
      <td className="py-2 px-4 text-english_violet-900">{alarm.Strategy}</td>
    </tr>
  );
};

export default AlarmRow;
