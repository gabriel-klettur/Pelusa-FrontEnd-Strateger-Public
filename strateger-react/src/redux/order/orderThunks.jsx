import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';

export const fetchOrdersUsdtm = createAsyncThunk(
  'orders/fetchOrdersUsdtm',
  async ({ limit, offset, startDate, endDate }) => {
    const params = { limit, offset };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await axios.get(`${config.apiURL}/bingx/usdtm/get-all-full-orders`, { params });
    const data = JSON.parse(response.data);  
    console.log('fetchOrdersUsdtm - raw response:', response.data);
    console.log('fetchOrdersUsdtm - parsed data:', data);
    if (data && data.data && data.data.orders) {
      return data.data.orders;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

export const fetchOrdersCoinm = createAsyncThunk(
  'orders/fetchOrderCoinm',
  async ({ limit, offset, startDate, endDate }) => {
    const params = { limit, offset };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await axios.get(`${config.apiURL}/bingx/coinm/query-history-orders`, { params });
    const data = JSON.parse(response.data);  
    console.log('fetchOrdersCoinm - raw response:', response.data);
    console.log('fetchOrdersCoinm - parsed data:', data);
    if (data && data.data && data.data.orders) {
      return data.data.orders;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

export const fetchOrdersSpot = createAsyncThunk(
  'orders/fetchOrderSpot',
  async ({ limit, offset, startDate, endDate }) => {
    const params = { limit, offset };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await axios.get(`${config.apiURL}/bingx/spot/get-order-history`, { params });
    const data = JSON.parse(response.data);  
    console.log('fetchOrdersSpot - raw response:', response.data);
    console.log('fetchOrdersSpot - parsed data:', data);
    if (data && data.data && data.data.orders) {
      return data.data.orders;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);

export const fetchOrdersStandard = createAsyncThunk(
  'orders/fetchOrderStandard',
  async ({ limit, offset, startDate, endDate }) => {
    const params = { limit, offset };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await axios.get(`${config.apiURL}/bingx/standard/query-historical-orders`);    
    const data = JSON.parse(response.data);  
    console.log('fetchOrdersStandard - raw response:', response.data);
    console.log('fetchOrdersStandard - parsed data:', data);
    if (data && data.data) {      
      return data.data;
    } else {
      throw new Error('Invalid response structure');
    }
  }
);
