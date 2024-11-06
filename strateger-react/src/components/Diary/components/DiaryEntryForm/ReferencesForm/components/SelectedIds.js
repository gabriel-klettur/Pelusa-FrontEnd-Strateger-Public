// Path: strateger-react/src/components/Diary/DiaryEntryForm/ReferencesForm/SelectedIds.js

import React from 'react';

const SelectedIds = ({ selectedIds }) => {
  return (
    <div className="">      
      <input
        type="text"
        value={selectedIds.join(';')}
        readOnly
        className="p-2 w-full rounded-md text-sm text-african_violet-800 bg-african_violet-200"
      />
    </div>
  );
};

export default SelectedIds;
