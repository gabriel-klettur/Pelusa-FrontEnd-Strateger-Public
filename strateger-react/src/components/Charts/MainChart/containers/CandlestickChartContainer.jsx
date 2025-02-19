// Path: strateger-react/src/components/Charts/CandlestickChartChart/containers/CandlestickChartContainer.js
import { useRef, useState } from 'react';

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

const CandlestickChartContainer = ({ data, chartSettings, chartInterval }) => {  
  // Ref del contenedor del gráfico
  const mainChartContainerRef = useRef();
  const chartRef = useInitializeChart(mainChartContainerRef);
  const candlestickSeriesRef = useInitializeCandlestickSeries(chartRef);
  
  // Herramientas de dibujo (selectedTool puede ser: 'delete', 'line', 'rectangle', 'circle', 'brush', etc.)
  const [selectedTool, setSelectedTool] = useState(null);

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
    setSelectedTool,
    circles,
    setCircles
  );   
  
  useLineDrawingOnClick(
    chartRef,
    candlestickSeriesRef,
    selectedTool,
    setSelectedTool,
    lines,
    setLines
  );
  
  useRectangleDrawingOnClick(
    chartRef,
    candlestickSeriesRef,
    selectedTool,
    setSelectedTool,
    rectangles,
    setRectangles
  );

  useBrushDrawingOnClick(
    mainChartContainerRef, // Se pasa el ref del contenedor para la brocha
    chartRef,
    candlestickSeriesRef,
    selectedTool,
    setSelectedTool,
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
    setSelectedTool
  );

  useTextDrawingOnClick(
    mainChartContainerRef,
    chartRef,
    candlestickSeriesRef,
    selectedTool,
    setSelectedTool,
    textTools,
    setTextTools
  );
  
  // Función para cambiar la herramienta de dibujo
  const handleToolSelection = (tool) => {
    setSelectedTool(tool);      
  };

  // Función para eliminar todos los dibujos
  const handleClearAll = () => {
    // Eliminamos círculos
    circles.forEach((circle) => {
      if (typeof candlestickSeriesRef.current?.detachPrimitive === 'function') {
        candlestickSeriesRef.current.detachPrimitive(circle);
      } else if (typeof chartRef.current?.removePrimitive === 'function') {
        chartRef.current.removePrimitive(circle);
      } else if (typeof circle.dispose === 'function') {
        circle.dispose();
      }
    });
    setCircles([]);

    // Eliminamos líneas
    lines.forEach((line) => {
      if (typeof candlestickSeriesRef.current?.detachPrimitive === 'function') {
        candlestickSeriesRef.current.detachPrimitive(line);
      } else if (typeof chartRef.current?.removePrimitive === 'function') {
        chartRef.current.removePrimitive(line);
      } else if (typeof line.dispose === 'function') {
        line.dispose();
      }
    });
    setLines([]);

    // Eliminamos rectángulos
    rectangles.forEach((rect) => {
      if (typeof candlestickSeriesRef.current?.detachPrimitive === 'function') {
        candlestickSeriesRef.current.detachPrimitive(rect);
      } else if (typeof chartRef.current?.removePrimitive === 'function') {
        chartRef.current.removePrimitive(rect);
      } else if (typeof rect.dispose === 'function') {
        rect.dispose();
      }
    });
    setRectangles([]);

    // Eliminamos trazos de brocha
    brushStrokes.forEach((brush) => {
      if (typeof candlestickSeriesRef.current?.detachPrimitive === 'function') {
        candlestickSeriesRef.current.detachPrimitive(brush);
      } else if (typeof chartRef.current?.removePrimitive === 'function') {
        chartRef.current.removePrimitive(brush);
      } else if (typeof brush.dispose === 'function') {
        brush.dispose();
      }
    });
    setBrushStrokes([]);

    // Eliminamos textos
    textTools.forEach((text) => {
      if (typeof candlestickSeriesRef.current?.detachPrimitive === 'function') {
        candlestickSeriesRef.current.detachPrimitive(text);
      } else if (typeof chartRef.current?.removePrimitive === 'function') {
        chartRef.current.removePrimitive(text);
      } else if (typeof text.dispose === 'function') {
        text.dispose();
      }
    });
    setTextTools([]);

    // Si se desea, también se desactiva cualquier herramienta
    setSelectedTool(null);
  };


  return (
    <div className="chart-container relative">
      {/* Toolbar de dibujo */}
      <div className="toolbar absolute top-0 left-0 z-10 p-2 bg-gray-200 flex gap-2">
        <button
          onClick={() => handleToolSelection('delete')}
          className={selectedTool === 'delete' ? 'bg-green-500 text-white' : ''}
        >
          delete
        </button>        
        <button
          onClick={() => handleToolSelection('line')}
          className={selectedTool === 'line' ? 'bg-green-500 text-white' : ''}
        >
          Line
        </button>
        <button
          onClick={() => handleToolSelection('rectangle')}
          className={selectedTool === 'rectangle' ? 'bg-green-500 text-white' : ''}
        >
          Rectangle
        </button>
        <button
          onClick={() => handleToolSelection('circle')}
          className={selectedTool === 'circle' ? 'bg-green-500 text-white' : ''}
        >
          Circle
        </button>
        <button
          onClick={() => handleToolSelection('brush')}
          className={selectedTool === 'brush' ? 'bg-green-500 text-white' : ''}
        >
          Brush
        </button>
        <button onClick={() => handleToolSelection('text')} className={selectedTool === 'text' ? 'bg-green-500 text-white' : ''}>
          Text
        </button>
        <button
          onClick={handleClearAll}
          className="bg-red-500 text-white"
        >
          Delete all
        </button>
      </div>
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
