// src/components/CandlestickChart/hooks/useChartParameters.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setCandlestickChartParameters, 
  selectCandlestickChartStartDate, 
  selectCandlestickChartEndDate 
} from 'reduxStore/charts';

const useSetupChartParameters = (selectTemporalidad, selectStartDate, selectCurrentDate) => {

  const dispatch = useDispatch();

  const interval = useSelector(selectTemporalidad);
  const startDate = new Date(useSelector(selectStartDate)).toISOString();
  const endDate = new Date(useSelector(selectCurrentDate)).toISOString();

  
  const chartStartDate = useSelector(selectCandlestickChartStartDate);
  const chartEndDate = useSelector(selectCandlestickChartEndDate);

  useEffect(() => {
    if (!chartStartDate || !chartEndDate) {
      dispatch(setCandlestickChartParameters({
        interval: interval,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      }));
    }
  }, [dispatch, interval, startDate, endDate, chartStartDate, chartEndDate]);

  return { chartStartDate, chartEndDate };
};

export default useSetupChartParameters;