// src/components/CandlestickChart/hooks/useFetchChartData.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCandlestickChartData, 
  selectCandlestickChartData, 
  selectCandlestickChartLoading, 
  selectCandlestickChartInterval 
} from 'reduxStore/charts';

const useFetchChartData = (chartStartDate, chartEndDate) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCandlestickChartData);
  const loading = useSelector(selectCandlestickChartLoading);
  const chartInterval = useSelector(selectCandlestickChartInterval);

  useEffect(() => {
    if (chartStartDate && chartEndDate) {
      dispatch(fetchCandlestickChartData({
        interval: chartInterval,
        startDate: new Date(chartStartDate).toISOString(),
        endDate: new Date(chartEndDate).toISOString()
      }));
    }
  }, [chartStartDate, chartEndDate, chartInterval, dispatch]);

  return { data, loading, chartInterval };
};

export default useFetchChartData;
