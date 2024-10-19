// Path: strateger-react/src/components/Account/AccountCharts/AccountCharts.js

import React from 'react';
import { useSelector } from 'react-redux';

import PerpUSDTMChart from './PerpUSDTMChart';
import SpotChart from './SpotChart';
import PerpCOINMChart from './PerpCOINMChart';

import { ChartComponent } from '../../../TradingViewLineal/TradingViewLineal';
import Legend from '../../../TradingViewLineal/Legend';

import { selectCoinMTimeData } from '../../../../redux/account/accountSlice';
import { selectLastPrice } from '../../../../redux/tradingViewChart/tradingViewChartSlice';
import { selectUSDTMTimeData } from '../../../../redux/account/accountSlice';
import { selectSpotTimeData } from '../../../../redux/account/accountSlice';

import Ventanita from '../../../common/Ventanita';

const AccountCharts = ({LoadingOverlay}) => {
  const perpCOINMAccounts = useSelector(selectCoinMTimeData);
  const perpUSDTMAccounts = useSelector(selectUSDTMTimeData);
  const lastPrice = useSelector(selectLastPrice);
  const spotAccounts = useSelector(selectSpotTimeData);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="">
        <Ventanita 
          titulo="Perpetual USDT-M" 
          contenido={
            <PerpUSDTMChart
              perpUSDTMAccounts={perpUSDTMAccounts}
              ChartComponent={ChartComponent}
              Legend={Legend}
              LoadingOverlay={LoadingOverlay}
            />
          } 
        />
      </div>
      <div className="">
        <Ventanita
          titulo="Spot"
          contenido={
            <SpotChart 
              spotAccounts={spotAccounts} 
              ChartComponent={ChartComponent} 
              Legend={Legend} 
              LoadingOverlay={LoadingOverlay}
            />
          }
        />
      </div>
      <div className="">
        <Ventanita 
          titulo="Perpetual COIN-M"
          contenido={
            <PerpCOINMChart
              perpCOINMAccounts={perpCOINMAccounts}
              lastPrice={lastPrice}
              ChartComponent={ChartComponent}
              Legend={Legend}
              LoadingOverlay={LoadingOverlay}
            />
          }
        />
      </div>
    </div>
  );
}

export default AccountCharts;
