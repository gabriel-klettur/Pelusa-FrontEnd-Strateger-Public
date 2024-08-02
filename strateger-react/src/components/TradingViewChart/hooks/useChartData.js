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

  // Configurar los parámetros de inicio del gráfico si no están establecidos
  useEffect(() => {
    if (!chartStartDate || !chartEndDate) {
      dispatch(setTradingViewChartParameters({
        interval: initialTemporalidad,
        startDate: new Date(initialStartDate).toISOString(),
        endDate: new Date(initialEndDate).toISOString(),
      }));      
    }
  }, [dispatch, initialTemporalidad, initialStartDate, initialEndDate, chartStartDate, chartEndDate]);

  // Fetch de los datos del gráfico cuando cambian las fechas o el intervalo
  useEffect(() => {
    if (chartStartDate && chartEndDate) {
      dispatch(fetchTradingViewChartData({
        interval: chartInterval,
        startDate: new Date(chartStartDate).toISOString(),
        endDate: new Date(chartEndDate).toISOString()
      }));
    }
  }, [chartStartDate, chartEndDate, chartInterval, dispatch]);

  return { data, loading, chartInterval };
};

export default useChartData;
