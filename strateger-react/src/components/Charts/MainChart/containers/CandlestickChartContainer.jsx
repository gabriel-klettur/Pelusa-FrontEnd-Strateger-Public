// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js
import { useRef, useState } from 'react';

//!---- Chart ----!//
import useInitializeChart from '../hooks/charts/useInitializeChart';
import useInitializeCandlestickSeries from '../hooks/charts/useInitializeCandlestickSeries';
import useSetCandlestickSeriesData from '../hooks/charts/useSetCandlestickSeriesData';
import useChartReady from '../hooks/charts/useChartReady';

//!---- Indicators ----!//
import useInitializeEmasSeries from '../hooks/indicators/useInitializeEmasSeries';
import useSetEmasSeriesData from '../hooks/indicators/useSetEmasSeriesData';
import useInitializeStochasticSeries from '../hooks/indicators/useInitializeStochasticSeries';
import useSetStochasticSeriesData from '../hooks/indicators/useSetStochasticSeriesData';
import useInitializeRSISeries from '../hooks/indicators/useInitializeRSISeries';
import useSetRSISeriesData from '../hooks/indicators/useSetRSISeriesData';
import useInitializeAdxSeries from '../hooks/indicators/useInitializeAdxSeries';
import useSetAdxSeriesData from '../hooks/indicators/useSetAdxSeriesData';
import useInitializeSQZSeries from '../hooks/indicators/useInitializeSQZSeries';
import useSetSQZSeriesData from '../hooks/indicators/useSetSQZSeriesData';

//!---- Markers ----!//
import useSetupMarkers from '../hooks/markers/useSetupMarkers';
import useClickShowPos from '../hooks/utils/useClickShowPos';
import useDrawInChart from '../hooks/utils/useDrawInChart';

//!---- NUEVO: Hook para gestionar las herramientas de dibujo ----!//
import useDrawingTools from '../hooks/utils/useDrawingTools';

const CandlestickChartContainer = ({ data, chartSettings, chartInterval }) => {  
    const mainChartContainerRef = useRef(); // Contenedor principal del gráfico
    const chartRef = useInitializeChart(mainChartContainerRef);
    const candlestickSeriesRef = useInitializeCandlestickSeries(chartRef);
    
    const isChartReady = useChartReady(chartRef, candlestickSeriesRef);

    const { ema10SeriesRef, ema55SeriesRef, ema200SeriesRef } = useInitializeEmasSeries(chartRef);
    const { stochasticKSeriesRef, stochasticDSeriesRef } = useInitializeStochasticSeries(chartRef);                
    const { positiveIncreasingRef, positiveDecreasingRef, negativeDecreasingRef, negativeIncreasingRef } = useInitializeSQZSeries(chartRef);
    const { rsiSeriesRef } = useInitializeRSISeries(chartRef);
    const { adxSeriesRef, plusDISeriesRef, minusDISeriesRef, keyLevelSeriesRef } = useInitializeAdxSeries(chartRef);

    useSetCandlestickSeriesData(chartSettings.showCandlestickSerie, data, candlestickSeriesRef);
    useSetEmasSeriesData(chartSettings.showEmasSerie, data, ema10SeriesRef, ema55SeriesRef, ema200SeriesRef);    
    useSetStochasticSeriesData(chartSettings.showStochasticSerie, data, stochasticKSeriesRef, stochasticDSeriesRef);
    useSetSQZSeriesData(chartSettings.showSQZMOMENTUMSerie, data, positiveIncreasingRef, positiveDecreasingRef, negativeDecreasingRef, negativeIncreasingRef);
    useSetRSISeriesData(chartSettings.showRSISerie, data, rsiSeriesRef);       
    useSetAdxSeriesData(chartSettings.showAdxSerie, data, adxSeriesRef, plusDISeriesRef, minusDISeriesRef, keyLevelSeriesRef);
    
    useSetupMarkers(
        candlestickSeriesRef, chartInterval, 
        chartSettings.showAlarmsMarkers, chartSettings.showAlarmsSelectedMarkers, chartSettings.showAlarmsFilteredMarkers,
        chartSettings.showOrdersUsdmMarkers, chartSettings.showOrdersCoinmMarkers, chartSettings.showOrdersSpotMarkers, chartSettings.showOrdersStandardMarkers
    );            

    useDrawInChart(chartRef, candlestickSeriesRef, data, isChartReady);
    useClickShowPos(chartRef, candlestickSeriesRef);

    // Estado para el modo de dibujo seleccionado: 'point' | 'line' | 'rectangle' | 'circle' | 'brush' | null  
    const [selectedTool, setSelectedTool] = useState('null');
    
    // Se pasa además la ref del contenedor al hook de dibujo
    useDrawingTools(chartRef, candlestickSeriesRef, mainChartContainerRef, selectedTool);

    // Función para actualizar el modo de dibujo desde la toolbar
    const handleToolSelection = (tool) => {
      setSelectedTool(tool);
    };

    return (
      <div className="chart-container relative">
        {/* Toolbar de dibujo */}
        <div className="toolbar absolute top-0 left-0 z-10 p-2 bg-gray-200 flex gap-2">
          <button onClick={() => handleToolSelection('point')}>Punto</button>
          <button onClick={() => handleToolSelection('line')}>Línea</button>
          <button onClick={() => handleToolSelection('rectangle')}>Rectángulo</button>
          <button onClick={() => handleToolSelection('circle')}>Círculo</button>
          <button onClick={() => handleToolSelection('brush')}>Brocha</button>
          {/* Botón para desactivar el dibujo */}
          <button onClick={() => handleToolSelection(null)}>Desactivar</button>
        </div>
        {/* Contenedor principal del gráfico */}
        <div ref={mainChartContainerRef} style={{ height: '593px', width: '100%' }} className="overflow-hidden"></div>

      </div>
    );
};

export default CandlestickChartContainer;
