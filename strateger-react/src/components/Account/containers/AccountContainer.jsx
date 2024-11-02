


import AccountChartsContainer from './AccountChartsContainer';
import AccountInformationContainer from "./AccountInformationContainer";
import AccountSummaryContainer from "./AccountSummaryContainer";

//import TotalBalanceAccounts from '../components/TotalBalanceAccounts';

const AccountContainer = () => {

    return (
        <div>
          {/*<TotalBalanceAccounts />*/}
          <div className="p-4 grid grid-cols-1 gap-2 bg-african_violet-200">
            <AccountChartsContainer/> 
            <AccountSummaryContainer />
            <AccountInformationContainer />
          </div>
        </div>
      );    
}

export default AccountContainer;