// Path: strateger-react/src/slices/accountSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchPerpUSDTMBalance, fetchPerpCOINMBalance, fetchSpotBalance, fetchAllAccountsData, updateSpotBalanceUSD } from './accountThunks';

const convertUSDTMDataToBTC = (data, lastPrice) => {
  if (!data || !lastPrice) {
    return null;
  }
  return {
    balance: parseFloat(data.balance) / lastPrice,
    equity: parseFloat(data.equity) / lastPrice,
    unrealizedProfit: parseFloat(data.unrealizedProfit) / lastPrice,
    realisedProfit: parseFloat(data.realisedProfit) / lastPrice,
    availableMargin: parseFloat(data.availableMargin) / lastPrice
  }
};

const convertCOINMDataToUSD = (data, lastPrice) => {
  console.log(data);
  if (!data || !lastPrice) {
    return null;
  }
  return data.map((balance) => {
    return {
      balance: parseFloat(balance.balance) * lastPrice,
      equity: parseFloat(balance.equity) * lastPrice,
      unrealizedProfit: parseFloat(balance.unrealizedProfit) * lastPrice,
      realisedProfit: parseFloat(balance.realisedProfit) * lastPrice,
      availableMargin: parseFloat(balance.availableMargin) * lastPrice
    }
  });
}

const calculateTotalBalanceInUSD = (state) => {
  const perpUSDTMUSD = state.perpUSDTM.dataUSD ? parseFloat(state.perpUSDTM.dataUSD.balance) : 0;
  const perpCOINMUSD = state.perpCOINM.dataUSD ? state.perpCOINM.dataUSD.reduce((acc, balance) => acc + parseFloat(balance.balance), 0) : 0;
  const spotUSD = state.spot.balanceUSD ? parseFloat(state.spot.balanceUSD) : 0;

  state.totalBalanceInUSD = perpUSDTMUSD + perpCOINMUSD + spotUSD;
};

const initialState = {
  allAccountsData: {
    data: [],
    perpUSDTMAccounts: [],
    perpCOINMAccounts: [],
    spotAccounts: [],
    loading: false,
    error: null,
    loaded: false,
  },
  perpUSDTM: {
    dataUSD: null,
    dataBTC: null,
    loading: false,
    error: null,
    loaded: false,
  },
  perpCOINM: {
    dataBTC: [],
    dataUSD: [],
    loading: false,
    error: null,
    loaded: false
  },
  spot: {
    balances: [],
    balanceUSD: null,
    loading: false,
    error: null,
    loaded: false
  },
  totalBalanceInUSD: null
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
        state.perpUSDTM.loading = true;
        state.perpUSDTM.error = null;
      })
      .addCase(fetchPerpUSDTMBalance.fulfilled, (state, action) => {
        const lastPrice = action.payload.lastPrice;
        state.perpUSDTM.dataUSD = action.payload.balance;
        state.perpUSDTM.dataBTC = convertUSDTMDataToBTC(action.payload.balance, lastPrice);
        state.perpUSDTM.loading = false;
        state.perpUSDTM.loaded = true;
        calculateTotalBalanceInUSD(state);
      })
      .addCase(fetchPerpUSDTMBalance.rejected, (state, action) => {
        state.perpUSDTM.loading = false;
        state.perpUSDTM.error = action.error.message;
      })

      // Perp COIN-M balance
      .addCase(fetchPerpCOINMBalance.pending, (state) => {
        state.perpCOINM.loading = true;
        state.perpCOINM.error = null;
      })
      .addCase(fetchPerpCOINMBalance.fulfilled, (state, action) => {        
        const lastPrice = action.payload.lastPrice;
        state.perpCOINM.dataBTC = action.payload.balances;
        state.perpCOINM.dataUSD = convertCOINMDataToUSD(action.payload.balances, lastPrice);
        state.perpCOINM.loading = false;
        state.perpCOINM.loaded = true;
        calculateTotalBalanceInUSD(state);
      })
      .addCase(fetchPerpCOINMBalance.rejected, (state, action) => {
        state.perpCOINM.loading = false;
        state.perpCOINM.error = action.error.message;
      })

      // Spot balance
      .addCase(fetchSpotBalance.pending, (state) => {
        state.spot.loading = true;
        state.spot.error = null;
      })
      .addCase(fetchSpotBalance.fulfilled, (state, action) => {        
        state.spot.balances = action.payload.balances;
        state.spot.loading = false;
        state.spot.loaded = true;
        calculateTotalBalanceInUSD(state);
      })
      .addCase(fetchSpotBalance.rejected, (state, action) => {
        state.spot.loading = false;
        state.spot.error = action.error.message;
      })
      .addCase(updateSpotBalanceUSD.fulfilled, (state, action) => {
        state.spot.balanceUSD = action.payload;
        calculateTotalBalanceInUSD(state);
      })

      // Fetch all accounts data
      .addCase(fetchAllAccountsData.pending, (state) => {
        state.allAccountsData.loading = true;
        state.allAccountsData.error = null;
      })
      .addCase(fetchAllAccountsData.fulfilled, (state, action) => {
        const allData = action.payload;
        state.allAccountsData.data = allData;
        state.allAccountsData.perpUSDTMAccounts = allData.filter(account => account.accountType === 'Perp USDT-M');
        state.allAccountsData.perpCOINMAccounts = allData.filter(account => account.accountType === 'Perp COIN-M');
        state.allAccountsData.spotAccounts = allData.filter(account => account.accountType === 'Spot');
        state.allAccountsData.loading = false;
        state.allAccountsData.loaded = true;
      })
      .addCase(fetchAllAccountsData.rejected, (state, action) => {
        state.allAccountsData.loading = false;
        state.allAccountsData.error = action.error.message;
      });
  }
});

// Export the updateTotalBalanceInUSD action
export const { updateTotalBalanceInUSD } = accountSlice.actions;
export const updateSpotBalanceUSDAction = updateSpotBalanceUSD;

export default accountSlice.reducer;
