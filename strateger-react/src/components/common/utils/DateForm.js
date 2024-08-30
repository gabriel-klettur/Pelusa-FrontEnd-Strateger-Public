// Path: strateger-react/src/components/DateForm.js

import React from 'react';

const DateForm = ({ date, handleChange, name }) => {
  return (
    <div className="">      
      <input
        type="datetime-local"
        name={name}
        value={date}
        onChange={handleChange}
        className="
          w-full
          p-2
          bg-african_violet-200
          text-african_violet-800
          transition duration-300
          text-white
          rounded-md
          
        "
      />
      
    </div>
  );
};

export default DateForm;
