import PerpUSDTMSummary from '../components/AccountSummary/PerpUSDTMSummary';
import SpotSummary from '../components/AccountSummary/SpotSummary';
import PerpCOINMSummary from '../components/AccountSummary/PerpCOINMSummary';

import Ventanita from '../../common/Ventanita';

const AccountSummaryContainer = () => {
    
    return (
      <div>        
        <div className="grid grid-cols-3 gap-4">
          <div className="">
            <Ventanita
              titulo="Perpetual USDT-M"
              contenido={
                <PerpUSDTMSummary />
              }
            />          
          </div>
  
          <div className="">
            <Ventanita
              titulo="Spot"
              contenido={
                <SpotSummary />
              }
            />          
          </div>
  
          <div className="">
            <Ventanita
              titulo="Perpetual COIN-M"
              contenido={
                <PerpCOINMSummary />
              }
            />
          </div>          
        </div>
      </div>  
    );  
};


export default AccountSummaryContainer;