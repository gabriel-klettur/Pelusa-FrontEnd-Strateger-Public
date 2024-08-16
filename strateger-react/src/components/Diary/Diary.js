// Path: strateger-react/src/components/Diary/Diary.js

import React from 'react';
import useDiary from './hooks/useDiary';
import DiaryList from './DiaryList/DiaryList';
import DiaryEntryForm from './DiaryEntryForm/DiaryEntryForm';

import Ventanita from '../common/Ventanita';

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
    <div className="grid grid-cols-10 gap-1 bg-african_violet-200">
      <div className="col-span-4">        {/* COLUMN LEFT */}
        
            <DiaryEntryForm
              onSave={handleAddOrUpdateEntry}
              entry={editingEntry}
              onCancelEdit={handleCancelEdit}
            />
          
                
      </div>      
      <div className="col-span-6 p-2">        {/* COLUMN RIGHT */}
        <Ventanita
           titulo="Diary Entries"
           contenido={
            <DiaryList 
              entries={entries} 
              onEdit={handleEditEntry} 
              onDelete={handleDeleteEntry} 
            />
           }
        />        
      </div>
    </div>
  );
};

export default Diary;
