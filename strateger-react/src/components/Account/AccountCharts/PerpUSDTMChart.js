// Path: strateger-react/src/components/Account/AccountCharts/PerpUSDTMChart.js

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChartComponent } from '../../TradingViewLineal/TradingViewLineal';
import Legend from '../../TradingViewLineal/Legend'; // Importar el componente de leyenda
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
    { name: 'Balance', data: balanceData, color: '#2962FF' },
    { name: 'Unrealized Profit', data: unrealizedProfitData, color: '#FF0000' },
    { name: 'Equity', data: equityData, color: '#00FF00' }
  ];

  const [visibleSeries, setVisibleSeries] = useState(
    seriesData.reduce((acc, series) => {
      acc[series.name] = true;
      return acc;
    }, {})
  );

  const toggleSeriesVisibility = (name) => {
    setVisibleSeries((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const colors = {
    backgroundColor: 'white',
    lineColor: '#2962FF',
    textColor: 'black',
  };

  return (
    <div>
      <h2>Perp USDT-M Chart</h2>
      <ChartComponent
        seriesData={seriesData.filter(series => visibleSeries[series.name])}
        colors={colors}
      />
      <Legend seriesData={seriesData} visibleSeries={visibleSeries} toggleSeriesVisibility={toggleSeriesVisibility} />
    </div>
  );
}

export default PerpUSDTMChart;
