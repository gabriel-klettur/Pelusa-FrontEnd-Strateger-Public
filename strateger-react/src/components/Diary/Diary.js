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

  const handleAddOrUpdateEntry = (entry) => {
    console.log('handleAddOrUpdateEntry called with:', entry);

    if (!entry.id) {
      // Para creación, asegurar que no haya id
      dispatch(saveDiaryEntry({ ...entry, id: null }))
        .then(() => {
          console.log('Entry created successfully:', entry);
          setEditingEntry(null);
        })
        .catch((error) => console.error('Error creating the diary entry:', error));
    } else {
      dispatch(saveDiaryEntry(entry))
        .then(() => {
          console.log('Entry updated successfully:', entry);
          setEditingEntry(null);
        })
        .catch((error) => console.error('Error updating the diary entry:', error));
    }
  };

  const handleDeleteEntry = (id) => {
    console.log('handleDeleteEntry called with id:', id);
    dispatch(removeDiaryEntry(id))
      .catch((error) => console.error('Error deleting the diary entry:', error));
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
            onSave={handleAddOrUpdateEntry}
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
