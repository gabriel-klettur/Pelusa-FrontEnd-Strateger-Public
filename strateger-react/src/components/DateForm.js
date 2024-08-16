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
          w-64 
          bg-african_violet-500
          transition duration-300
          text-white
        "
      />
    </div>
  );
};

export default DateForm;
