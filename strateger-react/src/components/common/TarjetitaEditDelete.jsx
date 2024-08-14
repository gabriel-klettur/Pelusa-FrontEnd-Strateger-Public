// Path: strateger-react/src/components/common/TarjetitaEditDelete.jsx

import React from 'react';

const TarjetitaEditDelete = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="p-2 bg-african_violet-100 shadow-md mb-4 border border-gray-200 transition-colors duration-200 hover:bg-african_violet-100 cursor-pointer">
      <div className="mb-2 text-african_violet-900">
        <strong>Date:</strong> {new Date(entry.date).toLocaleString()}
      </div>
      <div className="mb-2 text-african_violet-800">
        <strong>Text:</strong> {entry.text}
      </div>
      <div className="mb-2 text-african_violet-800">
        <strong>Photos:</strong>
        {entry.photos && entry.photos.length > 0 ? (
          <div className="flex flex-wrap">
            {entry.photos.map((photoUrl, index) => (
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
      <div className="mb-2 text-african_violet-800">
        <strong>References:</strong>
        <ul className="list-disc list-inside">
          {entry.references.map((ref, index) => (
            <li key={index}>{ref}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
          onClick={() => onEdit(entry.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
          onClick={() => onDelete(entry.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TarjetitaEditDelete;
