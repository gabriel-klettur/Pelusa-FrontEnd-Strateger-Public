// Path: strateger-react/src/components/Alarms/Pagination/Pagination.js

import React from 'react';

const Pagination = ({ page, hasMore, endIndex, alarmsLength, handlePreviousPage, handleNextPage }) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        className={`px-5 py-2 font-semibold rounded-lg shadow-md transition-colors duration-200 ${
          page === 0
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-african_violet-500 text-white hover:bg-african_violet-700'
        }`}
        onClick={handlePreviousPage}
        disabled={page === 0}
      >
        Anterior
      </button>
      <button
        className={`px-5 py-2 font-semibold rounded-lg shadow-md transition-colors duration-200 ${
          !hasMore && endIndex >= alarmsLength
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-african_violet-500 text-white hover:bg-african_violet-700'
        }`}
        onClick={handleNextPage}
        disabled={!hasMore && endIndex >= alarmsLength}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
