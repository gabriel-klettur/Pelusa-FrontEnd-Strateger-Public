// Path: strateger-react/src/components/Alarms/ToolAlarmBar/TemporalidadButton.js

import React from 'react';

const IntervalButton = ({
  temporalidad,
  selectedTemporalidad,  
  selectedIntervalAndTypes,
  toggleTemporalidad,
}) => {
  return (
    <button
      className={` font-semibold text-base py-1 px-2 hover:bg-african_violet-400 hover:rounded-lg
      ${
        selectedTemporalidad === temporalidad
          ? 'text-african_violet-100'
          : 'text-african_violet-900'
      } ${
        selectedIntervalAndTypes[temporalidad]?.length > 0
          ? 'underline decoration-2'
          : ''
      }`}
      onClick={() => toggleTemporalidad(temporalidad)}
    >
      {temporalidad}
    </button>
  );
};

export default IntervalButton;
