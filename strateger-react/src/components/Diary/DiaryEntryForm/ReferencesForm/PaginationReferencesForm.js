// Path: strateger-react/src/components/Diary/DiaryEntryForm/ReferencesForm/PaginationReferencesForm.js

import React from 'react';

const PaginationReferencesForm = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        type="button"
        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="px-4 py-2">{currentPage} / {totalPages}</span>
      <button
        type="button"
        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationReferencesForm;
