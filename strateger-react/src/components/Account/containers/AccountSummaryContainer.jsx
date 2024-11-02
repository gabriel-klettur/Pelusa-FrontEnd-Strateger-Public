import { useSelector } from 'react-redux';

import { selectTicker } from '../../../redux/ticker';

import PerpUSDTMSummary from '../components/AccountSummary/PerpUSDTMSummary';
import SpotSummary from '../components/AccountSummary/SpotSummary';
import PerpCOINMSummary from '../components/AccountSummary/PerpCOINMSummary';

import Ventanita from '../../common/Ventanita';

const AccountSummaryContainer = () => {
    const currentBTCPrice = useSelector((state) => selectTicker(state)['BTC-USDT']);


    console.log("currentBTCPrice: ", currentBTCPrice);

    
    return (
      <div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="">
            <Ventanita
              titulo="Perpetual USDT-M"
              contenido={
                <PerpUSDTMSummary 
                  lastPrice={currentBTCPrice}                
                />
              }
            />          
          </div>
  
          <div className="">
            <Ventanita
              titulo="Spot"
              contenido={
                <SpotSummary 
                  lastPrice={currentBTCPrice}                
                />
              }
            />          
          </div>
  
          <div className="">
            <Ventanita
              titulo="Perpetual COIN-M"
              contenido={
                <PerpCOINMSummary
                  lastPrice={currentBTCPrice}                
                />
              }
            />
          </div>          
        </div>
      </div>  
    );  
};


export default AccountSummaryContainer;