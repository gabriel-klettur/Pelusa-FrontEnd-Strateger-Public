import { setSelectedChartTool } from '../../../../../../redux/interaction';

const clearChartDrawings = (
    candlestickSeriesRef, 
    chartRef, 
    circles, setCircles, 
    lines, setLines, 
    rectangles, setRectangles, 
    brushStrokes, setBrushStrokes, 
    textTools, setTextTools, 
    dispatch
) => {
    const removeDrawing = (item) => {
        if (typeof candlestickSeriesRef.current?.detachPrimitive === 'function') {
            candlestickSeriesRef.current.detachPrimitive(item);
        } else if (typeof chartRef.current?.removePrimitive === 'function') {
            chartRef.current.removePrimitive(item);
        } else if (typeof item.dispose === 'function') {
            item.dispose();
        }
    };

    // Eliminar círculos
    circles.forEach(removeDrawing);
    setCircles([]);

    // Eliminar líneas
    lines.forEach(removeDrawing);
    setLines([]);

    // Eliminar rectángulos
    rectangles.forEach(removeDrawing);
    setRectangles([]);

    // Eliminar trazos de brocha
    brushStrokes.forEach(removeDrawing);
    setBrushStrokes([]);

    // Eliminar textos
    textTools.forEach(removeDrawing);
    setTextTools([]);

    // Restablecer la herramienta seleccionada en Redux
    dispatch(setSelectedChartTool(null));
};

export default clearChartDrawings;
