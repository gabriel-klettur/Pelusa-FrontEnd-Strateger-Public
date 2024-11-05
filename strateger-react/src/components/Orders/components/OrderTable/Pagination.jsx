//Path: src/components/Orders/components/OrderTable/Pagination.jsx

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Pagination = ({ page, hasMore, setHasMore, endIndex, totalDataLength, offset, setPage, fetcData }) => {
    const dispatch = useDispatch();

    console.log('Orders/Pagination: setPage=', setPage);

    useEffect(() => {
        if(offset === undefined ){
          if (page * 20 >= totalDataLength && hasMore) {         
            dispatch(setHasMore(false));
          }
        }
    }, [offset, page, totalDataLength, hasMore, dispatch, setHasMore]);

    const handlePreviousPage = () => {
        dispatch(setPage(Math.max(page - 1, 0)));
    };
    
    const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage * 20 >= totalDataLength && hasMore) {
        dispatch(fetcData({ limit: 500, offset: offset }));
    }
    dispatch(setPage(nextPage));
    };

    return(        
        <div className="flex justify-between mt-4">
            <button
                className={`px-4 py-2 font-semibold rounded-lg shadow-md transition-colors duration-200 ${
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
                className={`px-4 py-2 font-semibold rounded-lg shadow-md transition-colors duration-200 ${
                !hasMore && endIndex >= totalDataLength
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-african_violet-500 text-white hover:bg-african_violet-700'
                }`}
                onClick={handleNextPage}
                disabled={!hasMore && endIndex >= totalDataLength}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;