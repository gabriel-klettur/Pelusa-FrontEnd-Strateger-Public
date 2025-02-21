import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateChartData } from 'reduxStore/charts';

const useWebSocketChartData = ({chartInterval, chartTicker = 'BTC-USDT'}) => {    
  const dispatch = useDispatch();

  useEffect(() => {

    if(chartInterval === null || chartTicker === null) return;
    
    const ws = new WebSocket(`ws://192.168.1.2:8000/bingx/main/ws`);
  
    const params = {
      symbol: chartTicker,
      interval: chartInterval,
      limit: "100",
      start_date: "None",
      end_date: "None"
    };
  
    // Variable para guardar el ID del intervalo
    let intervalId;
  
    ws.onopen = () => {
      
      // Envía la solicitud inicial
      ws.send(JSON.stringify(params));
  
      // Configura el intervalo para enviar la solicitud cada 1 minuto (60000 ms)
      intervalId = setInterval(() => {
        ws.send(JSON.stringify(params));
      }, 1000);
    };
  
    ws.onmessage = (event) => {
      try {
        // 1. Parseamos el primer nivel
        const rawData = JSON.parse(event.data); // { mensaje: "...", datos: "..." }
  
        // 2. Parseamos el string 'datos' para obtener el objeto interno
        //    que contiene la estructura {"code":0, "msg":"", "data":[...]}
        const secondLevel = JSON.parse(rawData.datos);
  
        // 3. Validamos que code === 0 y que exista 'data'
        if (secondLevel.code === 0 && Array.isArray(secondLevel.data)) {
          // 4. Mapeamos y formateamos cada elemento
          const formattedData = secondLevel.data.map(item => {
            const time = Number(item.time);
            const open = parseFloat(item.open);
            const high = parseFloat(item.high);
            const low = parseFloat(item.low);
            const close = parseFloat(item.close);
            return [time, open, high, low, close];
          });
  
          // 5. Ordenamos por el valor de time (índice 0 del array)
          formattedData.sort((a, b) => a[0] - b[0]);
  
          // 6. Actualizamos la data en Redux
          dispatch(updateChartData(formattedData));
            
        } else {
          console.error("Not valid data or Error in anwser", secondLevel);
        }
      } catch (error) {
        console.error("Parsing message Error:", error);
      }
    };
  
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    // Limpieza al desmontar el componente
    return () => {
      clearInterval(intervalId);      
      ws.close();
    };
  }, [dispatch, chartInterval, chartTicker]);
  
  return null;
};

export default useWebSocketChartData;
