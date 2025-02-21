
//!---- Indicators ----!//
import useInitializeEmasSeries from './useInitializeEmasSeries';
import useSetEmasSeriesData from './useSetEmasSeriesData';
import useInitializeStochasticSeries from './useInitializeStochasticSeries';
import useSetStochasticSeriesData from './useSetStochasticSeriesData';
import useInitializeRSISeries from './useInitializeRSISeries';
import useSetRSISeriesData from './useSetRSISeriesData';
import useInitializeAdxSeries from './useInitializeAdxSeries';
import useSetAdxSeriesData from './useSetAdxSeriesData';
import useInitializeSQZSeries from './useInitializeSQZSeries';
import useSetSQZSeriesData from './useSetSQZSeriesData';

const useIndicators = ({chartSettings, chartRef, data}) => {      
  const { ema10SeriesRef, ema55SeriesRef, ema200SeriesRef } = useInitializeEmasSeries(chartRef);
  const { stochasticKSeriesRef, stochasticDSeriesRef } = useInitializeStochasticSeries(chartRef);                
  const { positiveIncreasingRef, positiveDecreasingRef, negativeDecreasingRef, negativeIncreasingRef } = useInitializeSQZSeries(chartRef);
  const { rsiSeriesRef } = useInitializeRSISeries(chartRef);
  const { adxSeriesRef, plusDISeriesRef, minusDISeriesRef, keyLevelSeriesRef } = useInitializeAdxSeries(chartRef);

  useSetEmasSeriesData(chartSettings.showEmasSerie, data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef);    
  useSetStochasticSeriesData(chartSettings.showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef);
  useSetSQZSeriesData(
    chartSettings.showSQZMOMENTUMSerie,
    data,
    positiveIncreasingRef,
    positiveDecreasingRef,
    negativeDecreasingRef,
    negativeIncreasingRef
  );
  useSetRSISeriesData(chartSettings.showRSISerie, data, rsiSeriesRef);       
  useSetAdxSeriesData(
    chartSettings.showAdxSerie,
    data,
    adxSeriesRef,
    plusDISeriesRef,
    minusDISeriesRef,
    keyLevelSeriesRef
  );
}

export default useIndicators;