import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const updateSpotBalanceUSD = createAsyncThunk(
    'account/updateSpotBalanceUSD',
    async (balanceUSD) => balanceUSD
);

export const fetchPerpUSDTMBalance = createAsyncThunk(
    'account/fetchPerpUSDTMBalance',
    async ({ currentBTCPrice }) => {
        const response = await axios.get(`${config.apiURL}/bingx/usdtm/get-balance-perp-usdtm`);
        const data = JSON.parse(response.data);

        console.log('fetchPerpUSDTMBalance', data);

        if (data && data.data) {
        return { balance: data.data, currentBTCPrice };
        } else {
        throw new Error('Invalid response structure');
        }
    }
);
  
export const fetchPerpCOINMBalance = createAsyncThunk(
    'account/fetchPerpCOINMBalance',
    async ({ currentBTCPrice }) => {
        const response = await axios.get(`${config.apiURL}/bingx/coinm/get-balance-perp-coinm`);
        const data = JSON.parse(response.data);        
        
        console.log('fetchPerpCOINMBalance', data);

        if (data && data.data) {
        return { balances: data.data, currentBTCPrice };
        } else {
        throw new Error('Invalid response structure');
        }
    }
);
  
export const fetchSpotBalance = createAsyncThunk(
    'account/fetchSpotBalance',
    async ({ currentBTCPrice }) => {
        const response = await axios.get(`${config.apiURL}/bingx/spot/get-balance-spot`);
        const data = JSON.parse(response.data);
        if (data && data.data && data.data.balances) {
        return { balances: data.data.balances, currentBTCPrice };
        } else {
        throw new Error('Invalid response structure');
        }
    }
);
  
export const fetchTrackRecordBingXAllAccounts = createAsyncThunk(
    'account/fetchTrackRecordBingXAllAccounts',
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