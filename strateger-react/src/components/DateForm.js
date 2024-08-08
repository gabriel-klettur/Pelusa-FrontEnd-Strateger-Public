// Path: strateger-react/src/components/DateForm.js

import React from 'react';

const DateForm = ({ date, handleChange, name }) => {
  return (
    <div className="mb-4">
      <label className="block text-african_violet-700 font-semibold mb-2">Date / Time</label>
      <input
        type="datetime-local"
        name={name}
        value={date}
        onChange={handleChange}
        className="mt-1 block w-full border border-african_violet-300 rounded-lg shadow-sm focus:ring focus:ring-african_violet-200 focus:border-african_violet-500 transition duration-300"
      />
    </div>
  );
};

export default DateForm;
