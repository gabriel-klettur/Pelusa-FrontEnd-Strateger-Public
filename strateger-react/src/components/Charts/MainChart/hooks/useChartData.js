// src/components/CandlestickChart/hooks/useChartData.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCandlestickChartData, 
  setCandlestickChartParameters, 
  selectCandlestickChartData, 
  selectCandlestickChartLoading, 
  selectCandlestickChartStartDate, 
  selectCandlestickChartEndDate, 
  selectCandlestickChartInterval 
} from '../../../../redux/charts';

const useChartData = (initialTemporalidad, initialStartDate, initialEndDate) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCandlestickChartData);
  const loading = useSelector(selectCandlestickChartLoading);
  const chartStartDate = useSelector(selectCandlestickChartStartDate);
  const chartEndDate = useSelector(selectCandlestickChartEndDate);
  const chartInterval = useSelector(selectCandlestickChartInterval);  

  // Configurar los parámetros de inicio del gráfico si no están establecidos
  useEffect(() => {
    if (!chartStartDate || !chartEndDate) {
      dispatch(setCandlestickChartParameters({
        interval: initialTemporalidad,
        startDate: new Date(initialStartDate).toISOString(),
        endDate: new Date(initialEndDate).toISOString(),
      }));      
    }
  }, [dispatch, initialTemporalidad, initialStartDate, initialEndDate, chartStartDate, chartEndDate]);

  // Fetch de los datos del gráfico cuando cambian las fechas o el intervalo
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

export default useChartData;
