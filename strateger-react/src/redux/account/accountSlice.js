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
  balances: {
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
    },
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
    },
  },
  extraReducers: (builder) => {
    builder
      //!--------------------------- Perp USDT-M balance ------------------------------------------
      .addCase(fetchPerpUSDTMBalance.pending, (state) => {
        state.balances.balanceUSDTM.loading = true;
        state.balances.balanceUSDTM.error = null;
      })
      .addCase(fetchPerpUSDTMBalance.fulfilled, (state, action) => {
        const lastPrice = action.payload.lastPrice;
        state.balances.balanceUSDTM.dataUSD = action.payload.balance;
        state.balances.balanceUSDTM.dataBTC = convertUSDTMDataToBTC(action.payload.balance, lastPrice);
        state.balances.balanceUSDTM.loading = false;
        state.balances.balanceUSDTM.loaded = true;
        calculateTotalBalanceInUSD(state);
      })
      .addCase(fetchPerpUSDTMBalance.rejected, (state, action) => {
        state.balances.balanceUSDTM.loading = false;
        state.balances.balanceUSDTM.error = action.error.message;
      })

      //!---------------------------- Perp COIN-M balance -----------------------------------------
      .addCase(fetchPerpCOINMBalance.pending, (state) => {
        state.balances.balanceCOINM.loading = true;
        state.balances.balanceCOINM.error = null;
      })
      .addCase(fetchPerpCOINMBalance.fulfilled, (state, action) => {
        const lastPrice = action.payload.lastPrice;
        state.balances.balanceCOINM.dataBTC = action.payload.balances;
        state.balances.balanceCOINM.dataUSD = convertCOINMDataToUSD(action.payload.balances, lastPrice);
        state.balances.balanceCOINM.loading = false;
        state.balances.balanceCOINM.loaded = true;
        calculateTotalBalanceInUSD(state);
      })
      .addCase(fetchPerpCOINMBalance.rejected, (state, action) => {
        state.balances.balanceCOINM.loading = false;
        state.balances.balanceCOINM.error = action.error.message;
      })

      //!------------------------------  Spot balance ------------------------------------------
      .addCase(fetchSpotBalance.pending, (state) => {
        state.balances.balanceSpot.loading = true;
        state.balances.balanceSpot.error = null;
      })
      .addCase(fetchSpotBalance.fulfilled, (state, action) => {
        state.balances.balanceSpot.balances = action.payload.balances;
        state.balances.balanceSpot.loading = false;
        state.balances.balanceSpot.loaded = true;
        calculateTotalBalanceInUSD(state);
      })
      .addCase(fetchSpotBalance.rejected, (state, action) => {
        state.balances.balanceSpot.loading = false;
        state.balances.balanceSpot.error = action.error.message;
      })
      .addCase(updateSpotBalanceUSD.fulfilled, (state, action) => {
        state.balances.balanceSpot.balanceUSD = action.payload;
        calculateTotalBalanceInUSD(state);
      })

      //!----------------------- Fetch track record accounts data -------------------------------
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
  },
});

// Export the updateTotalBalanceInUSD action
export const { updateTotalBalanceInUSD } = accountSlice.actions;
export const updateSpotBalanceUSDAction = updateSpotBalanceUSD;

export default accountSlice.reducer;
