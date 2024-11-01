import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { ChartComponent } from '../../../Charts/LinealChart/TradingViewLineal';
import { selectCoinMTimeData, selectUSDTMTimeData, selectSpotTimeData } from '../../../../redux/account';
import { selectTicker } from '../../../../redux/ticker';
import Legend from '../../../Charts/LinealChart/Legend';

import Ventanita from '../../../common/Ventanita';

const SummaryChart = () => {
  const balanceCOINMAccount = useSelector(selectCoinMTimeData);
  const balanceUSDTMAccount = useSelector(selectUSDTMTimeData);
  const balanceSpotAccount = useSelector(selectSpotTimeData);
  const tickerPrices = useSelector(selectTicker); // Obtén los precios de los tickers
  const lastPrice = useSelector(state => selectTicker(state)['BTC-USDT']); // Obtén el precio de BTC-USDT

  const roundToHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    date.setMinutes(0, 0, 0); // Redondear a la hora más cercana
    return date.getTime() / 1000; // Convertir de vuelta a segundos
  };

  const processData = (accounts, convertToUSD = false, isSpot = false) => {
    const transformedData = accounts.map(account => {
      const time = roundToHour(new Date(account.dateTime).getTime() / 1000); // Convertir a timestamp en segundos y redondear
      let value = account.balance;

      if (convertToUSD) {
        value *= lastPrice;
      } else if (isSpot) {
        const tickerPrice = tickerPrices[`${account.asset}-USDT`] || (account.asset === 'USDT' ? 1 : 0); // Precio del ticker o 1 si es USDT o 0 si no está disponible
        value *= tickerPrice;
      }

      return { time, value };
    });

    // Ordenar y eliminar duplicados
    const uniqueData = Array.from(new Set(transformedData.map(a => a.time)))
      .map(time => transformedData.find(a => a.time === time));

    return uniqueData.sort((a, b) => a.time - b.time); // Ordenar por tiempo ascendente
  };

  const balanceDataCOINM = processData(balanceCOINMAccount, true); // Convertir COINM a USD
  const balanceDataUSDTM = processData(balanceUSDTMAccount);

  const calculateSpotSumInUSD = (balanceSpotAccount, tickerPrices) => {
    const sumDataMap = {};

    balanceSpotAccount.forEach(account => {
      const time = roundToHour(new Date(account.dateTime).getTime() / 1000); // Convertir a timestamp en segundos y redondear
      const asset = account.asset;
      const balance = account.balance;
      const tickerPrice = tickerPrices[`${asset}-USDT`] || (asset === 'USDT' ? 1 : 0); // Precio del ticker o 1 si es USDT o 0 si no está disponible

      if (!sumDataMap[time]) {
        sumDataMap[time] = 0;
      }

      sumDataMap[time] += balance * tickerPrice;
    });

    return Object.keys(sumDataMap).map(time => ({
      time: parseInt(time, 10),
      value: sumDataMap[time],
    })).sort((a, b) => a.time - b.time);
  };

  const balanceDataSPOTSum = calculateSpotSumInUSD(balanceSpotAccount, tickerPrices);

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
  const balanceDataTotalSum = mergeData(balanceDataSum, balanceDataSPOTSum);

  const seriesData = [
    { name: 'COINM', data: balanceDataCOINM, color: '#101942' },
    { name: 'USDTM', data: balanceDataUSDTM, color: '#80043a' },
    { name: 'SPOT', data: balanceDataSPOTSum, color: '#f60c49' },
    { name: 'TOTAL', data: balanceDataTotalSum, color: '#f09580' }, // Nueva serie con la suma total
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

    <Ventanita titulo="Summary" contenido={
      <>
        <ChartComponent
          seriesData={seriesData.filter(series => visibleSeries[series.name])}
          colors={colors}
          priceFormat={priceFormat}
        />
        <Legend seriesData={seriesData} visibleSeries={visibleSeries} toggleSeriesVisibility={toggleSeriesVisibility} />
      </>      
    } />    
  );
};

export default SummaryChart;
