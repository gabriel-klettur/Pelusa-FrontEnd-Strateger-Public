// Path: strateger-react/src/components/Account/AccountCharts/SpotChart.js

import React from 'react';
import { useSelector } from 'react-redux';
import { ChartComponent } from '../../TradingViewLineal/TradingViewLineal';
import Legend from '../../TradingViewLineal/Legend'; // Importar el componente de leyenda
import { selectSpotTimeData } from '../../../slices/accountSlice';

// Función para generar colores hexadecimales válidos
const getRandomColor = () => {
  let color = '#' + Math.floor(Math.random()*16777215).toString(16);
  // Asegurar que el color tenga exactamente 7 caracteres incluyendo '#'
  while (color.length < 7) {
    color += '0';
  }
  return color;
}

const SpotChart = () => {
  const spotAccounts = useSelector(selectSpotTimeData);

  // Agrupar los datos por 'asset' y generar series
  const seriesDataMap = spotAccounts.reduce((acc, account) => {
    const time = new Date(account.dateTime).getTime() / 1000; // Convertir a timestamp en segundos
    if (!acc[account.asset]) {
      acc[account.asset] = [];
    }
    acc[account.asset].push({
      time,
      value: account.balance,
    });
    return acc;
  }, {});

  // Crear seriesData en el formato requerido
  const seriesData = Object.keys(seriesDataMap).map(asset => ({
    name: asset, // Asignar el nombre del activo a la serie
    data: seriesDataMap[asset].sort((a, b) => a.time - b.time), // Ordenar por tiempo ascendente
    color: getRandomColor(), // Asignar un color aleatorio a cada asset
  }));

  const colors = {
    backgroundColor: 'white',
    textColor: 'black',
  };

  const priceFormat = {
    type: 'price',
    precision: 8,
    minMove: 0.00000001,
  };

  return (
    <div>
      <h2>Spot Chart</h2>
      <ChartComponent seriesData={seriesData} colors={colors} priceFormat={priceFormat} />
      <Legend seriesData={seriesData} /> {/* Agregar la leyenda debajo del gráfico */}
    </div>
  );
}

export default SpotChart;
