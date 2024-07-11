// Path: strateger-react/src/components/Diary/DiaryEntryForm/ReferencesForm/SelectedIds.js

import React from 'react';

const SelectedIds = ({ selectedIds }) => {
  return (
    <div className="mt-4 mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Selected IDs</label>
      <input
        type="text"
        value={selectedIds.join(';')}
        readOnly
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
      />
    </div>
  );
};

export default SelectedIds;
