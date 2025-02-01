// Path: src/hooks/useChartReady.js
import { useState, useEffect } from 'react';

const useChartReady = (chartRef, seriesRef) => {
    const [isChartReady, setIsChartReady] = useState(false);

    useEffect(() => {
        if (chartRef.current && seriesRef.current) {
                
        setIsChartReady(true);
        }
    }, [chartRef, seriesRef]);

    return isChartReady;
};

export default useChartReady;
