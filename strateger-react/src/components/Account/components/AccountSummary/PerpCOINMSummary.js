// Path: strateger-react/src/components/Account/AccountSummary/PerpCOINMSummary.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@headlessui/react';

import { fetchPerpCOINMBalance, selectPerpCOINM, updateTotalBalanceInUSD } from '../../../../redux/account';

import Tarjetitas from '../../../common/Tarjetitas';

const PerpCOINMSummary = ({ lastPrice, LoadingOverlay }) => {
  const dispatch = useDispatch();
  const { dataBTC, dataUSD, loading, error, loaded } = useSelector(selectPerpCOINM);
  const [showInBTC, setShowInBTC] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para cargar datos si aún no se han cargado
  useEffect(() => {
    if (!loaded && lastPrice) {
      dispatch(fetchPerpCOINMBalance({ lastPrice }));
    }
  }, [dispatch, loaded, lastPrice]);

  // Efecto para actualizar el balance total en USD
  useEffect(() => {
    if (loaded) {
      dispatch(updateTotalBalanceInUSD());
    }
  }, [loaded, dataUSD, dispatch]);

  // Efecto para manejar el estado de carga local
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else if (loaded && dataBTC.length > 0) {
      setIsLoading(false);
    }
  }, [loading, loaded, dataBTC]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (dataBTC.length === 0) {
    return <div className="relative mb-4"><LoadingOverlay isLoading={isLoading} /></div>;      
  }

  const balance = dataBTC[0];

  const displayValue = (value) =>
    showInBTC ? (lastPrice ? (parseFloat(value) * lastPrice).toFixed(2) : 'N/A') : parseFloat(value).toFixed(6);
  const currencyLabel = showInBTC ? 'USD' : 'BTC';

  return (
    <div className="relative mb-4">
      <LoadingOverlay isLoading={isLoading} /> {/* Mostrar overlay de carga */}
            
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
      <div className="grid grid-cols-2 gap-4">
        <Tarjetitas descripcion="Asset" contenido={currencyLabel} />
        <Tarjetitas descripcion="Balance" contenido={displayValue(balance.balance)} />
        <Tarjetitas descripcion="Equity" contenido={displayValue(balance.equity)} />
        <Tarjetitas descripcion="Unrealized Profit" contenido={displayValue(balance.unrealizedProfit)} />
        <Tarjetitas descripcion="Available Margin" contenido={displayValue(balance.availableMargin)} />
        <Tarjetitas descripcion="Used Margin" contenido={displayValue(balance.usedMargin)} />
      </div>
    </div>
  );
};

export default PerpCOINMSummary;
