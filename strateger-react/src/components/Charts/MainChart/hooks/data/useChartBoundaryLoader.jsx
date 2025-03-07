import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../../../../config";
import {     
    selectCandlestickChartInterval,
    selectCandlestickChartTicker,
    updateChartData
} from "reduxStore/charts";

import { adjustDates, formatDataFetching } from "../../../../../redux/charts/utils";

const useChartBoundaryLoader = (chartRef, data) => {
  
  const dispatch = useDispatch();  
  const lastLogTimeRef = useRef(0); // Controla logs y límite de peticiones
  const lastGapFillTimeRef = useRef(0); // Controla la frecuencia de relleno de gaps
  
  const chartInterval = useSelector(selectCandlestickChartInterval);
  const chartTicker = useSelector(selectCandlestickChartTicker);

  useEffect(() => {
    if (!chartRef?.current || !data.length) return;

    const chart = chartRef.current;
    if (!chart.timeScale) {
        console.error("Error: chart.timeScale() no está disponible.");
        return;
    }

    const timeScale = chart.timeScale();    

    //! ----------------- Detectar Gaps al Mover el Gráfico -----------------
    const handleTimeRangeChange = async (timeRange) => {
        if (!timeRange || !data.length) return;

        const { from, to } = timeRange;
        const fromMilliseconds = from * 1000;
        const toMilliseconds = to * 1000;

        // Filtrar solo las velas visibles en el gráfico
        const visibleCandles = data.filter(([timestamp]) => 
            timestamp >= fromMilliseconds && timestamp <= toMilliseconds
        );

        // Detectar gaps y rellenarlos automáticamente
        await detectDataGaps(lastGapFillTimeRef, visibleCandles, chartInterval, chartTicker, dispatch);
    };

    //! ----------------- Cargar Más Datos si es Necesario -----------------
    const handleBoundaryLoading = async (timeRange) => {
        if (!timeRange || !data.length) return;

        const firstCandleInMilliseconds = data[0][0]; // Timestamp en ms
        const firstCandleTimeInSeconds = Math.floor(data[0][0] / 1000);
        const { from } = timeRange;

        if (from <= firstCandleTimeInSeconds) {
            const now = Date.now();
            if (now - lastLogTimeRef.current >= 5000) { 
                lastLogTimeRef.current = now; 
                
                //! Ajustar Fechas
                const { formatedEndDate } = adjustDates(chartInterval, "None", firstCandleInMilliseconds);                
                                                        
                //! Llamada a la API
                try {                    
                    const response = await axios.get(`${config.apiURL}/bingx/main/get-k-line-data`, {
                        params: {
                            symbol: chartTicker || 'BTC-USDT',
                            interval: chartInterval,
                            limit: "1440",
                            start_date: "None",
                            end_date: formatedEndDate,
                        }
                    });

                    //! Formatear Data
                    const formatedResponse = formatDataFetching({ response });
                    
                    if (!Array.isArray(formatedResponse.formattedData)) {
                        throw new Error("❌ `formattedData` Invalid array");
                    }
                                        
                    dispatch(updateChartData(formatedResponse.formattedData));

                } catch (error) {
                    console.error("⚠️ Error al cargar datos:", error);
                }
            }
        }
    };

    //! ----------------- Suscribirse a Cambios en el Gráfico -----------------
    if (timeScale.subscribeVisibleTimeRangeChange) {
        timeScale.subscribeVisibleTimeRangeChange(handleTimeRangeChange);
        timeScale.subscribeVisibleTimeRangeChange(handleBoundaryLoading);
    }

    return () => {
        if (timeScale.unsubscribeVisibleTimeRangeChange) {
            timeScale.unsubscribeVisibleTimeRangeChange(handleTimeRangeChange);
            timeScale.unsubscribeVisibleTimeRangeChange(handleBoundaryLoading);
        }
    };
  }, [chartRef, data, chartInterval, chartTicker, dispatch]);

};

//! ----------------- Detectar Gaps en Velas Visibles -----------------
const detectDataGaps = async (lastGapFillTimeRef, candlestickData, interval, chartTicker, dispatch) => {
    if (candlestickData.length < 2) return;

    const now = Date.now();
    if (now - lastGapFillTimeRef.current < 5000) {        
        return; // Evita múltiples llamadas en menos de 5 segundos
    }

    lastGapFillTimeRef.current = now; // Actualiza el último tiempo de petición

    const intervalMapping = {
        '1m': 60 * 1000, '5m': 5 * 60 * 1000, '15m': 15 * 60 * 1000, '30m': 30 * 60 * 1000,
        '1h': 60 * 60 * 1000, '4h': 4 * 60 * 60 * 1000, '1d': 24 * 60 * 60 * 1000
    };

    const expectedGap = intervalMapping[interval] || 0;
    if (!expectedGap) {
        console.error("⛔ Intervalo inválido en detectDataGaps:", interval);
        return;
    }

    for (let i = 1; i < candlestickData.length; i++) {
        const prevCandleTime = candlestickData[i - 1][0]; // Timestamp de la vela anterior
        const currentCandleTime = candlestickData[i][0]; // Timestamp de la vela actual
        const gap = currentCandleTime - prevCandleTime;

        if (gap > expectedGap * 1.5) { 
            console.warn(`⚠️ Gap detectado: Falta de datos entre ${new Date(prevCandleTime).toISOString()} y ${new Date(currentCandleTime).toISOString()}. Diferencia: ${gap / 1000} seg.`);
            
            //! 🔥 Llamar a la API para rellenar los datos faltantes
            await fillMissingCandles(prevCandleTime, chartTicker, interval, dispatch);
            break; // Solo hacemos una petición por ciclo para evitar sobrecarga
        }
    }
};

const fillMissingCandles = async (prevCandleTime, chartTicker, interval, dispatch) => {
    try {
        //! ✅ Usamos `adjustDates` para obtener `start_date` en el formato correcto
        const { formatedStartDate } = adjustDates(interval, prevCandleTime, "None");        

        const response = await axios.get(`${config.apiURL}/bingx/main/get-k-line-data`, {
            params: {
                symbol: chartTicker || 'BTC-USDT',
                interval: interval,
                limit: "1440",
                start_date: formatedStartDate, // ✅ Ahora está formateado correctamente
                end_date: "None",
            }
        });
        
        const formattedResponse = formatDataFetching({ response });

        if (!Array.isArray(formattedResponse.formattedData)) {
            throw new Error("❌ `formattedData` Invalid array");
        }
        
        dispatch(updateChartData(formattedResponse.formattedData));        

    } catch (error) {
        console.error("⚠️ Error al rellenar datos faltantes:", error);
    }
};


export default useChartBoundaryLoader;
