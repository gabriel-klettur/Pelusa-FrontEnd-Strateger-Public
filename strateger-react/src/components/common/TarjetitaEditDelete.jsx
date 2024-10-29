//Path strateger-react/src/components/common/TarjetitaEditDelete.jsx

import React from 'react';

const dateLabel = ({ date }) => {
  return (
    <div className="mb-2 text-african_violet-900">
      <strong>Date:</strong> {new Date(date).toLocaleString()}
    </div>
  );
};

const commentLabel = ({ comment }) => {
  return (
    <div className="mb-2 text-african_violet-900">
      <strong>Comment:</strong> {comment}
    </div>
  );
};

const photosDiary = ({ photos }) => { 
  return (
    <div className="mb-2 text-african_violet-800">
      <strong>Photos:</strong>
      {photos && photos.length > 0 ? (
        <div className="flex flex-wrap">
          {photos.map((photoUrl, index) => (
            <img
              key={index}
              src={`http://localhost${photoUrl}`}
              alt={`Attachment ${index + 1}`}
              className="h-24 w-24 object-cover m-1 rounded-lg border border-gray-200"
            />
          ))}
        </div>
      ) : (
        <span>No photos</span>
      )}
    </div>
  );
}

const refencesLabels = ({ references }) => {
  return (
    <div className="mb-2 text-african_violet-800">
      <strong>References:</strong>
      <ul className="list-disc list-inside">
        {references.map((ref, index) => (
          <li key={index}>{ref}</li>
        ))}
      </ul>
    </div>
  );
};

const actionButtons = ({ onEdit, onDelete, id }) => {
  return (
    <div className="flex justify-between">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
        onClick={() => onEdit(id)} 
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
        onClick={() => onDelete(id)} 
      >
        Delete
      </button>
    </div>
  );
}



const TarjetitaEditDelete = ({ id, date, text, photos, references, onEdit, onDelete }) => {
  return (
    <div className="font-semibold">      

      {dateLabel({ date })}      
      {commentLabel({ comment: text })}
      {photosDiary({ photos })}                 
      {refencesLabels({ references })}
      {actionButtons({ onEdit, onDelete, id})}   

    </div>
  );
};

export default TarjetitaEditDelete;
