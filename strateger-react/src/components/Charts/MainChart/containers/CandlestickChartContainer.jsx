// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedChartTool, setSelectedChartTool } from '../../../../redux/interaction';

//!---- Chart ----!//
import useInitializeChart from '../hooks/charts/useInitializeChart';
import useInitializeCandlestickSeries from '../hooks/charts/useInitializeCandlestickSeries';
import useSetCandlestickSeriesData from '../hooks/charts/useSetCandlestickSeriesData';

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

//!---- Herramientas de Dibujo ----!//
import useCircleDrawingOnClick from '../hooks/drawing/useCircleDrawingOnClick';
import useLineDrawingOnClick from '../hooks/drawing/useLineDrawingOnClick';
import useRectangleDrawingOnClick from '../hooks/drawing/useRectangleDrawingOnClick';
import useDeleteOnClick from '../hooks/drawing/useDeleteOnClick';
import useBrushDrawingOnClick from '../hooks/drawing/useBrushDrawingOnClick';
import useTextDrawingOnClick from '../hooks/drawing/useTextDrawingOnClick';
import clearChartDrawings from '../hooks/drawing/clearChartDrawing';

//!---- Plugins ----!//
import { DeltaTooltipPrimitive } from '../plugins/delta-tooltip/delta-tooltip';


const CandlestickChartContainer = ({ data, chartSettings, chartInterval }) => { 
  
  const dispatch = useDispatch();

  // Ref del contenedor del gráfico
  const mainChartContainerRef = useRef();
  const chartRef = useInitializeChart(mainChartContainerRef);
  const candlestickSeriesRef = useInitializeCandlestickSeries(chartRef);
  
  // Herramientas de dibujo (selectedTool puede ser: 'delete', 'line', 'rectangle', 'circle', 'brush', etc.)
  const selectedTool = useSelector(selectSelectedChartTool);

  // Estados para primitivas de dibujo
  const [circles, setCircles] = useState([]);
  const [lines, setLines] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [brushStrokes, setBrushStrokes] = useState([]);
  const [textTools, setTextTools] = useState([]);

  // Inicialización de indicadores
  const { ema10SeriesRef, ema55SeriesRef, ema200SeriesRef } = useInitializeEmasSeries(chartRef);
  const { stochasticKSeriesRef, stochasticDSeriesRef } = useInitializeStochasticSeries(chartRef);                
  const { positiveIncreasingRef, positiveDecreasingRef, negativeDecreasingRef, negativeIncreasingRef } = useInitializeSQZSeries(chartRef);
  const { rsiSeriesRef } = useInitializeRSISeries(chartRef);
  const { adxSeriesRef, plusDISeriesRef, minusDISeriesRef, keyLevelSeriesRef } = useInitializeAdxSeries(chartRef);

  useSetCandlestickSeriesData(chartSettings.showCandlestickSerie, data, candlestickSeriesRef);
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
  
  useSetupMarkers(
    candlestickSeriesRef, chartInterval, 
    chartSettings.showAlarmsMarkers,
    chartSettings.showAlarmsSelectedMarkers,
    chartSettings.showAlarmsFilteredMarkers,
    chartSettings.showOrdersUsdmMarkers,
    chartSettings.showOrdersCoinmMarkers,
    chartSettings.showOrdersSpotMarkers,
    chartSettings.showOrdersStandardMarkers
  );            

  //!----------------- Hooks de Dibujo -----------------//
  useCircleDrawingOnClick(
    chartRef,
    candlestickSeriesRef,
    data,
    selectedTool,    
    circles,
    setCircles
  );   
  
  useLineDrawingOnClick(
    chartRef,
    candlestickSeriesRef,
    selectedTool,    
    lines,
    setLines
  );
  
  useRectangleDrawingOnClick(
    chartRef,
    candlestickSeriesRef,
    selectedTool,    
    rectangles,
    setRectangles
  );

  useBrushDrawingOnClick(
    mainChartContainerRef, // Se pasa el ref del contenedor para la brocha
    chartRef,
    candlestickSeriesRef,
    selectedTool,    
    brushStrokes,
    setBrushStrokes
  );

  useDeleteOnClick(
    chartRef,
    candlestickSeriesRef,
    circles,
    setCircles,
    lines,
    setLines,
    rectangles,
    setRectangles,
    brushStrokes,
    setBrushStrokes,
    textTools,
    setTextTools,
    selectedTool,    
  );

  useTextDrawingOnClick(
    mainChartContainerRef,
    chartRef,
    candlestickSeriesRef,
    selectedTool,    
    textTools,
    setTextTools
  );
    
  const handleClearAll = useCallback(() => {
    clearChartDrawings(
      candlestickSeriesRef,
      chartRef,
      circles, setCircles,
      lines, setLines,
      rectangles, setRectangles,
      brushStrokes, setBrushStrokes,
      textTools, setTextTools,
      dispatch
    );
  }, [candlestickSeriesRef, chartRef, circles, lines, rectangles, brushStrokes, textTools, dispatch]);

  // ✅ Se activa la limpieza cuando 'deleteAll' es seleccionado
  useEffect(() => {
    if (selectedTool === 'deleteAll') {
      setTimeout(() => {
        handleClearAll();
        dispatch(setSelectedChartTool(null)); // Resetea la herramienta seleccionada
      }, 100); // 🔹 Pequeño delay para asegurar que Redux actualice el estado antes de limpiar
    }
  }, [selectedTool, handleClearAll, dispatch]);

  // Ref para guardar la instancia del tooltip
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && candlestickSeriesRef.current) {
      if (selectedTool === 'ruler') {
        // Solo creamos el tooltip si no existe ya
        if (!tooltipRef.current) {
          console.log('📏 Herramienta de regla seleccionada');
          const deltaTooltip = new DeltaTooltipPrimitive({
            lineColor: 'rgba(0, 0, 0, 0.2)',
            // Otras opciones que desees configurar
          });
          candlestickSeriesRef.current.attachPrimitive(deltaTooltip);
          tooltipRef.current = deltaTooltip;
        }
      } else {
        // Si la herramienta ya no es "ruler", desmontamos el tooltip si existe
        if (tooltipRef.current && typeof tooltipRef.current.detached === 'function') {
          tooltipRef.current.detached();
          tooltipRef.current = null;
        }
      }
    }
  }, [selectedTool, chartRef, candlestickSeriesRef]);

  return (
    <div className="chart-container relative">
      
      {/* Contenedor principal del gráfico */}
      <div
        ref={mainChartContainerRef}
        style={{ height: '593px', width: '100%' }}
        className="overflow-hidden"
      ></div>
    </div>
  );
};

export default CandlestickChartContainer;
