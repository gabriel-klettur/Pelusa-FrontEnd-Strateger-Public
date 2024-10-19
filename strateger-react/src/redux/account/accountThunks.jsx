import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const updateSpotBalanceUSD = createAsyncThunk(
    'account/updateSpotBalanceUSD',
    async (balanceUSD) => balanceUSD
);

export const fetchPerpUSDTMBalance = createAsyncThunk(
    'account/fetchPerpUSDTMBalance',
    async ({ lastPrice }) => {
        const response = await axios.get(`${config.apiURL}/bingx/usdtm/get-balance-perp-usdtm`);
        const data = JSON.parse(response.data);

        if (data && data.data && data.data.balance) {
        return { balance: data.data.balance, lastPrice };
        } else {
        throw new Error('Invalid response structure');
        }
    }
);
  
export const fetchPerpCOINMBalance = createAsyncThunk(
    'account/fetchPerpCOINMBalance',
    async ({ lastPrice }) => {
        const response = await axios.get(`${config.apiURL}/bingx/coinm/get-balance-perp-coinm`);
        const data = JSON.parse(response.data);
        
        if (data && data.data) {
        return { balances: data.data, lastPrice };
        } else {
        throw new Error('Invalid response structure');
        }
    }
);
  
export const fetchSpotBalance = createAsyncThunk(
    'account/fetchSpotBalance',
    async ({ lastPrice }) => {
        const response = await axios.get(`${config.apiURL}/bingx/spot/get-balance-spot`);
        const data = JSON.parse(response.data);
        if (data && data.data && data.data.balances) {
        return { balances: data.data.balances, lastPrice };
        } else {
        throw new Error('Invalid response structure');
        }
    }
);
  
export const fetchAllAccountsData = createAsyncThunk(
    'account/fetchAllAccountsData',
    async () => {
        const response = await axios.get(`${config.apiURL}/strateger/accounts/get-all-data-bingx-acc`);
        const data = response.data;
        if (data && data.data) {
        return data.data;
        } else {
        throw new Error('Invalid response structure');
        }
    }
);