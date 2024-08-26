// Path: strateger-react/src/components/Alarms/AlarmTable/AlarmRow.js

import React from 'react';

const AlarmRow = ({ alarm, isSelected, handleSelectAlarm }) => {
  
  const alarmValues = [
    alarm.id,
    alarm.Ticker,
    alarm.Temporalidad,
    alarm.Entry_Price_Alert,
    alarm.Exit_Price_Alert,
    alarm.Time_Alert,
    alarm.Order,
    alarm.Strategy
  ];

  return (
    <tr
      className={`border-b transition-colors duration-200 hover:bg-african_violet-700 cursor-pointer ${
        isSelected ? 'bg-african_violet-400 text-white' : 'bg-white text-african_violet-400'
      }`}
      onClick={() => handleSelectAlarm(alarm)}
    >
      {alarmValues.map((value, index) => (
        <td key={index} className="py-2 px-4 border-r">
          {value}
        </td>
      ))}
    </tr>
  );
};

export default AlarmRow;
