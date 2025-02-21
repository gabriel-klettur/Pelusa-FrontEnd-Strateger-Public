// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js
import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedChartTool, setSelectedChartTool } from '../../../../redux/interaction';

import useChart from '../hooks/charts/useChart';
import useIndicators from '../hooks/indicators/useIndicators';



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
import useDeltaToolTip from '../hooks/tools/useDeltaToolTip';


const CandlestickChartContainer = ({ data, chartSettings, chartInterval }) => { 
  
  const dispatch = useDispatch();

  const { mainChartContainerRef, chartRef, candlestickSeriesRef } = useChart({chartSettings, data});
  useIndicators({chartSettings, chartRef, data});



  // Herramientas de dibujo (selectedTool puede ser: 'delete', 'line', 'rectangle', 'circle', 'brush', etc.)
  const selectedTool = useSelector(selectSelectedChartTool);
  // Estados para primitivas de dibujo
  const [circles, setCircles] = useState([]);
  const [lines, setLines] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [brushStrokes, setBrushStrokes] = useState([]);
  const [textTools, setTextTools] = useState([]);

  //!----------------- Hooks de Marcadores -----------------//

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
  
  const resetTool = () => {
    dispatch(setSelectedChartTool(null));
    console.log('resetTool');
  };


  // Usamos el custom hook para el Delta Tooltip
  useDeltaToolTip(selectedTool, chartRef, candlestickSeriesRef, resetTool);


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
