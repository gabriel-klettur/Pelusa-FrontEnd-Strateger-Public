// Path: strateger-react/src/components/Account/AccountCharts/AccountCharts.js

import React from 'react';
import { useSelector } from 'react-redux';

import PerpUSDTMChart from './PerpUSDTMChart';
import SpotChart from './SpotChart';
import PerpCOINMChart from './PerpCOINMChart';

import { ChartComponent } from '../../TradingViewLineal/TradingViewLineal';
import Legend from '../../TradingViewLineal/Legend';

import { selectCoinMTimeData } from '../../../redux/slices/accountSlice';
import { selectLastPrice } from '../../../redux/slices/tradingViewChartSlice';
import { selectUSDTMTimeData } from '../../../redux/slices/accountSlice';
import { selectSpotTimeData } from '../../../redux/slices/accountSlice';


import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';



const AccountCharts = () => {
  const perpCOINMAccounts = useSelector(selectCoinMTimeData);
  const perpUSDTMAccounts = useSelector(selectUSDTMTimeData);
  const lastPrice = useSelector(selectLastPrice);
  const spotAccounts = useSelector(selectSpotTimeData);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border-4 border-red-500">
        <PerpUSDTMChart
          perpUSDTMAccounts={perpUSDTMAccounts}          
          ChartComponent={ChartComponent}
          Legend={Legend}
          LoadingOverlay={LoadingOverlay}

        />
      </div>
      <div className="border-4 border-red-500">
        <SpotChart 
          spotAccounts={spotAccounts} 
          ChartComponent={ChartComponent} 
          Legend={Legend} 
          LoadingOverlay={LoadingOverlay}
        />
      </div>
      <div className="border-4 border-red-500">
        <PerpCOINMChart 
          perpCOINMAccounts={perpCOINMAccounts} 
          lastPrice={lastPrice} 
          ChartComponent={ChartComponent} 
          Legend={Legend} 
          LoadingOverlay={LoadingOverlay} 
        />
      </div>
    </div>
  );
}

export default AccountCharts;
