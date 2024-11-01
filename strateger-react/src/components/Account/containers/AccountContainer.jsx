
//import AccountSummary from '../components/AccountSummary/AccountSummary';
//import AccountCharts from '../components/AccountCharts/AccountCharts'; // Corregir nombre
import AccountInformation from '../components/AccountInformation/AccountInformation';
//import TotalBalanceAccounts from '../components/TotalBalanceAccounts';

const AccountContainer = () => {

    return (
        <div>
          {/*<TotalBalanceAccounts />*/}
          <div className="p-4 grid grid-cols-1 gap-2 bg-african_violet-200">
            {/*<AccountCharts/>*/} 
            {/*<AccountSummary />*/}
            <AccountInformation  />
          </div>
        </div>
      );    
}

export default AccountContainer;