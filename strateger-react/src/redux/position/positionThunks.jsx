// Async thunks for fetching positions
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';

export const fetchPositionsCoinM = createAsyncThunk(
    'positions/fetchPositionsCoinM',
    async () => {
      const response = await axios.get(`${config.apiURL}/bingx/coinm/get-positions-coinm`);
      const data = JSON.parse(response.data);
      if (data && data.data) {
        return data.data;
      } else {
        throw new Error('Invalid response structure');
      }
    }
);
  
export const fetchPositionsUSDTM = createAsyncThunk(
    'positions/fetchPositionsUSDTM',
    async () => {
        const response = await axios.get(`${config.apiURL}/bingx/usdtm/get-positions-usdtm`);
        const data = JSON.parse(response.data);
        if (data && data.data) {
        return data.data;
        } else {
        throw new Error('Invalid response structure');
        }
    }
);
  
export const fetchSpotDepositRecords = createAsyncThunk(
    'positions/fetchSpotDepositRecords',
    async () => {
        const response = await axios.get(`${config.apiURL}/bingx/spot/get-spot-deposit-records`);
        const data = JSON.parse(response.data); // Analiza el JSON string
        if (Array.isArray(data)) {
        return data;
        } else {
        throw new Error('Invalid response structure');
        }
    }
);