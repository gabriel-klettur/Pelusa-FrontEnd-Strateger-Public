// src/components/CandlestickChart/hooks/useChartData.js
import useSetupChartParameters from './useSetupChartParameters';
import useFetchChartData from './useFetchChartData';

const useChartData = (initialInterval, initialStartDate, initialEndDate) => {
  const { chartStartDate, chartEndDate } = useSetupChartParameters(initialInterval, initialStartDate, initialEndDate);
  const { data, loading, chartInterval } = useFetchChartData(chartStartDate, chartEndDate);

  return { data, loading, chartInterval };
};

export default useChartData;
