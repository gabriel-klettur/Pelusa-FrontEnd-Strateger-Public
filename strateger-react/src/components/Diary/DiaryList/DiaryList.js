//Path: strateger-react/src/components/Diary/DiaryList.js

import React from 'react';
import DiaryEntry from './DiaryEntry';

const DiaryList = ({ entries, onEdit, onDelete }) => {
  return (
    <div>
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        entries.map((entry) => (
          <DiaryEntry
            key={`diary-entry-${entry.id}`}
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default DiaryList;
