// Path: src/redux/account/accountUtils.js

export const convertUSDTMDataToBTC = (data, lastPrice) => {
    if (!data || !lastPrice) {
      return null;
    }
    return {
      balance: parseFloat(data.balance) / lastPrice,
      equity: parseFloat(data.equity) / lastPrice,
      unrealizedProfit: parseFloat(data.unrealizedProfit) / lastPrice,
      realisedProfit: parseFloat(data.realisedProfit) / lastPrice,
      availableMargin: parseFloat(data.availableMargin) / lastPrice
    };
  };
  
  export const convertCOINMDataToUSD = (data, lastPrice) => {
    if (!data || !lastPrice) {
      return null;
    }
    return data.map((balance) => ({
      balance: parseFloat(balance.balance) * lastPrice,
      equity: parseFloat(balance.equity) * lastPrice,
      unrealizedProfit: parseFloat(balance.unrealizedProfit) * lastPrice,
      realisedProfit: parseFloat(balance.realisedProfit) * lastPrice,
      availableMargin: parseFloat(balance.availableMargin) * lastPrice,
    }));
  };
  
  export const calculateTotalBalanceInUSD = (state) => {
    const perpUSDTMUSD = state.currentBalances.balanceUSDTM.dataUSD ? parseFloat(state.currentBalances.balanceUSDTM.dataUSD.balance) : 0;
    const perpCOINMUSD = state.currentBalances.balanceCOINM.dataUSD ? state.currentBalances.balanceCOINM.dataUSD.reduce((acc, balance) => acc + parseFloat(balance.balance), 0) : 0;
    const spotUSD = state.currentBalances.balanceSpot.balanceUSD ? parseFloat(state.currentBalances.balanceSpot.balanceUSD) : 0;
  
    state.totalBalanceInUSD = perpUSDTMUSD + perpCOINMUSD + spotUSD;
  };