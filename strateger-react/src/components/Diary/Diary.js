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
      <div className='grid grid-cols-10 gap-4 border border-gray-200 p-4 rounded-lg'>
        <div className='col-span-4'>
          <DiaryEntryForm onSave={handleAddEntry} />
        </div>
        <div className='col-span-6'>
          <DiaryList 
            entries={entries} 
            onEdit={handleUpdateEntry} 
            onDelete={handleDeleteEntry} 
          />
        </div>
      </div>
    </div>
  );
};

export default Diary;
