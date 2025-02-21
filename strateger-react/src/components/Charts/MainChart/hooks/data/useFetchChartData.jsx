// src/components/CandlestickChart/hooks/useFetchChartData.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCandlestickChartData, 
  selectCandlestickChartData, 
  selectCandlestickChartLoading, 
  selectCandlestickChartInterval,
  selectCandlestickChartTicker
} from 'reduxStore/charts';
import useWebSocketChartData from './useWebSocketChartData';                      // Websocket component


const useFetchChartData = (chartStartDate, chartEndDate) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCandlestickChartData);
  const loading = useSelector(selectCandlestickChartLoading);
  const chartInterval = useSelector(selectCandlestickChartInterval);
  const chartTicker = useSelector(selectCandlestickChartTicker);

  useEffect(() => {
    if (chartStartDate && chartEndDate) {
      dispatch(fetchCandlestickChartData({
        interval: chartInterval,
        startDate: new Date(chartStartDate).toISOString(),
        endDate: new Date(chartEndDate).toISOString(),
        ticker: chartTicker
      }));
    }
  }, [chartStartDate, chartEndDate, chartInterval, chartTicker, dispatch]);

  useWebSocketChartData({ chartInterval, chartTicker });

  return { data, loading, chartInterval };
};

export default useFetchChartData;
