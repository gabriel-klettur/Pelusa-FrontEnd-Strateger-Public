// Path: strateger-react/src/components/Account/AccountCharts/PerpUSDTMChart.js

import React from 'react';
import { useSelector } from 'react-redux';
import { ChartComponent } from '../../TradingViewLineal/TradingViewLineal';
import { selectUSDTMTimeData } from '../../../slices/accountSlice';

const PerpUSDTMChart = () => {
  const perpUSDTMAccounts = useSelector(selectUSDTMTimeData);

  // Transformar y ordenar los datos para el gráfico
  const balanceData = perpUSDTMAccounts
    .map(account => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.balance,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const unrealizedProfitData = perpUSDTMAccounts
    .map(account => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.unrealizedProfit,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const equityData = perpUSDTMAccounts
    .map(account => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.equity,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const seriesData = [
    { data: balanceData, color: '#2962FF' },
    { data: unrealizedProfitData, color: '#FF0000' },
    { data: equityData, color: '#00FF00' }
  ];

  const colors = {
    backgroundColor: 'white',
    lineColor: '#2962FF',
    textColor: 'black',
    
    
  };

  return (
    <div>
      <h2>Perp USDT-M Chart</h2>
      <ChartComponent seriesData={seriesData} colors={colors} />
    </div>
  );
}

export default PerpUSDTMChart;
