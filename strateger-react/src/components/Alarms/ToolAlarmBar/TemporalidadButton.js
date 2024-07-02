import React from 'react';

const TemporalidadButton = ({ temporalidad, selectedTemporalidad, filteredTemporalidades, toggleTemporalidad }) => {
  return (
    <button 
      className={`px-4 py-2 rounded m-1 ${selectedTemporalidad === temporalidad ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} ${filteredTemporalidades[temporalidad] > 0 ? 'border-4 border-orange-300' : ''}`}
      onClick={() => toggleTemporalidad(temporalidad)}
    >
      {temporalidad}
    </button>
  );
};

export default TemporalidadButton;
