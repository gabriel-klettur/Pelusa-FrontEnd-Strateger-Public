// Path: strateger-react/src/components/Account/AccountCharts/PerpUSDTMSummary.js

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@headlessui/react';
import Ventanita from '../../../common/Ventanita';

import { fetchPerpUSDTMBalance, selectPerpUSDTM, updateTotalBalanceInUSD } from '../../../../redux/account';

import Tarjetitas from '../../../common/Tarjetitas';

const PerpUSDTMSummary = () => {
  const dispatch = useDispatch();
  
  const { dataUSD, error, loaded } = useSelector(selectPerpUSDTM);
  const [showInUSD, setShowInUSD] = useState(true);
  

  // Efecto para cargar datos si aún no se han cargado
  useEffect(() => {
    if (!loaded) {
      dispatch(fetchPerpUSDTMBalance());
    }
  }, [dispatch, loaded]);

  // Efecto para actualizar el balance total en USD
  useEffect(() => {
    if (loaded) {
      dispatch(updateTotalBalanceInUSD());
    }
  }, [loaded, dataUSD, dispatch]);

  const displayValue = (value) =>{
    if (showInUSD) {
      return parseFloat(value).toFixed(2);
    } else {
      return parseFloat(value).toFixed(6);
    }
  }


  const currencyLabel = showInUSD ? 'USD' : 'BTC';

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dataUSD) {
    return <div className="relative mb-4"></div>;      
  }

  return (
    <div className="relative mb-4">

      
      <Ventanita
        titulo="Perpetual USDT-M"
        contenido={
          <>
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
            {dataUSD.map((item, index) => (
              <div className="grid grid-cols-2 gap-4" key={item.asset}>        
                <Tarjetitas descripcion="Asset" contenido={item.asset} />
                <Tarjetitas descripcion="Balance" contenido={displayValue(item.balance)} />
                <Tarjetitas descripcion="Equity" contenido={displayValue(item.equity)} />
                <Tarjetitas descripcion="Unrealized Profit" contenido={displayValue(item.unrealizedProfit)} />
                <Tarjetitas descripcion="Realised Profit" contenido={displayValue(item.realisedProfit)} />
                <Tarjetitas descripcion="Available Margin" contenido={displayValue(item.availableMargin)} />
                <Tarjetitas descripcion="Used Margin" contenido={displayValue(item.usedMargin)} />        
              </div>
            ))};
          </>      
        }
      />
    </div>
  );
};

export default PerpUSDTMSummary;
