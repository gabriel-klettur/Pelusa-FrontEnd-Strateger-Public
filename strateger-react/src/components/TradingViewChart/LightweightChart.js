import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';               // Importar las funciones de dispatch y selectores
import {
  fetchTradingViewChartData,
  setTradingViewChartParameters,
  selectTradingViewChartData,
  selectTradingViewChartLoading,
  selectTradingViewChartStartDate,
  selectTradingViewChartEndDate,
  selectTradingViewChartInterval
} from '../../slices/tradingViewChartSlice';                            // Importar las funciones y selectores del gráfico

import { selectSelectedAlarms } from '../../slices/alarmSlice';         // Importar las alarmas seleccionadas

import Toolbar from './Toolbar';                                        // Importar la barra de herramientas            
import { initializeChart } from './chartConfig';                        // Importar la función de inicialización del gráfico
import { initializeSeries, setSeriesData } from './seriesConfig';       // Importar la configuración de series
import { mapAlarmsToMarkers, sortAndFilterMarkers } from './Alarms';    // Importar las funciones de alarmas

const LightweightChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const dispatch = useDispatch();   
  const data = useSelector(selectTradingViewChartData);                 // Obtener los datos del gráfico
  const loading = useSelector(selectTradingViewChartLoading);           // Obtener el estado de carga
  const chartStartDate = useSelector(selectTradingViewChartStartDate);  // Obtener la fecha de inicio del gráfico
  const chartEndDate = useSelector(selectTradingViewChartEndDate);      // Obtener la fecha de fin del gráfico
  const chartInterval = useSelector(selectTradingViewChartInterval);    // Obtener la temporalidad del gráfico
  const selectedAlarms = useSelector(selectSelectedAlarms);             // Obtener las alarmas seleccionadas

  const chartContainerRef = useRef();                             // Crear una referencia al contenedor del gráfico
  const chartRef = useRef();                                      // Crear una referencia al gráfico   
  const candlestickSeriesRef = useRef();                          // Crear una referencia a la serie de velas
  const ema10SeriesRef = useRef();                                // Crear una referencia a la serie EMA10            
  const ema55SeriesRef = useRef();                                // Crear una referencia a la serie EMA55          
  const ema200SeriesRef = useRef();                               // Crear una referencia a la serie EMA200
  const alarmMarkersRef = useRef([]);                             // Crear una referencia a los marcadores de alarmas                    
  
  const [interval, setInterval] = useState(initialTemporalidad);          // Crear un estado para la temporalidad
  const [startDate, setStartDate] = useState(new Date(initialStartDate)); // Crear un estado para la fecha de inicio
  const [endDate, setEndDate] = useState(new Date(initialEndDate));       // Crear un estado para la fecha de fin

  useEffect(() => {
    if (!chartStartDate || !chartEndDate) {
      dispatch(setTradingViewChartParameters({
        interval: initialTemporalidad,
        startDate: initialStartDate,
        endDate: initialEndDate,
      }));
    }
  }, [dispatch, initialTemporalidad, initialStartDate, initialEndDate, chartStartDate, chartEndDate]);

  useEffect(() => {
    if (chartStartDate && chartEndDate) {
      dispatch(fetchTradingViewChartData({
        interval: chartInterval,
        startDate: chartStartDate,
        endDate: chartEndDate
      }));
    }
  }, [chartStartDate, chartEndDate, chartInterval, dispatch]);

  useEffect(() => {
    chartRef.current = initializeChart(chartContainerRef.current);

    const { candlestickSeries, ema10Series, ema55Series, ema200Series } = initializeSeries(chartRef.current);

    candlestickSeriesRef.current = candlestickSeries;
    ema10SeriesRef.current = ema10Series;
    ema55SeriesRef.current = ema55Series;
    ema200SeriesRef.current = ema200Series;

    return () => chartRef.current.remove();
  }, []);

  useEffect(() => {
    if (data && candlestickSeriesRef.current) {
      setSeriesData(candlestickSeriesRef.current, ema10SeriesRef.current, ema55SeriesRef.current, ema200SeriesRef.current, data);
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current && selectedAlarms.length > 0) {
      alarmMarkersRef.current = mapAlarmsToMarkers(selectedAlarms);
      const sortedMarkers = sortAndFilterMarkers(alarmMarkersRef.current);

      console.log("Sorted markers for chart:", sortedMarkers);
      candlestickSeriesRef.current.setMarkers(sortedMarkers);
    }
  }, [selectedAlarms]);

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    dispatch(setTradingViewChartParameters({
      interval: newInterval,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }));
  };

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    dispatch(setTradingViewChartParameters({
      interval: interval,
      startDate: newStartDate.toISOString(),
      endDate: newEndDate.toISOString(),
    }));
  };

  return (
    <div className="p-4">
      <Toolbar
        activeInterval={interval}
        onIntervalChange={handleIntervalChange}
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />
      <div ref={chartContainerRef} className="w-full h-96 border-4 border-black mt-1"></div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LightweightChart;
