

//import AccountCharts from '../components/AccountCharts/AccountCharts'; // Corregir nombre
//import AccountSummary from '../components/AccountSummary/AccountSummary';

import AccountInformationContainer from "./AccountInformationContainer";

//import TotalBalanceAccounts from '../components/TotalBalanceAccounts';

const AccountContainer = () => {

    return (
        <div>
          {/*<TotalBalanceAccounts />*/}
          <div className="p-4 grid grid-cols-1 gap-2 bg-african_violet-200">
            {/*<AccountCharts/>*/} 
            {/*<AccountSummary />*/}
            <AccountInformationContainer />
          </div>
        </div>
      );    
}

export default AccountContainer;