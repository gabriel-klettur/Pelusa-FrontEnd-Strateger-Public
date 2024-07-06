import React from 'react';

const DiaryItem = ({ diary, onSelect, isSelected }) => {
  return (
    <div
      className={`p-2 border ${isSelected ? 'border-blue-500' : 'border-gray-300'} rounded-md cursor-pointer`}
      onClick={() => onSelect(diary.id)}
    >
      <div><strong>Date:</strong> {new Date(diary.date).toLocaleString()}</div>
      <div><strong>Text:</strong> {diary.text}</div>
    </div>
  );
};

export default DiaryItem;
