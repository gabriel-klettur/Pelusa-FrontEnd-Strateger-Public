import { useEffect } from 'react';
import { setAdxSeriesData } from '../../components/series/adxSeries';
import { formatChartData, sortAndRemoveDuplicates } from '../../utils/chartData';

const useSetAdxSeriesData = (showSeries, data, adxSeriesRef, plusDISeriesRef, minusDISeriesRef, keyLevelSeriesRef, period = 14) => {
  useEffect(() => {

    if (!adxSeriesRef.current || !plusDISeriesRef.current || !minusDISeriesRef.current || !keyLevelSeriesRef.current) {
      console.error("⚠️ useSetAdxSeriesData: Alguna de las series ADX no está definida.");
      return;
    }

    if (showSeries && data && adxSeriesRef.current && plusDISeriesRef.current && minusDISeriesRef.current && keyLevelSeriesRef.current) {
      const formattedData = formatChartData(data);
      const sortedData = sortAndRemoveDuplicates(formattedData);

      setAdxSeriesData(
        adxSeriesRef.current, 
        plusDISeriesRef.current, 
        minusDISeriesRef.current, 
        keyLevelSeriesRef.current, 
        sortedData, 
        period
      );
    } else if(adxSeriesRef.current && plusDISeriesRef.current && minusDISeriesRef.current && keyLevelSeriesRef.current) {
      adxSeriesRef.current.setData([]);
      plusDISeriesRef.current.setData([]);
      minusDISeriesRef.current.setData([]);
      keyLevelSeriesRef.current.setData([]);
    }
  }, [showSeries, data, adxSeriesRef, plusDISeriesRef, minusDISeriesRef, keyLevelSeriesRef, period]);
};

export default useSetAdxSeriesData;
