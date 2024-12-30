// src/components/CandlestickChart/hooks/useChartParameters.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setCandlestickChartParameters, 
  selectCandlestickChartStartDate, 
  selectCandlestickChartEndDate 
} from 'reduxStore/charts';

const useSetupChartParameters = (initialInterval, initialStartDate, initialEndDate) => {
  const dispatch = useDispatch();
  const chartStartDate = useSelector(selectCandlestickChartStartDate);
  const chartEndDate = useSelector(selectCandlestickChartEndDate);

  useEffect(() => {
    if (!chartStartDate || !chartEndDate) {
      dispatch(setCandlestickChartParameters({
        interval: initialInterval,
        startDate: new Date(initialStartDate).toISOString(),
        endDate: new Date(initialEndDate).toISOString(),
      }));
    }
  }, [dispatch, initialInterval, initialStartDate, initialEndDate, chartStartDate, chartEndDate]);

  return { chartStartDate, chartEndDate };
};

export default useSetupChartParameters;