import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchOrdersUsdtm = createAsyncThunk(
    'orders/fetchOrdersUsdtm',
    async ({ limit, offset, startDate, endDate }) => {
      const params = { limit, offset };
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
  
      const response = await axios.get(`${config.apiURL}/bingx/usdtm/get-all-full-orders`, { params });
      const data = JSON.parse(response.data);  // Parsea la cadena JSON
      if (data && data.data && data.data.orders) {
        return data.data.orders;
      } else {
        throw new Error('Invalid response structure');
      }
    }
  );