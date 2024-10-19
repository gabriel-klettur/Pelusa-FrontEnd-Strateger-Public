import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchAlarms = createAsyncThunk(
    'alarms/fetchAlarms',
    async ({ limit, offset }) => {
      const response = await axios.get(`${config.apiURL}/alarms/alarms?limit=${limit}&offset=${offset}&latest=true`);    
      return response.data.sort((a, b) => b.id - a.id);  
    }
);
  