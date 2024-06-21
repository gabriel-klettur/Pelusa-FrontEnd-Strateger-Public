// Path: strateger-react/src/components/Alarms/Pagination.js

import React from 'react';

const Pagination = ({ page, hasMore, endIndex, alarmsLength, handlePreviousPage, handleNextPage }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        onClick={handlePreviousPage}
        disabled={page === 0}
      >
        Anterior
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleNextPage}
        disabled={!hasMore && endIndex >= alarmsLength}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
