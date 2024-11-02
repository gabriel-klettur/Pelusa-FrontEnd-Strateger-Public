// Path: src/redux/account/accountUtils.js

export const convertUSDTMDataToBTC = (data, currentBTCPrice) => {
    if (!data || !currentBTCPrice) {
      return null;
    }
    return {
      balance: parseFloat(data.balance) / currentBTCPrice,
      equity: parseFloat(data.equity) / currentBTCPrice,
      unrealizedProfit: parseFloat(data.unrealizedProfit) / currentBTCPrice,
      realisedProfit: parseFloat(data.realisedProfit) / currentBTCPrice,
      availableMargin: parseFloat(data.availableMargin) / currentBTCPrice
    };
  };
  
  export const convertCOINMDataToUSD = (data, currentBTCPrice) => {
    if (!data || !currentBTCPrice) {
      return null;
    }
    return data.map((balance) => ({
      balance: parseFloat(balance.balance) * currentBTCPrice,
      equity: parseFloat(balance.equity) * currentBTCPrice,
      unrealizedProfit: parseFloat(balance.unrealizedProfit) * currentBTCPrice,
      realisedProfit: parseFloat(balance.realisedProfit) * currentBTCPrice,
      availableMargin: parseFloat(balance.availableMargin) * currentBTCPrice,
    }));
  };
  
  export const calculateTotalBalanceInUSD = (state) => {
    const perpUSDTMUSD = state.currentBalances.balanceUSDTM.dataUSD ? parseFloat(state.currentBalances.balanceUSDTM.dataUSD.balance) : 0;
    const perpCOINMUSD = state.currentBalances.balanceCOINM.dataUSD ? state.currentBalances.balanceCOINM.dataUSD.reduce((acc, balance) => acc + parseFloat(balance.balance), 0) : 0;
    const spotUSD = state.currentBalances.balanceSpot.balanceUSD ? parseFloat(state.currentBalances.balanceSpot.balanceUSD) : 0;
  
    state.totalBalanceInUSD = perpUSDTMUSD + perpCOINMUSD + spotUSD;
  };