// Path: strateger-react/src/components/Account/AccountCharts/SpotChart.js

import React, { useState, useEffect } from 'react';
import getRandomColor from '../../../common/getRandomColor';
import ContenedorChartWallet from '../common/ContenedorChartWallet';

const SpotChart = ({
    spotAccounts,
    ChartComponent,
    Legend,    
  }) => {
      
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [visibleSeries, setVisibleSeries] = useState({});
  const [seriesData, setSeriesData] = useState([]);

  // Agrupar los datos por 'asset' y generar series
  useEffect(() => {
    if (spotAccounts.length > 0) {
      const seriesDataMap = spotAccounts.reduce((acc, account) => {
        const time = new Date(account.dateTime).getTime() / 1000;
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
      const seriesData = Object.keys(seriesDataMap).map((asset) => ({
        name: asset,
        data: seriesDataMap[asset].sort((a, b) => a.time - b.time),
        color: getRandomColor(),
      }));

      setSeriesData(seriesData);

      // Inicializar visibleSeries para todas las series como visibles
      const initialVisibility = seriesData.reduce((acc, series) => {
        acc[series.name] = true;
        return acc;
      }, {});

      setVisibleSeries(initialVisibility);
      setIsLoading(false); // Termina la carga después de inicializar datos
    }
  }, [spotAccounts]);

  const toggleSeriesVisibility = (name) => {
    setVisibleSeries((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

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
    <ContenedorChartWallet
      isLoading={isLoading}
      seriesData={seriesData}
      colors={colors}
      priceFormat={priceFormat}
      visibleSeries={visibleSeries}
      toggleSeriesVisibility={toggleSeriesVisibility}
      ChartComponent={ChartComponent}
      Legend={Legend}      
    />    
  );
};

export default SpotChart;
