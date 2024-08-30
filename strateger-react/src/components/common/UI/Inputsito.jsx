// Path: strateger-react/src/components/common/Inputsito.jsx

import React, { useState } from 'react';

const Inputsito = ({ label, name, value, onChange, type = 'text', className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="mb-4">
      <label className="block text-african_violet-500 font-semibold">{label}:</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${
          isFocused ? 'text-african_violet-200' : 'text-african_violet-500'
        } ${className}`}
      />
    </div>
  );
};

export default Inputsito;
