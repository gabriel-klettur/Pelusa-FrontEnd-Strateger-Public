// Path: strateger-react/src/components/Account/AccountCharts/PerpCOINMChart.js

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChartComponent } from '../../TradingViewLineal/TradingViewLineal';
import Legend from '../../TradingViewLineal/Legend'; // Importar el componente de leyenda
import { selectCoinMTimeData } from '../../../slices/accountSlice';
import { selectLastPrice } from '../../../slices/tradingViewChartSlice';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

const PerpCOINMChart = () => {
  const perpCOINMAccounts = useSelector(selectCoinMTimeData);
  const lastPrice = useSelector(selectLastPrice);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  // Manejar los datos y el estado de carga
  useEffect(() => {
    if (perpCOINMAccounts.length > 0 && lastPrice) {
      setIsLoading(false); // Marca como cargado cuando los datos están disponibles
    }
  }, [perpCOINMAccounts, lastPrice]);

  // Transformar y ordenar los datos para el gráfico
  const balanceData = perpCOINMAccounts
    .map((account) => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.balance * lastPrice,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const unrealizedProfitData = perpCOINMAccounts
    .map((account) => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.unrealizedProfit * lastPrice,
    }))
    .sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente

  const equityData = perpCOINMAccounts
    .map((account) => ({
      time: new Date(account.dateTime).getTime() / 1000, // Convertir a timestamp en segundos
      value: account.equity * lastPrice,
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

  const priceFormat = {
    type: 'price',
    precision: 8,
    minMove: 0.00000001,
  };

  return (
    <div className="relative">
      <LoadingOverlay isLoading={isLoading} /> {/* Muestra el overlay de carga */}
      <h2>Perp COIN-M Chart</h2>
      <ChartComponent
        seriesData={seriesData.filter((series) => visibleSeries[series.name])}
        colors={colors}
        priceFormat={priceFormat}
      />
      <Legend
        seriesData={seriesData}
        visibleSeries={visibleSeries}
        toggleSeriesVisibility={toggleSeriesVisibility}
      />
    </div>
  );
};

export default PerpCOINMChart;
