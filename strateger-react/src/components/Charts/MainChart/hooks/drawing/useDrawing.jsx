import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//!---- Redux ----!//
import { setSelectedChartTool } from '../../../../../redux/interaction';
import { selectSelectedChartTool } from '../../../../../redux/interaction';

//!---- Drawing Tools ----!//
import useCircleDrawingOnClick from './useCircleDrawingOnClick';
import useLineDrawingOnClick from './useLineDrawingOnClick';
import useRectangleDrawingOnClick from './useRectangleDrawingOnClick';
import useDeleteOnClick from './useDeleteOnClick';
import useBrushDrawingOnClick from './useBrushDrawingOnClick';
import useTextDrawingOnClick from './useTextDrawingOnClick';
import clearChartDrawings from './clearChartDrawing';

//!---- Plugins ----!//
import useDeltaToolTip from '../tools/useDeltaToolTip';

const useDrawing = ({mainChartContainerRef, chartRef, candlestickSeriesRef, data}) => {
    const dispatch = useDispatch();

    const selectedTool = useSelector(selectSelectedChartTool);
    
    const [circles, setCircles] = useState([]);
    const [lines, setLines] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [brushStrokes, setBrushStrokes] = useState([]);
    const [textTools, setTextTools] = useState([]);

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
        mainChartContainerRef,
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
}

export default useDrawing;