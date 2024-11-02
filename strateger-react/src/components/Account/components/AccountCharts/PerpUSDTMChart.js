// Path: strateger-react/src/components/Account/AccountCharts/PerpUSDTMChart.js

import React, { useState, useEffect } from 'react';
import ContenedorChartWallet from '../common/ContenedorChartWallet';

const PerpUSDTMChart = ({
  balanceUSDTMAccount,    
  ChartComponent, 
  Legend,   
}) => {  
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  // Manejar los datos y el estado de carga
  useEffect(() => {
    if (balanceUSDTMAccount.length > 0) {
      setIsLoading(false); // Marca como cargado cuando los datos están disponibles
    }
  }, [balanceUSDTMAccount]);

  // Transformar y ordenar los datos para el gráfico
  const balanceData = balanceUSDTMAccount
    .map((account) => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.balance,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const unrealizedProfitData = balanceUSDTMAccount
    .map((account) => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.unrealizedProfit,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const equityData = balanceUSDTMAccount
    .map((account) => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.equity,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const seriesData = [
    { name: 'Balance', data: balanceData, color: '#2962FF' },
    { name: 'Unrealized Profit', data: unrealizedProfitData, color: '#FF0000' },
    { name: 'Equity', data: equityData, color: '#00FF00' },
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

  console.log('PerpUSDTMChart', seriesData);

  return (
    <ContenedorChartWallet
      isLoading={isLoading}
      seriesData={seriesData}
      colors={colors}
      priceFormat={null}
      visibleSeries={visibleSeries}
      toggleSeriesVisibility={toggleSeriesVisibility}
      ChartComponent={ChartComponent}
      Legend={Legend}      
    /> 
  );
};

export default PerpUSDTMChart;
