// Path: strateger-react/src/components/Account/AccountCharts/SpotSummary.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@headlessui/react';

import { fetchSpotBalance, selectSpot, updateSpotBalanceUSDAction, updateTotalBalanceInUSD, } from '../../../../redux/account';

import { fetchTicker } from '../../../../redux/ticker';
import Tablita from '../../../common/Tablita';
import Tarjetitas from '../../../common/Tarjetitas';

import Ventanita from '../../../common/Ventanita';

const SpotSummary = () => {
  const dispatch = useDispatch();
  const { balances, error, loaded, balanceUSD } = useSelector(selectSpot);
  const tickerPrices = useSelector((state) => (state.ticker ? state.ticker.prices : {}));
  const [showInUSD, setShowInUSD] = useState(true);
  
  useEffect(() => {
    if (!loaded) {
      dispatch(fetchSpotBalance());
    }
  }, [dispatch, loaded]);

  useEffect(() => {
    const tickersToFetch = balances
      .filter(
        (balance) =>
          balance.asset !== 'USDT' &&
          balance.asset !== 'BTC' &&
          parseFloat(balance.free) > 0 &&
          !tickerPrices[`${balance.asset}-USDT`]
      )
      .map((balance) => `${balance.asset}-USDT`);

    if (tickersToFetch.length > 0) {
      tickersToFetch.forEach((ticker) => dispatch(fetchTicker(ticker)));
    }
  }, [balances, tickerPrices, dispatch]);

  const getPriceInUSD = (asset, amount) => {
    if (asset === 'USDT') 
      return parseFloat(amount);
    const tickerPrice = tickerPrices[`${asset}-USDT`];
    return tickerPrice ? parseFloat(amount) * tickerPrice : 0;
  };

  const totalBalanceInUSD = balances.reduce(
    (acc, balance) => acc + getPriceInUSD(balance.asset, balance.free),
    0
  );

  useEffect(() => {
    dispatch(updateSpotBalanceUSDAction(totalBalanceInUSD));
  }, [totalBalanceInUSD, dispatch]);

  useEffect(() => {
    if (loaded) {
      dispatch(updateTotalBalanceInUSD());
    }
  }, [loaded, balanceUSD, dispatch]);

  const displayValue = totalBalanceInUSD.toFixed(2);
  const currencyLabel = showInUSD ? 'USD' : 'ASSET';

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredBalances = balances.filter((balance) => parseFloat(balance.free) > 0);

  // Definición de columnas para Tablita
  const columns = [
    { label: 'Asset', key: 'asset' },
    { label: 'Amount', key: 'amount' },
  ];

  // Formateo de los datos para Tablita
  const data = filteredBalances.map((balance) => ({
    asset: balance.asset,
    amount: showInUSD
      ? getPriceInUSD(balance.asset, balance.free).toFixed(2)
      : parseFloat(balance.free).toFixed(6),
  }));

  const contenido = (
    <Ventanita
      titulo="Spot"
      contenido={
        <div>      
          <div className="flex items-center mb-4">
            <span className="mr-2">{currencyLabel}</span>
            <Switch
              checked={showInUSD}
              onChange={setShowInUSD}
              className={`${
                showInUSD ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
            >
              <span
                className={`${
                  showInUSD ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
              />
            </Switch>
          </div>
          <div className="grid grid-cols-1 gap-4 align-center text-center">
            <Tarjetitas descripcion="Total Balance" contenido={displayValue} />
          </div>
          {filteredBalances.length === 0 ? (
            <div>No balances available</div>
          ) : (
            <Tablita columns={columns} data={data} />
          )}
        </div>
      }
    />  
  );

  return (
    <div>
      {contenido} 
    </div>
  );
};

export default SpotSummary;
