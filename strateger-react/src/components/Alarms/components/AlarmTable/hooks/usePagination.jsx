import { useMemo } from 'react';

const usePagination = (data, page) => {
    const totalDataLength = useMemo(() => data.length, [data]);
    const paginatedData = useMemo(() => data.slice(page * 20, (page * 20) + 20), [data, page]);
    return { totalDataLength, paginatedData };
}

export default usePagination;
