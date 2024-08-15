// Path: strateger-react/src/components/Diary/Diary.js

import React from 'react';
import useDiary from './hooks/useDiary';
import DiaryList from './DiaryList/DiaryList';
import DiaryEntryForm from './DiaryEntryForm/DiaryEntryForm';

const Diary = () => {
  const {
    entries,
    editingEntry,
    handleAddOrUpdateEntry,
    handleDeleteEntry,
    handleEditEntry,
    handleCancelEdit,
  } = useDiary();

  return (
    <div className="grid grid-cols-10 gap-1 bg-african_violet-900">
      <div className="col-span-4 bg-white border border-african_violet-200 p-6 rounded-lg shadow-md">
        <DiaryEntryForm
          onSave={handleAddOrUpdateEntry}
          entry={editingEntry}
          onCancelEdit={handleCancelEdit}
        />
      </div>
      <div className="col-span-6 bg-white border border-african_violet-200 p-6 rounded-lg shadow-md">
        <DiaryList 
          entries={entries} 
          onEdit={handleEditEntry} 
          onDelete={handleDeleteEntry} 
        />
      </div>
    </div>
  );
};

export default Diary;
