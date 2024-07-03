// Path: strateger-react/src/components/Account/AccountSummary/SpotSummary.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotBalance, selectBalances, selectLoading, selectError } from '../../../slices/spotSlice';
import { Switch } from '@headlessui/react';

const SpotSummary = () => {
  const dispatch = useDispatch();
  const balances = useSelector(selectBalances);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [hideZeroFree, setHideZeroFree] = useState(true);

  useEffect(() => {
    dispatch(fetchSpotBalance());
  }, [dispatch]);

  const filteredBalances = hideZeroFree ? balances.filter(balance => parseFloat(balance.free) > 0) : balances;

  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Balances:', balances);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Spot Summary</h3>
      <div className="flex items-center mb-4">
        <span className="mr-2">Hide assets with Free = 0</span>
        <Switch
          checked={hideZeroFree}
          onChange={setHideZeroFree}
          className={`${hideZeroFree ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
        >
          <span className={`${hideZeroFree ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`} />
        </Switch>
      </div>
      {filteredBalances.length === 0 ? (
        <div>No balances available</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-100">
                <th className="py-2 px-4 border-b">Asset</th>
                <th className="py-2 px-4 border-b">Free</th>
                <th className="py-2 px-4 border-b">Locked</th>
              </tr>
            </thead>
            <tbody>
              {filteredBalances.map((balance) => (
                <tr key={balance.asset} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{balance.asset}</td>
                  <td className="py-2 px-4 border-b">{balance.free}</td>
                  <td className="py-2 px-4 border-b">{balance.locked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SpotSummary;
