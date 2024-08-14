// Path: strateger-react/src/components/Diary/DiaryEntry.js

import React from 'react';
import TarjetitaEditDelete from '../../common/TarjetitaEditDelete';

const DiaryEntry = ({ entry, onEdit, onDelete }) => {
  return (
    <TarjetitaEditDelete
      entry={entry}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default DiaryEntry;
