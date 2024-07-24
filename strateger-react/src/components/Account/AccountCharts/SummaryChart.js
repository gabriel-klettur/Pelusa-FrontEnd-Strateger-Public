// Path: strateger-react/src/components/Account/AccountCharts/SummaryChart.js

import React from 'react';
import { useSelector } from 'react-redux';
import { ChartComponent } from '../../TradingViewLineal/TradingViewLineal';
import { selectCoinMTimeData } from '../../../slices/accountSlice';

const SummaryChart = () => {
  const perpCOINMAccounts = useSelector(selectCoinMTimeData);

  // Transformar y ordenar los datos para el gráfico
  const balanceData = perpCOINMAccounts
    .map(account => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.balance,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const seriesData = [
    { data: balanceData, color: '#2962FF' }
  ];

  const colors = {
    backgroundColor: 'white',
    lineColor: '#2962FF',
    textColor: 'black',
    areaTopColor: '#2962FF',
    areaBottomColor: 'rgba(41, 98, 255, 0.28)',
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
