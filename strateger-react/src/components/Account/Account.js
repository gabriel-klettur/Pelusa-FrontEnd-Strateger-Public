//Path: strateger-react/src/components/Account/Account.js

import React from 'react';

import AccountSummary from './AccountSummary/AccountSummary';
import AccoountCharts from './AccountCharts/AccountCharts';
import AccountInformation from './AccountInformation/AccountInformation';
import TotalBalanceAccounts from './TotalBalanceAccounts';

const Account = () => {  

  return (
    <div>
      <TotalBalanceAccounts />
      <div className="p-4 border-4 border-blue-500 grid grid-cols-1 gap-2">
        <AccoountCharts />
        <AccountSummary />
        <AccountInformation />
      </div>
    </div>
  );
};

export default Account;
