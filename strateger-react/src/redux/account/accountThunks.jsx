import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';

export const updateSpotBalanceUSD = createAsyncThunk(
    'account/updateSpotBalanceUSD',
    async (balanceUSD) => balanceUSD
);

/**
 * Thunk action to fetch the perpetual USDT-M balance.
 *
 * @function
 * @name fetchPerpUSDTMBalance
 * @param {Object} params - The parameters object.
 * @param {number} params.currentBTCPrice - The current price of BTC.
 * @returns {Promise<Object>} The balance data for the USDM account, this object can contains an array of data.
 * @throws {Error} If the response structure is invalid.
 */
export const fetchPerpUSDTMBalance = createAsyncThunk(
    'account/fetchPerpUSDTMBalance',
    async () => {
        const response = await axios.get(`${config.apiURL}/bingx/usdtm/get-balance-perp-usdtm`);
        const data = JSON.parse(response.data);        

        if (data && data.data) {
        return { balance: data.data };
        } else {
        throw new Error('Invalid response structure');
        }
    }
);
  
/**
 * Thunk action to fetch perpetual COIN-M balance.
 *
 * @function
 * @name fetchPerpCOINMBalance
 * @param {Object} params - The parameters object.
 * @param {number} params.currentBTCPrice - The current price of BTC.
 * @returns {Promise<Object>} The balance data for the COIN-M account, this object can contains an array of data.
 * @throws {Error} If the response structure is invalid.
 */
export const fetchPerpCOINMBalance = createAsyncThunk(
    'account/fetchPerpCOINMBalance',
    async () => {
        const response = await axios.get(`${config.apiURL}/bingx/coinm/get-balance-perp-coinm`);
        const data = JSON.parse(response.data);                    

        if (data && data.data) {
        return { balances: data.data };
        } else {
        throw new Error('Invalid response structure');
        }
    }
);
  
export const fetchSpotBalance = createAsyncThunk(
    'account/fetchSpotBalance',
    async () => {
        const response = await axios.get(`${config.apiURL}/bingx/spot/get-balance-spot`);
        const data = JSON.parse(response.data);
        if (data && data.data && data.data.balances) {
        return { balances: data.data.balances };
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