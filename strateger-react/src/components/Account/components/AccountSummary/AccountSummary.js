// Path: strateger-react/src/components/Account/AccountSummary/AccountSummary.js

import React from 'react';
import { useSelector } from 'react-redux';

import { selectTicker } from '../../../../redux/ticker/tickerSlice';

import PerpUSDTMSummary from './PerpUSDTMSummary';
import SpotSummary from './SpotSummary';
import PerpCOINMSummary from './PerpCOINMSummary';

import Ventanita from '../../../common/Ventanita';

const AccountSummary = ({LoadingOverlay}) => {

  const lastPrice = useSelector((state) => selectTicker(state)['BTC-USDT']);
  return (
    <div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="">
          <Ventanita
            titulo="Perpetual USDT-M"
            contenido={
              <PerpUSDTMSummary 
                lastPrice={lastPrice}
                LoadingOverlay={LoadingOverlay}
              />
            }
          />          
        </div>

        <div className="">
          <Ventanita
            titulo="Spot"
            contenido={
              <SpotSummary 
                lastPrice={lastPrice}
                LoadingOverlay={LoadingOverlay}
              />
            }
          />          
        </div>

        <div className="">
          <Ventanita
            titulo="Perpetual COIN-M"
            contenido={
              <PerpCOINMSummary
                lastPrice={lastPrice}
                LoadingOverlay={LoadingOverlay}
              />
            }
          />
        </div>          
      </div>
    </div>
  );
};

export default AccountSummary;
