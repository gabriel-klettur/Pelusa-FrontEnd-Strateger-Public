// Path: src/redux/account/accountSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchPerpUSDTMBalance, fetchPerpCOINMBalance, fetchSpotBalance, fetchTrackRecordBingXAllAccounts, updateSpotBalanceUSD } from './accountThunks';
import { convertUSDTMDataToBTC, convertCOINMDataToUSD, calculateTotalBalanceInUSD } from './accountUtils';

const initialState = {
  trackrecordAccountsData: {
    data: [],
    balanceUSDTMAccount: [],
    balanceCOINMAccount: [],
    balanceSpotAccount: [],    
    loading: false,
    error: null,
    loaded: false,

  },
  currentBalances: {
    balanceUSDTM: {
      dataUSD: null,
      dataBTC: null,
      loading: false,
      error: null,
      loaded: false,
    },
    balanceCOINM: {
      dataBTC: [],
      dataUSD: [],
      loading: false,
      error: null,
      loaded: false,
    },
    balanceSpot: {
      balances: [],
      balanceUSD: null,
      loading: false,
      error: null,
      loaded: false,
    }
  },
  totalBalanceInUSD: null,
};

// Account slice
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateTotalBalanceInUSD: (state) => {
      calculateTotalBalanceInUSD(state);
    }
  },
  extraReducers: (builder) => {
    builder
      // Perp USDT-M balance
      .addCase(fetchPerpUSDTMBalance.pending, (state) => {
        state.currentBalances.balanceUSDTM.loading = true;
        state.currentBalances.balanceUSDTM.error = null;
      })
      .addCase(fetchPerpUSDTMBalance.fulfilled, (state, action) => {
        const currentBTCPrice = action.payload.currentBTCPrice;
        state.currentBalances.balanceUSDTM.dataUSD = action.payload.balance;
        state.currentBalances.balanceUSDTM.dataBTC = convertUSDTMDataToBTC(action.payload.balance, currentBTCPrice);
        state.currentBalances.balanceUSDTM.loading = false;
        state.currentBalances.balanceUSDTM.loaded = true;
        calculateTotalBalanceInUSD(state);
      })
      .addCase(fetchPerpUSDTMBalance.rejected, (state, action) => {
        state.currentBalances.balanceUSDTM.loading = false;
        state.currentBalances.balanceUSDTM.error = action.error.message;
      })

      // Perp COIN-M balance
      .addCase(fetchPerpCOINMBalance.pending, (state) => {
        state.currentBalances.balanceCOINM.loading = true;
        state.currentBalances.balanceCOINM.error = null;
      })
      .addCase(fetchPerpCOINMBalance.fulfilled, (state, action) => {        
        const currentBTCPrice = action.payload.currentBTCPrice;
        state.currentBalances.balanceCOINM.dataBTC = action.payload.balances;
        state.currentBalances.balanceCOINM.dataUSD = convertCOINMDataToUSD(action.payload.balances, currentBTCPrice);
        state.currentBalances.balanceCOINM.loading = false;
        state.currentBalances.balanceCOINM.loaded = true;
        calculateTotalBalanceInUSD(state);
      })
      .addCase(fetchPerpCOINMBalance.rejected, (state, action) => {
        state.currentBalances.balanceCOINM.loading = false;
        state.currentBalances.balanceCOINM.error = action.error.message;
      })

      // Spot balance
      .addCase(fetchSpotBalance.pending, (state) => {
        state.currentBalances.balanceSpot.loading = true;
        state.currentBalances.balanceSpot.error = null;
      })
      .addCase(fetchSpotBalance.fulfilled, (state, action) => {        
        state.currentBalances.balanceSpot.balances = action.payload.balances;
        state.currentBalances.balanceSpot.loading = false;
        state.currentBalances.balanceSpot.loaded = true;
        calculateTotalBalanceInUSD(state);
      })
      .addCase(fetchSpotBalance.rejected, (state, action) => {
        state.currentBalances.balanceSpot.loading = false;
        state.currentBalances.balanceSpot.error = action.error.message;
      })
      .addCase(updateSpotBalanceUSD.fulfilled, (state, action) => {
        state.currentBalances.balanceSpot.balanceUSD = action.payload;
        calculateTotalBalanceInUSD(state);
      })

      // Fetch all accounts data
      .addCase(fetchTrackRecordBingXAllAccounts.pending, (state) => {
        state.trackrecordAccountsData.loading = true;
        state.trackrecordAccountsData.error = null;
      })
      .addCase(fetchTrackRecordBingXAllAccounts.fulfilled, (state, action) => {
        const allData = action.payload;
        state.trackrecordAccountsData.data = allData;
        state.trackrecordAccountsData.balanceUSDTMAccount = allData.filter(account => account.accountType === 'Perp USDT-M');
        state.trackrecordAccountsData.balanceCOINMAccount = allData.filter(account => account.accountType === 'Perp COIN-M');
        state.trackrecordAccountsData.balanceSpotAccount = allData.filter(account => account.accountType === 'Spot');
        state.trackrecordAccountsData.loading = false;
        state.trackrecordAccountsData.loaded = true;
      })
      .addCase(fetchTrackRecordBingXAllAccounts.rejected, (state, action) => {
        state.trackrecordAccountsData.loading = false;
        state.trackrecordAccountsData.error = action.error.message;
      });
  }
});

// Export the updateTotalBalanceInUSD action
export const { updateTotalBalanceInUSD } = accountSlice.actions;
export const updateSpotBalanceUSDAction = updateSpotBalanceUSD;

export default accountSlice.reducer;
