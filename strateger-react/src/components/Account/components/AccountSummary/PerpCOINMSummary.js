// Path: strateger-react/src/components/Account/AccountSummary/PerpCOINMSummary.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@headlessui/react';

import { fetchPerpCOINMBalance, selectPerpCOINM } from '../../../../redux/account';

import Tarjetitas from '../../../common/Tarjetitas';
import { fetchTicker } from '../../../../redux/ticker';

const PerpCOINMSummary = () => {
  const dispatch = useDispatch();
  const { data,  error, loaded } = useSelector(selectPerpCOINM);
  const tickersPrices = useSelector((state) => (state.ticker ? state.ticker.prices : {}));
  const [showInBTC, setShowInBTC] = useState(true);

  // Efecto para cargar datos si aún no se han cargado
  useEffect(() => {
    if (!loaded) {
      dispatch(fetchPerpCOINMBalance());
    }
  }, [dispatch, loaded]);

  useEffect(() => {
    const tickersToFetch = data.filter(
      (balance) =>
        balance.asset !== 'USDT' &&
        balance.asset !== 'BTC' &&
        parseFloat(balance.balance) > 0 &&
        !tickersPrices[`${balance.asset}-USDT`]
    ).map((balance) => `${balance.asset}-USDT`);
    
    if (tickersToFetch.length > 0) {
      tickersToFetch.forEach((ticker) => dispatch(fetchTicker(ticker)));
    }

  }, [data, tickersPrices, dispatch]);

  const displayValue = (value, ticker) => {
    if (showInBTC) {
      if (tickersPrices[`${ticker}-USDT`]) {
        return (parseFloat(value) * tickersPrices[`${ticker}-USDT`]).toFixed(2);
      } else {
        return 'N/A';
      }
    } else {
      return parseFloat(value).toFixed(6);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div className="relative mb-4"></div>;      
  }
  const currencyLabel = showInBTC ? 'USD' : 'ASSET';

  return (
    <div className="relative mb-4">     
      <div className="flex items-center mb-4">
        <span className="mr-2">{currencyLabel}</span>
        <Switch
          checked={showInBTC}
          onChange={setShowInBTC}
          className={`${
            showInBTC ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
        >
          <span
            className={`${
              showInBTC ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
          />
        </Switch>
      </div>

      {data.map((balance) => (
        <div className="grid grid-cols-2 gap-4" >
          <Tarjetitas descripcion="Asset" contenido={balance.asset} />
          <Tarjetitas descripcion="Balance" contenido={displayValue(balance.balance, balance.asset)} />
          <Tarjetitas descripcion="Equity" contenido={displayValue(balance.equity, balance.asset)} />
          <Tarjetitas descripcion="Unrealized Profit" contenido={displayValue(balance.unrealizedProfit, balance.asset)} />
          <Tarjetitas descripcion="Available Margin" contenido={displayValue(balance.availableMargin, balance.asset)} />
          <Tarjetitas descripcion="Used Margin" contenido={displayValue(balance.usedMargin, balance.asset)} />
        </div>   
      ))}   
    </div>  
  );
};

export default PerpCOINMSummary;
