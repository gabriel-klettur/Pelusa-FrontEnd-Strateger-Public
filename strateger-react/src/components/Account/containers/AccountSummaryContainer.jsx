import USDMSummary from '../components/AccountSummary/USDMSummary';
import SpotSummary from '../components/AccountSummary/SpotSummary';
import COINMSummary from '../components/AccountSummary/COINMSummary';

const AccountSummaryContainer = () => {
    
    return (
      <div>        
        <div className="grid grid-cols-3 gap-4">            
            <USDMSummary />                                
            <SpotSummary />                  
            <COINMSummary />        
        </div>
      </div>  
    );  
};


export default AccountSummaryContainer;