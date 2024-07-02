import React from 'react';

const TypeButton = ({ type, selectedTypes, toggleType }) => {
  return (
    <button 
      className={`px-4 py-2 rounded m-1 ${selectedTypes.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
      onClick={() => toggleType(type)}
    >
      {type}
    </button>
  );
};

export default TypeButton;
