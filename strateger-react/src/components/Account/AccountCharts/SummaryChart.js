import React from 'react';
import { useSelector } from 'react-redux';
import { ChartComponent } from '../../TradingViewLineal/TradingViewLineal';
import { selectCoinMTimeData, selectUSDTMTimeData, selectSpotTimeData } from '../../../slices/accountSlice';
import { selectLastPrice } from '../../../slices/tradingViewChartSlice';

const SummaryChart = () => {
  const perpCOINMAccounts = useSelector(selectCoinMTimeData);
  const perpUSDTMAccounts = useSelector(selectUSDTMTimeData);
  const spotAccounts = useSelector(selectSpotTimeData);
  const lastPrice = useSelector(selectLastPrice);

  const roundToHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    date.setMinutes(0, 0, 0); // Redondear a la hora más cercana
    return date.getTime() / 1000; // Convertir de vuelta a segundos
  };

  const processData = (accounts, convertToUSD = false) => {
    const transformedData = accounts.map(account => ({
      time: roundToHour(new Date(account.dateTime).getTime() / 1000), // Convertir a timestamp en segundos y redondear
      value: convertToUSD ? account.balance * lastPrice : account.balance, // Convertir a USD si es necesario
    }));

    // Ordenar y eliminar duplicados
    const uniqueData = Array.from(new Set(transformedData.map(a => a.time)))
      .map(time => {
        return transformedData.find(a => a.time === time);
      });

    return uniqueData.sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente
  };

  const balanceDataCOINM = processData(perpCOINMAccounts, true); // Convertir COINM a USD
  const balanceDataUSDTM = processData(perpUSDTMAccounts);
  const balanceDataSPOT = processData(spotAccounts);

  const mergeData = (data1, data2) => {
    const mergedData = [];

    const timeSet = new Set([...data1.map(d => d.time), ...data2.map(d => d.time)]);

    timeSet.forEach(time => {
      const value1 = data1.find(d => d.time === time)?.value || 0;
      const value2 = data2.find(d => d.time === time)?.value || 0;
      mergedData.push({ time, value: value1 + value2 });
    });

    return mergedData.sort((a, b) => a.time - b.time);
  };

  const balanceDataSum = mergeData(balanceDataCOINM, balanceDataUSDTM);

  const seriesData = [
    { data: balanceDataCOINM, color: '#2962FF' },
    { data: balanceDataUSDTM, color: '#FF0000' },
    { data: balanceDataSPOT, color: '#00FF00' },
    { data: balanceDataSum, color: '#FFA500' }, // Nueva serie con la suma
  ];

  const colors = {
    backgroundColor: 'white',
    lineColor: '#2962FF',
    textColor: 'black',
  };

  const priceFormat = {
    type: 'price',
    precision: 8,
    minMove: 0.00000001,
  };

  return (
    <div>
      <h2>Summary</h2>
      <ChartComponent seriesData={seriesData} colors={colors} priceFormat={priceFormat} />
    </div>
  );
}

export default SummaryChart;
