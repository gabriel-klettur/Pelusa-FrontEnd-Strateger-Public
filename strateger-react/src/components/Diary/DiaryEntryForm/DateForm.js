// Path: strateger-react/src/components/Diary/DiaryEntryForm/DateForm.js

import React from 'react';

const DateForm = ({ date, handleChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Date</label>
      <input
        type="datetime-local"
        name="date"
        value={date}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
      />
    </div>
  );
};

export default DateForm;
