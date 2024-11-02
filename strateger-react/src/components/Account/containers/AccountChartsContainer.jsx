
import React from 'react';
import { useSelector } from 'react-redux';

import PerpUSDTMChart from '../components/AccountCharts/PerpUSDTMChart';
import SpotChart from '../components/AccountCharts/SpotChart';
import PerpCOINMChart from '../components/AccountCharts/PerpCOINMChart';

import { ChartComponent } from '../../Charts/LinealChart/TradingViewLineal';
import Legend from '../../Charts/LinealChart/Legend';

import { selectCoinMTimeData, selectUSDTMTimeData, selectSpotTimeData } from '../../../redux/account';
import { selectLastPrice } from '../../../redux/charts';

import Ventanita from '../../common/Ventanita';

const AccountChartsContainer = () => {
    const balanceCOINMAccount = useSelector(selectCoinMTimeData);
    const balanceUSDTAccount = useSelector(selectUSDTMTimeData);
    const currentBTCPrice = useSelector(selectLastPrice);
    const balanceSpotAccount = useSelector(selectSpotTimeData);
  
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="">
          <Ventanita 
            titulo="Perpetual USDT-M" 
            contenido={
              <PerpUSDTMChart
                balanceUSDTAccount={balanceUSDTAccount}
                ChartComponent={ChartComponent}
                Legend={Legend}              
              />
            } 
          />
        </div>
        <div className="">
          <Ventanita
            titulo="Spot"
            contenido={
              <SpotChart 
                balanceSpotAccount={balanceSpotAccount} 
                ChartComponent={ChartComponent} 
                Legend={Legend}               
              />
            }
          />
        </div>
        <div className="">
          <Ventanita 
            titulo="Perpetual COIN-M"
            contenido={
              <PerpCOINMChart
                balanceCOINMAccount={balanceCOINMAccount}
                currentBTCPrice={currentBTCPrice}
                ChartComponent={ChartComponent}
                Legend={Legend}              
              />
            }
          />
        </div>
      </div>
    );

}


export default AccountChartsContainer;