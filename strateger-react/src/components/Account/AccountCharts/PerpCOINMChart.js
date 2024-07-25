// Path: strateger-react/src/components/Account/AccountCharts/PerpCOINMChart.js

import React from 'react';
import { useSelector } from 'react-redux';
import { ChartComponent } from '../../TradingViewLineal/TradingViewLineal';
import { selectCoinMTimeData } from '../../../slices/accountSlice';
import { selectLastPrice } from '../../../slices/tradingViewChartSlice';

const PerpCOINMChart = () => {
  const perpCOINMAccounts = useSelector(selectCoinMTimeData);
  const lastPrice = useSelector(selectLastPrice);

  // Transformar y ordenar los datos para el gráfico
  const balanceData = perpCOINMAccounts
    .map(account => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.balance * lastPrice,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const unrealizedProfitData = perpCOINMAccounts
    .map(account => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.unrealizedProfit  * lastPrice,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const equityData = perpCOINMAccounts
    .map(account => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.equity  * lastPrice,
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

  const priceFormat = {
    type: 'price',
    precision: 8,
    minMove: 0.00000001,
  };

  return (
    <div>
      <h2>Perp COIN-M Chart</h2>
      <ChartComponent seriesData={seriesData} colors={colors} priceFormat={priceFormat} />
    </div>
  );
}

export default PerpCOINMChart;
