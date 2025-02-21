// src/redux/asyncThunks/utils/adjustDates.js
import { addMinutes, addHours, subMinutes, subHours } from 'date-fns';

export const adjustDates = (interval, startDate, endDate) => {
  // Asigna valores por defecto en caso de que no se provean
  const adjustedStartDate = startDate ? new Date(startDate) : new Date();
  const adjustedEndDate = endDate ? new Date(endDate) : new Date();

  // Validación del rango de fechas
  if (adjustedStartDate >= adjustedEndDate) {
    throw new Error('Invalid date range');
  }

  // Copia las fechas para ajustarlas
  let expandedStartDate = new Date(adjustedStartDate);
  let expandedEndDate = new Date(adjustedEndDate);

  // Ajusta según el intervalo
  switch (interval) {
    case '1':
      interval = '1m';
      break;
    case '1m':
    case '5m':
    case '15m':
    case '30m':
      expandedStartDate = subMinutes(expandedStartDate, 5);
      expandedEndDate = addMinutes(expandedEndDate, 5);
      break;
    case '1h':
      expandedStartDate = subHours(expandedStartDate, 5);
      expandedEndDate = addHours(expandedEndDate, 5);
      break;
    case '4h':
      expandedStartDate = subHours(expandedStartDate, 20);
      expandedEndDate = addHours(expandedEndDate, 20);
      break;
    case '1d':
      expandedStartDate = subHours(expandedStartDate, 120);
      expandedEndDate = addHours(expandedEndDate, 120);
      break;
    case '1w':
      expandedStartDate = subHours(expandedStartDate, 840);
      expandedEndDate = addHours(expandedEndDate, 840);
      break;
    case '1M':
      expandedStartDate = subHours(expandedStartDate, 3600);
      expandedEndDate = addHours(expandedEndDate, 3600);
      break;
    default:
      throw new Error('Invalid interval');
  }

  return { interval, expandedStartDate, expandedEndDate };
};


export const formatDataFetching = ({response}) => {
    const resultData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  
    if (resultData.code === 0) {
      const formattedData = resultData.data
        .map(item => [
          new Date(item.time).getTime(),
          parseFloat(item.open),
          parseFloat(item.high),
          parseFloat(item.low),
          parseFloat(item.close)
        ])
        .filter(item => !isNaN(item[0]));

      formattedData.sort((a, b) => a[0] - b[0]);                                

      return { formattedData };
    } else {      
      throw new Error(response.msg || 'Unknown error from API');
    }

}