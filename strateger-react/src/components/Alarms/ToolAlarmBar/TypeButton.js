// Path: strateger-react/src/components/Alarms/ToolAlarmBar/TypeButton.js

import React from 'react';

const TypeButton = ({ type, selectedTypes, toggleType }) => {
  return (
    <button 
      className={`px-4 py-2 font-semibold text-sm rounded-lg m-1 shadow-md transition-colors duration-200 ${
        selectedTypes.includes(type) 
          ? 'bg-african_violet-500 text-white'
          : 'bg-african_violet-300 text-african_violet-900'
      } hover:bg-african_violet-300`}
      onClick={() => toggleType(type)}
    >
      {type}
    </button>
  );
};

export default TypeButton;
