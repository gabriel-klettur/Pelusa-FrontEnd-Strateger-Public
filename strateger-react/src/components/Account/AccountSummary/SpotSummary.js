// Path: strateger-react/src/components/Account/AccountSummary/SpotSummary.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotBalance, selectSpot, updateSpotBalanceUSDAction } from '../../../slices/accountSlice';
import { selectLastPrice } from '../../../slices/tradingViewChartSlice';
import { fetchTicker } from '../../../slices/tickerSlice';
import { Switch } from '@headlessui/react';

const SpotSummary = () => {
  const dispatch = useDispatch();
  const {balances, loading, error, loaded } = useSelector(selectSpot);
  const lastPrice = useSelector(selectLastPrice);
  const tickerPrices = useSelector((state) => state.ticker ? state.ticker.prices : {});
  const [showInUSD, setShowInUSD] = useState(true);

  useEffect(() => {
    if (!loaded && lastPrice)
      dispatch(fetchSpotBalance(lastPrice));
  }, [dispatch, loaded, lastPrice]);

  useEffect(() => {
    const tickersToFetch = balances
      .filter(balance => balance.asset !== 'USDT' && balance.asset !== 'BTC' && parseFloat(balance.free) > 0 && !tickerPrices[`${balance.asset}-USDT`])
      .map(balance => `${balance.asset}-USDT`);

    if (tickersToFetch.length > 0) {
      tickersToFetch.forEach(ticker => dispatch(fetchTicker(ticker)));
    }
  }, [balances, tickerPrices, dispatch]);

  const getPriceInUSD = (asset, amount) => {
    if (asset === 'USDT') return parseFloat(amount);
    if (asset === 'BTC') return parseFloat(amount) * (lastPrice || 0);
    const tickerPrice = tickerPrices[`${asset}-USDT`];
    return tickerPrice ? parseFloat(amount) * tickerPrice : 0;
  };

  const totalBalanceInUSD = balances.reduce((acc, balance) => acc + getPriceInUSD(balance.asset, balance.free), 0);
  const totalBalanceInBTC = totalBalanceInUSD / (lastPrice || 1);

  useEffect(() => {
    dispatch(updateSpotBalanceUSDAction(totalBalanceInUSD));
  }, [totalBalanceInUSD, dispatch]);

  const displayValue = showInUSD ? totalBalanceInUSD.toFixed(2) : totalBalanceInBTC.toFixed(6);
  const currencyLabel = showInUSD ? 'USD' : 'BTC';

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredBalances = balances.filter(balance => parseFloat(balance.free) > 0);

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Spot Summary</h3>
      <div className="flex items-center mb-4">
        <span className="mr-2">{currencyLabel}</span>
        <Switch
          checked={showInUSD}
          onChange={setShowInUSD}
          className={`${showInUSD ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
        >
          <span className={`${showInUSD ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`} />
        </Switch>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Asset</h4>
          <p className="text-2xl">{currencyLabel}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold">Balance</h4>
          <p className="text-2xl">{displayValue}</p>
        </div>
      </div>
      {filteredBalances.length === 0 ? (
        <div>No balances available</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Asset</th>
                <th className="py-2 px-4 border-b text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredBalances.map((balance) => (
                <tr key={balance.asset} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-left">{balance.asset}</td>
                  <td className="py-2 px-4 border-b text-right">{balance.free}</td>
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
