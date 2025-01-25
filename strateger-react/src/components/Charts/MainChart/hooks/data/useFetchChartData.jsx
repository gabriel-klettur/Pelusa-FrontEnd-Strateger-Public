// src/components/CandlestickChart/hooks/useFetchChartData.js
//!!! ESTE HOOK DEBERIA MOVERSE A UNA CARPETA MAS GENERICA????? PARECE QUE ESTA ESCONDIDO, CUANDO ESTE MISMO HOOK SE ACTIVA EN VARIOS COMPONENTES NO?

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCandlestickChartData, 
  selectCandlestickChartData, 
  selectCandlestickChartLoading, 
  selectCandlestickChartInterval,
  selectCandlestickChartTicker
} from 'reduxStore/charts';

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

  return { data, loading, chartInterval };
};

export default useFetchChartData;
