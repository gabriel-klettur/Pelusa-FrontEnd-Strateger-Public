// Path: strateger-react/src/components/Diary/Diary.js

import React from 'react';
import DiaryList from './DiaryList';
import DiaryEntryForm from './DiaryEntryForm';
import { useSelector, useDispatch } from 'react-redux';
import { addEntry, updateEntry, deleteEntry } from '../../slices/diarySlice';

const Diary = () => {
  const entries = useSelector((state) => state.diary.entries);
  const dispatch = useDispatch();

  const handleAddEntry = (entry) => {
    dispatch(addEntry(entry));
  };

  const handleUpdateEntry = (entry) => {
    dispatch(updateEntry(entry));
  };

  const handleDeleteEntry = (id) => {
    dispatch(deleteEntry(id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trading Diary</h2>
      <DiaryEntryForm onSave={handleAddEntry} />
      <DiaryList 
        entries={entries} 
        onEdit={handleUpdateEntry} 
        onDelete={handleDeleteEntry} 
      />
    </div>
  );
};

export default Diary;
