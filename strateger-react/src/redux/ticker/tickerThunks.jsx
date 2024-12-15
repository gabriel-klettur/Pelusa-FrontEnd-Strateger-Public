//Path: src/redux/ticker/tickerThunks.jsx

import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { config } from '../../config';

export const fetchTicker = createAsyncThunk(
  'ticker/fetchTicker',
  async (symbol) => {
    const response = await axios.get(`${config.apiURL}/bingx/main/get-ticker`, {
      params: { symbol }
    });
    const data = JSON.parse(response.data);
    if (data && data.data) {
      return { symbol, lastPrice: parseFloat(data.data.lastPrice) };
    } else {
      throw new Error('Invalid response structure');
    }
  }
);