import { useEffect } from 'react';

const useSyncStrategiesAndTickers = (uniqueStrategies, uniqueTickers, setStrategies, setTickers) => {
  // Update the strategies and tickers state when the uniqueStrategies and uniqueTickers props change
  useEffect(() => {  
    setStrategies((prevStrategies) =>
      uniqueStrategies.reduce((acc, strategy) => {
        acc[strategy] = prevStrategies[strategy] ?? false;
        return acc;
      }, {})
    );

    setTickers((prevTickers) =>
      uniqueTickers.reduce((acc, ticker) => {
        acc[ticker] = prevTickers[ticker] ?? false;
        return acc;
      }, {})
    );

  }, [setStrategies, setTickers, uniqueStrategies, uniqueTickers]);
}

export default useSyncStrategiesAndTickers;