
import AccountSummary from '../components/AccountSummary/AccountSummary';
import AccountCharts from '../components/AccountCharts/AccountCharts'; // Corregir nombre
import AccountInformation from '../components/AccountInformation/AccountInformation';
import TotalBalanceAccounts from '../components/TotalBalanceAccounts';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

const AccountContainer = () => {

    return (
        <div>
          <TotalBalanceAccounts 
            LoadingOverlay={LoadingOverlay}
          />
          <div className="p-4 grid grid-cols-1 gap-2 bg-african_violet-200">
            <AccountCharts 
              LoadingOverlay={LoadingOverlay} // Corregir nombre
            />
            <AccountSummary 
              LoadingOverlay={LoadingOverlay}
            />
            <AccountInformation 
              LoadingOverlay={LoadingOverlay}
            />
          </div>
        </div>
      );    
}

export default AccountContainer;