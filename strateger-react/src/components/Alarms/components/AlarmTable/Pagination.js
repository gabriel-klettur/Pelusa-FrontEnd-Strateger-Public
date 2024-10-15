import { useDispatch } from 'react-redux';
import { fetchAlarms, setPage } from '../../../../redux/slices/alarmSlice';

const Pagination = ({ page, hasMore, endIndex, alarmsLength, offset }) => {
  const dispatch = useDispatch();

  const handlePreviousPage = () => {
    dispatch(setPage(Math.max(page - 1, 0)));
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage * 20 >= alarmsLength && hasMore) {
      dispatch(fetchAlarms({ limit: 500, offset }));
    }
    dispatch(setPage(nextPage));
  };

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
