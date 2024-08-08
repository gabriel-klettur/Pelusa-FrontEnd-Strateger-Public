import React from 'react';

const TypeButton = ({ type, selectedTypes, toggleType }) => {
  return (
    <button 
      className={`px-4 py-2 rounded m-1 shadow-md transition duration-300 ${
        selectedTypes.includes(type) 
          ? 'bg-african_violet-500 text-white' 
          : 'bg-pomp_and_power-200 text-english_violet-900'
      } hover:bg-african_violet-600`}
      onClick={() => toggleType(type)}
    >
      {type}
    </button>
  );
};

export default TypeButton;
