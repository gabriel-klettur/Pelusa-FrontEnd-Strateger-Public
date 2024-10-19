// Selectors
export const selectPerpUSDTM = (state) => state.account.perpUSDTM;
export const selectPerpCOINM = (state) => state.account.perpCOINM;
export const selectSpot = (state) => state.account.spot;
export const selectTotalBalanceInUSD = (state) => state.account.totalBalanceInUSD;
export const selectAllAccountsData = (state) => state.account.allAccountsData;
export const selectCoinMTimeData = (state) => state.account.allAccountsData.perpCOINMAccounts;
export const selectUSDTMTimeData = (state) => state.account.allAccountsData.perpUSDTMAccounts;
export const selectSpotTimeData = (state) => state.account.allAccountsData.spotAccounts;