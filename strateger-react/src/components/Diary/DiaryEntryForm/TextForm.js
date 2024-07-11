// Path: strateger-react/src/components/Diary/DiaryEntryForm/TextForm.js

import React from 'react';

const TextForm = ({ text, handleChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Text</label>
      <textarea
        name="text"
        value={text}
        onChange={handleChange}
        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
        rows="4"
      ></textarea>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default TextForm;
