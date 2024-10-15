// Path: strateger-react/src/components/Orders/ToolOrderBar/FilterButton.js

import React from 'react';

const FilterButton = ({ label, isActive, onClick }) => (
  <button
    className={`w-full px-4 py-2 font-semibold transition-colors duration-200 ${
      isActive
        ? 'w-full bg-african_violet-500 text-white'
        : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400 border border-transparent'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default FilterButton;
