// Selectors
export const selectPerpUSDTM = (state) => state.account.currentBalances.balanceUSDTM;
export const selectPerpCOINM = (state) => state.account.currentBalances.balanceCOINM;
export const selectSpot = (state) => state.account.currentBalances.balanceSpot;

export const selectTotalBalanceInUSD = (state) => state.account.totalBalanceInUSD;

export const selectTrackRecordAccountsData = (state) => state.account.trackrecordAccountsData;
export const selectCoinMTimeData = (state) => state.account.trackrecordAccountsData.balanceCOINMAccount;
export const selectUSDTMTimeData = (state) => state.account.trackrecordAccountsData.balanceUSDTMAccount;
export const selectSpotTimeData = (state) => state.account.trackrecordAccountsData.balanceSpotAccount;