// Path: strateger-react/src/components/Diary/hooks/useDiary.js

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiaryEntries, saveDiaryEntry, removeDiaryEntry } from '../../../redux/slices/diarySlice';

const useDiary = () => {
  const entries = useSelector((state) => state.diary.items);
  const dispatch = useDispatch();
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    dispatch(fetchDiaryEntries({ skip: 0, limit: 10 }));
  }, [dispatch]);

  const handleAddOrUpdateEntry = (entry) => {
    if (!entry.id) {
      dispatch(saveDiaryEntry({ ...entry, id: null }))
        .then(() => setEditingEntry(null))
        .catch((error) => console.error('Error creating the diary entry:', error));
    } else {
      dispatch(saveDiaryEntry(entry))
        .then(() => setEditingEntry(null))
        .catch((error) => console.error('Error updating the diary entry:', error));
    }
  };

  const handleDeleteEntry = (id) => {
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

  return {
    entries,
    editingEntry,
    handleAddOrUpdateEntry,
    handleDeleteEntry,
    handleEditEntry,
    handleCancelEdit,
  };
};

export default useDiary;
