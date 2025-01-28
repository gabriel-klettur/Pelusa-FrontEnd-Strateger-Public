import { useRef, useEffect } from 'react';
import { initializeADXSeries } from '../../components/series/adxSeries';

const useInitializeAdxSeries = (chartRef) => {
  const adxSeriesRef = useRef(null);
  const plusDISeriesRef = useRef(null);
  const minusDISeriesRef = useRef(null);
  const keyLevelSeriesRef = useRef(null);

  useEffect(() => {    
    if (chartRef.current) {
      const {adxSeries, plusDISeries, minusDISeries, keyLevelSeries } = initializeADXSeries(chartRef.current);

      if (!adxSeries || !plusDISeries || !minusDISeries || !keyLevelSeries) {
        console.error("⚠️ useInitializeAdxSeries: No se pudieron inicializar todas las series ADX.");
        return;
      }

      adxSeriesRef.current = adxSeries;
      plusDISeriesRef.current = plusDISeries;
      minusDISeriesRef.current = minusDISeries;
      keyLevelSeriesRef.current = keyLevelSeries;

      console.log("✅ useInitializeAdxSeries: Series ADX correctamente inicializadas", {
        adx: adxSeriesRef.current,
        plusDI: plusDISeriesRef.current,
        minusDI: minusDISeriesRef.current,
        keyLevel: keyLevelSeriesRef.current
      });
    }
  }, [chartRef]);

  return { adxSeriesRef, plusDISeriesRef, minusDISeriesRef, keyLevelSeriesRef };
};

export default useInitializeAdxSeries;
