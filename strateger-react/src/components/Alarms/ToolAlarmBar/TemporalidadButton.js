// Path: strateger-react/src/components/Alarms/ToolAlarmBar/TemporalidadButton.js

import React from 'react';

const TemporalidadButton = ({
  temporalidad,
  selectedTemporalidad,
  filteredTemporalidades,
  toggleTemporalidad,
}) => {
  return (
    <button
      className={`flex-1 py-2 font-semibold text-sm transition-colors duration-200 ${
        selectedTemporalidad === temporalidad
          ? 'bg-african_violet-500 text-white'
          : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'
      } ${
        filteredTemporalidades[temporalidad] > 0
          ? 'border-4 border-african_violet-500'
          : 'border border-transparent'
      }`}
      onClick={() => toggleTemporalidad(temporalidad)}
    >
      {temporalidad}
    </button>
  );
};

export default TemporalidadButton;
