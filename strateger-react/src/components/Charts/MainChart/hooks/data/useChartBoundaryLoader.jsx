import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../../../../config";
import {     
    selectCandlestickChartInterval,
    selectCandlestickChartTicker,
    updateChartData
} from "reduxStore/charts";

import { adjustDates, formatDataFetching, intervalMapping } from "../../../../../redux/charts/utils";

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

        //* Filter candles that are visible on the chart
        const visibleCandles = data.filter(([timestamp]) => 
            timestamp >= fromMilliseconds && timestamp <= toMilliseconds
        );
        
        await detectDataGaps(lastGapFillTimeRef, visibleCandles, chartInterval, chartTicker, dispatch);
    };

    //! ----------------- Cargar Más Datos si es Necesario -----------------
    const handleBoundaryLoading = async (timeRange) => {
        if (!timeRange || !data.length) return;

        const { from } = timeRange;
        const firstCandleInMilliseconds = data[0][0]; // Timestamp en ms
        const firstCandleTimeInSeconds = Math.floor(data[0][0] / 1000);
        
        // Detectar si no hay datos
        await detectNoDataBeginning(from, firstCandleTimeInSeconds, chartInterval, chartTicker, dispatch, lastLogTimeRef, firstCandleInMilliseconds);

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

const detectNoDataBeginning = async (from, firstCandleTimeInSeconds, chartInterval, chartTicker, dispatch, lastLogTimeRef, firstCandleInMilliseconds) => {
    if (from <= firstCandleTimeInSeconds) {
        const now = Date.now();
        if (now - lastLogTimeRef.current >= 5000) { 
            lastLogTimeRef.current = now; 
                        
            const { formatedEndDate } = adjustDates(chartInterval, "None", firstCandleInMilliseconds);                
                                 
            await apiCall(chartTicker, chartInterval, "None", formatedEndDate, dispatch);                        
        }
    }
}


//! ----------------- Detectar Gaps en Velas Visibles -----------------
const detectDataGaps = async (lastGapFillTimeRef, candlestickData, interval, chartTicker, dispatch) => {
    if (candlestickData.length < 2) return;

    const now = Date.now();
    if (now - lastGapFillTimeRef.current < 5000) {        
        return; 
    }

    lastGapFillTimeRef.current = now;

    const expectedGap = intervalMapping[interval]*1000 || 0;
    if (!expectedGap) {        
        return;
    }     
    for (let i = 1; i < candlestickData.length; i++) {
        const prevCandleTime = candlestickData[i - 1][0]
        const currentCandleTime = candlestickData[i][0];
        const gap = currentCandleTime - prevCandleTime;        

        if (gap > expectedGap*1.5) {             
            
            const { formatedStartDate } = adjustDates(interval, prevCandleTime, "None");        

            await apiCall(chartTicker, interval, formatedStartDate, "None", dispatch);
            break; 
        }
    }
};

const apiCall = async (chartTicker, chartInterval, formatedStartDate = "None", formatedEndDate = "None", dispatch) => {
    //! Llamada a la API
    try {                    
        const response = await axios.get(`${config.apiURL}/bingx/main/get-k-line-data`, {
            params: {
                symbol: chartTicker || 'BTC-USDT',
                interval: chartInterval,
                limit: "1440",
                start_date: formatedStartDate,
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
};


export default useChartBoundaryLoader;
