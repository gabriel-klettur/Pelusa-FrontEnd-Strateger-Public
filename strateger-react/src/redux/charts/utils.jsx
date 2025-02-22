// src/redux/asyncThunks/utils/adjustDates.js
import { addMinutes, addHours, subMinutes, subHours } from 'date-fns';

export const adjustDates = (interval, startDate, endDate) => {
  const intervalMapping = {
    '1m': 60, '5m': 300, '15m': 900, '30m': 1800,
    '1h': 3600, '4h': 14400, '1d': 86400, '1w': 604800, '1M': 2592000
  };

  if (!intervalMapping[interval]) {
    throw new Error('Invalid interval');
  }

  const intervalSeconds = intervalMapping[interval]; 
  const numCandles = 500; 

  let adjustedStartDate, adjustedEndDate;

  // Caso: `startDate` es "None", calcularlo en base a `endDate`
  if (startDate === "None" && endDate !== "None") {
    adjustedEndDate = new Date(endDate);
    adjustedStartDate = new Date(adjustedEndDate.getTime() - (intervalSeconds * numCandles * 1000));
  }

  // Caso: `endDate` es "None", calcularlo en base a `startDate`
  else if (endDate === "None" && startDate !== "None") {
    adjustedStartDate = new Date(startDate);
    adjustedEndDate = new Date(adjustedStartDate.getTime() + (intervalSeconds * numCandles * 1000));
  }

  // Caso: Ambos valores son "None"
  else if (startDate === "None" && endDate === "None") {
    return { interval, formatedStartDate: "None", formatedEndDate: "None" };
  }

  // Caso general: Convertimos a `Date`
  else {
    adjustedStartDate = new Date(startDate);
    adjustedEndDate = new Date(endDate);
  }

  // Validación para evitar fechas inválidas
  if (!adjustedEndDate || isNaN(adjustedEndDate.getTime())) {
    throw new Error("❌ Error: `adjustedEndDate` es inválido.");
  }

  let expandedStartDate = new Date(adjustedStartDate);
  let expandedEndDate = new Date(adjustedEndDate);

  // Ajustes según el intervalo
  switch (interval) {
    case '1m': case '5m': case '15m': case '30m':
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

  const formatedStartDate = expandedStartDate.toISOString().slice(0, 19).replace('T', ' ');
  const formatedEndDate = expandedEndDate.toISOString().slice(0, 19).replace('T', ' ');

  return { interval, formatedStartDate, formatedEndDate };
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