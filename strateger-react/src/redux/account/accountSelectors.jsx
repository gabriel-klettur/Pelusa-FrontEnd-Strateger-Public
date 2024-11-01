// Selectors
export const selectPerpUSDTM = (state) => state.account.balanceUSDTM;
export const selectPerpCOINM = (state) => state.account.balanceCOINM;
export const selectSpot = (state) => state.account.balanceSpot;
export const selectTotalBalanceInUSD = (state) => state.account.totalBalanceInUSD;
export const selectTrackRecordAccountsData = (state) => state.account.trackrecordAccountsData;
export const selectCoinMTimeData = (state) => state.account.trackrecordAccountsData.balanceCOINMAccount;
export const selectUSDTMTimeData = (state) => state.account.trackrecordAccountsData.balanceUSDTMAccount;
export const selectSpotTimeData = (state) => state.account.trackrecordAccountsData.balanceSpotAccount;