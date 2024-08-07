import React from 'react';

const Pagination = ({ page, hasMore, endIndex, alarmsLength, handlePreviousPage, handleNextPage }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        className={`px-4 py-2 rounded transition duration-300 ${
          page === 0 ? 'bg-english_violet-300 text-english_violet-500 cursor-not-allowed' : 'bg-african_violet-500 text-white hover:bg-african_violet-600'
        }`}
        onClick={handlePreviousPage}
        disabled={page === 0}
      >
        Anterior
      </button>
      <button
        className={`px-4 py-2 rounded transition duration-300 ${
          !hasMore && endIndex >= alarmsLength ? 'bg-english_violet-300 text-english_violet-500 cursor-not-allowed' : 'bg-african_violet-500 text-white hover:bg-african_violet-600'
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
