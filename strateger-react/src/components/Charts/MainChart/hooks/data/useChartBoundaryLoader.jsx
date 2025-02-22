import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../../../../config";
import { 
    selectCandlestickChartData,     
    selectCandlestickChartInterval,
    selectCandlestickChartTicker,
    updateChartData
} from "reduxStore/charts";

import { adjustDates, formatDataFetching } from "../../../../../redux/charts/utils";

const useChartBoundaryLoader  = (chartRef) => {
  
  const dispatch = useDispatch();
  const data = useSelector(selectCandlestickChartData);  
  const lastLogTimeRef = useRef(0); // Guarda el último tiempo en que se imprimió el mensaje
  
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

    const handleTimeRangeChange = async (timeRange) => {
        if (!timeRange) return;

        const firstCandleInMilliseconds = data[0][0]; // Timestamp en milisegundos
        const firstCandleTimeInSeconds = Math.floor(data[0][0] / 1000); // Convertimos a segundos
        const { from } = timeRange;

        if (from <= firstCandleTimeInSeconds) {
            const now = Date.now(); // Timestamp actual en milisegundos
            if (now - lastLogTimeRef.current >= 5000) { // Esperamos 5 segundos entre logs                
                lastLogTimeRef.current = now; // Actualizamos el último tiempo del log                
                
                //! ----------------- Adjust Dates -----------------
                const { formatedEndDate } = adjustDates(chartInterval, "None" , firstCandleInMilliseconds);                
                                                        
                //! ----------------- API CALL -----------------
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

                    //! ----------------- Format Data -----------------
                    const formatedResponse = formatDataFetching({response});
                    
                    if (!Array.isArray(formatedResponse.formattedData)) {
                        throw new Error("❌ `formattedData` Invalid array");
                    }
                                        
                    dispatch(updateChartData(formatedResponse.formattedData));

                } catch (error) {
                    console.error("⚠️ Error to fetch data:", error);
                }
            }
        }
    };

    if (timeScale && timeScale.subscribeVisibleTimeRangeChange) {
        timeScale.subscribeVisibleTimeRangeChange(handleTimeRangeChange);
    } else {
        console.error("Error: subscribeVisibleTimeRangeChange no está disponible en la instancia de timeScale.");
    }

    return () => {
        if (timeScale && timeScale.unsubscribeVisibleTimeRangeChange) {
            timeScale.unsubscribeVisibleTimeRangeChange(handleTimeRangeChange);
        }
    };
  }, [chartRef, data, chartInterval, chartTicker, dispatch]);

};

export default useChartBoundaryLoader ;
