//Path: strateger-react/src/components/Charts/MainChart/hooks/indicators/useSetRSISeriesData.jsx

import { useEffect } from 'react';
import { setRSISeriesData } from '../../components/series/rsiSeries';
import { formatChartData, sortAndRemoveDuplicates } from '../../utils/chartData';

const useSetRSISeriesData = (showSeries, data, rsiSeriesRef, period = 14) => {
  useEffect(() => {
    if (showSeries && rsiSeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setRSISeriesData(rsiSeriesRef.current, sortedData, period);
    } else if (rsiSeriesRef.current) {
      rsiSeriesRef.current.setData([]);
    }
  }, [showSeries, data, rsiSeriesRef, period]);
};

export default useSetRSISeriesData;