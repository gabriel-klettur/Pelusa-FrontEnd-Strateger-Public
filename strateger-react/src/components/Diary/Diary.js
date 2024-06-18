// Path: strateger-react/src/components/Diary/Diary.js

import React, { useState } from 'react';
import DiaryList from './DiaryList';
import DiaryEntryForm from './DiaryEntryForm';
import { useSelector, useDispatch } from 'react-redux';
import { addEntry, updateEntry, deleteEntry } from '../../slices/diarySlice';

const Diary = () => {
  const entries = useSelector((state) => state.diary.entries);
  const dispatch = useDispatch();
  const [editingEntry, setEditingEntry] = useState(null);

  const handleAddEntry = (entry) => {
    dispatch(addEntry(entry));
    setEditingEntry(null); // Reset editing state after adding
  };

  const handleUpdateEntry = (entry) => {
    dispatch(updateEntry(entry));
    setEditingEntry(null); // Reset editing state after updating
  };

  const handleDeleteEntry = (id) => {
    dispatch(deleteEntry(id));
  };

  const handleEditEntry = (id) => {
    const entry = entries.find((entry) => entry.id === id);
    setEditingEntry(entry);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trading Diary</h2>
      <div className='grid grid-cols-10 gap-4 border border-gray-200 p-4 rounded-lg'>
        <div className='col-span-4 border border-gray-200 p-4 rounded-lg'>
          <DiaryEntryForm
            onSave={editingEntry ? handleUpdateEntry : handleAddEntry}
            entry={editingEntry}
            onCancelEdit={handleCancelEdit}
          />
        </div>
        <div className='col-span-6 border border-gray-200 p-4 rounded-lg'>
          <DiaryList 
            entries={entries} 
            onEdit={handleEditEntry} 
            onDelete={handleDeleteEntry} 
          />
        </div>
      </div>
    </div>
  );
};

export default Diary;
