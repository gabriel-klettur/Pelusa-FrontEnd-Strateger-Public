import React from 'react';

const TemporalidadButton = ({ temporalidad, selectedTemporalidad, filteredTemporalidades, toggleTemporalidad }) => {
  return (
    <button 
      className={`px-4 py-2 rounded m-1 shadow-md transition duration-300 ${
        selectedTemporalidad === temporalidad 
          ? 'bg-african_violet-500 text-white' 
          : 'bg-pomp_and_power-200 text-english_violet-900'
      } ${
        filteredTemporalidades[temporalidad] > 0 
          ? 'border-4 border-pomp_and_power-300' 
          : ''
      } hover:bg-african_violet-600`}
      onClick={() => toggleTemporalidad(temporalidad)}
    >
      {temporalidad}
    </button>
  );
};

export default TemporalidadButton;
