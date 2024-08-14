// Path: strateger-react/src/components/Account/Account.js

import React from 'react';

import AccountSummary from './AccountSummary/AccountSummary';
import AccountCharts from './AccountCharts/AccountCharts'; // Corregir nombre
import AccountInformation from './AccountInformation/AccountInformation';
import TotalBalanceAccounts from './TotalBalanceAccounts';

import LoadingOverlay from '../common/LoadingOverlay/LoadingOverlay';

const Account = () => {  

  return (
    <div>
      <TotalBalanceAccounts 
        LoadingOverlay={LoadingOverlay}
      />
      <div className="p-4 border-4 border-blue-500 grid grid-cols-1 gap-2">
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
};

export default Account;
