import React from 'react';
import TarjetitaEditDelete from '../../../common/TarjetitaEditDelete';

const DiaryEntry = ({ entry, onEdit, onDelete }) => {
  return (
    
    <TarjetitaEditDelete
      id={entry.id}
      date={entry.date}
      text={entry.text}
      photos={entry.photos}
      references={entry.references}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default DiaryEntry;
