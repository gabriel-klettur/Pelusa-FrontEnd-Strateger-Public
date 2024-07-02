import React from 'react';

const FilterButton = ({ label, isActive, onClick }) => (
  <button 
    className={`px-4 py-2 rounded m-1 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default FilterButton;
