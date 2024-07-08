import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiaryList from './DiaryList/DiaryList';
import DiaryEntryForm from './DiaryEntryForm/DiaryEntryForm';
import { fetchDiaryEntries, saveDiaryEntry, removeDiaryEntry } from '../../slices/diarySlice';

const Diary = () => {
  const entries = useSelector((state) => state.diary.items);
  const dispatch = useDispatch();
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    dispatch(fetchDiaryEntries({ skip: 0, limit: 10 }));
  }, [dispatch]);

  const handleAddEntry = (entry) => {
    dispatch(saveDiaryEntry(entry))
      .then(() => setEditingEntry(null));
  };

  const handleUpdateEntry = (entry) => {
    dispatch(saveDiaryEntry(entry))
      .then(() => setEditingEntry(null));
  };

  const handleDeleteEntry = (id) => {
    dispatch(removeDiaryEntry(id));
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
      <div className="grid grid-cols-10 gap-4 border border-gray-200 p-4 rounded-lg">
        <div className="col-span-4 border border-gray-200 p-4 rounded-lg">
          <DiaryEntryForm
            onSave={editingEntry ? handleUpdateEntry : handleAddEntry}
            entry={editingEntry}
            onCancelEdit={handleCancelEdit}
          />
        </div>
        <div className="col-span-6 border border-gray-200 p-4 rounded-lg">
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
