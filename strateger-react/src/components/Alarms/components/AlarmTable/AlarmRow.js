//Path: src/components/Alarms/components/AlarmTable/AlarmRow.js

import React from 'react';

/**
 * Represents a row in the AlarmTable component.
 *
 * @param {Object} props - The props for the AlarmRow component.
 * @param {Object} props.alarm - The alarm object.
 * @param {string} props.rowClassName - The CSS class for the row.
 * @param {Function} props.handleSelectAlarm - The function to handle selecting an alarm.
 * @returns {JSX.Element} The rendered AlarmRow component.
 */
const AlarmRow = ({ alarm, rowClassName, handleSelectAlarm }) => {
  
  const alarmValues = [
    alarm.id,
    alarm.Ticker,
    alarm.Temporalidad,
    alarm.Price_Alert,
    alarm.Time_Alert,
    alarm.Order,
    alarm.Strategy
  ];

  return (
    <tr
      className={`border-b transition-colors duration-200 hover:bg-african_violet-700 cursor-pointer ${rowClassName}`}
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
