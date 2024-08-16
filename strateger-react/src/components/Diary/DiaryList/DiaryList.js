// Path: strateger-react/src/components/Diary/DiaryList/DiaryList.js

import React from 'react';
import DiaryEntry from './DiaryEntry';

import Ventanita from '../../common/Ventanita';

const DiaryList = ({ entries, onEdit, onDelete }) => {
  return (
    <div>
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        entries.map((entry) => (
          <div className='mb-4'>

            <Ventanita
              titulo={`Diary Entry ${entry.id}`}
              contenido={
                <DiaryEntry
                  key={`diary-entry-${entry.id}`}
                  entry={entry}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              }
            />
          </div>
        ))
      )}
    </div>
  );
};

export default DiaryList;
