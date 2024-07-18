// src/components/TradingViewChart/hooks/useChartData.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchTradingViewChartData, 
  setTradingViewChartParameters, 
  selectTradingViewChartData, 
  selectTradingViewChartLoading, 
  selectTradingViewChartStartDate, 
  selectTradingViewChartEndDate, 
  selectTradingViewChartInterval 
} from '../../../slices/tradingViewChartSlice';

const useChartData = (initialTemporalidad, initialStartDate, initialEndDate) => {
  const dispatch = useDispatch();
  const data = useSelector(selectTradingViewChartData);
  const loading = useSelector(selectTradingViewChartLoading);
  const chartStartDate = useSelector(selectTradingViewChartStartDate);
  const chartEndDate = useSelector(selectTradingViewChartEndDate);
  const chartInterval = useSelector(selectTradingViewChartInterval);

  useEffect(() => {
    if (!chartStartDate || !chartEndDate) {
      dispatch(setTradingViewChartParameters({
        interval: initialTemporalidad,
        startDate: initialStartDate,
        endDate: initialEndDate,
      }));
    }
  }, [dispatch, initialTemporalidad, initialStartDate, initialEndDate, chartStartDate, chartEndDate]);

  useEffect(() => {
    if (chartStartDate && chartEndDate) {
      dispatch(fetchTradingViewChartData({
        interval: chartInterval,
        startDate: chartStartDate,
        endDate: chartEndDate
      }));
    }
  }, [chartStartDate, chartEndDate, chartInterval, dispatch]);

  return { data, loading, chartInterval };
};

export default useChartData;
