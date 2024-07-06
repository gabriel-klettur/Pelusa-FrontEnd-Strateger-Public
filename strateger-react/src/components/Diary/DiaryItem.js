import React, { useState } from 'react';

const DiaryItem = ({ diary, onSelect, isSelected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`p-2 border ${isSelected ? 'border-blue-500' : 'border-gray-300'} rounded-md cursor-pointer`}
      onClick={() => {
        onSelect(diary.id);
        setIsExpanded(!isExpanded);
      }}
    >
      <div>
        <strong>Date:</strong> {new Date(diary.date).toLocaleString()}
      </div>
      {isExpanded && (
        <div>
          <div><strong>Text:</strong> {diary.text}</div>
        </div>
      )}
    </div>
  );
};

export default DiaryItem;
