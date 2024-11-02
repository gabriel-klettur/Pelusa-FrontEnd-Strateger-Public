import PerpUSDTMSummary from '../components/AccountSummary/PerpUSDTMSummary';
import SpotSummary from '../components/AccountSummary/SpotSummary';
import PerpCOINMSummary from '../components/AccountSummary/PerpCOINMSummary';

const AccountSummaryContainer = () => {
    
    return (
      <div>        
        <div className="grid grid-cols-3 gap-4">            
            <PerpUSDTMSummary />                                
            <SpotSummary />                  
            <PerpCOINMSummary />        
        </div>
      </div>  
    );  
};


export default AccountSummaryContainer;